import db from "../config/db.js";
import { sendBookingConfirmation, sendAdminNotification } from "../utils/email.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  const {
    service_type,
    booking_date,
    booking_time,
    participants,
    total_price,
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    notes,
  } = req.body;

  const booking_reference = `DEV-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  const sql = `
    INSERT INTO bookings 
    (booking_reference, service_type, booking_date, booking_time, participants, total_price,
     customer_name, customer_email, customer_phone, customer_address, notes, payment_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'paid')
    RETURNING id
  `;

  try {
    const result = await db.query(sql, [
      booking_reference,
      service_type,
      booking_date,
      booking_time,
      participants || 1,
      total_price || 0,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      notes || "",
    ]);

    const bookingData = {
      id: result.rows[0].id,
      booking_reference,
      service_type,
      booking_date,
      booking_time,
      participants: participants || 1,
      total_price: total_price || 0,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
    };

    // Send email notifications
    try {
      await sendBookingConfirmation(bookingData);
      await sendAdminNotification(bookingData);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.rows[0].id,
      bookingReference: booking_reference,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// GET ALL BOOKINGS
export const getBookings = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

// GET SINGLE BOOKING BY ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM bookings WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ message: "Error fetching booking", error: err.message });
  }
};

// UPDATE PAYMENT STATUS
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { payment_status, payment_id } = req.body;
  
  try {
    await db.query(
      "UPDATE bookings SET payment_status = $1, payment_id = $2 WHERE id = $3",
      [payment_status, payment_id, id]
    );
    res.json({ message: "Payment status updated" });
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ message: "Error updating payment status", error: err.message });
  }
};