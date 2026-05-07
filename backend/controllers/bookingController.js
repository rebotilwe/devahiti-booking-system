import db from "../config/db.js";

// CREATE BOOKING
export const createBooking = (req, res) => {
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

  // Generate unique booking reference
  const booking_reference = `DEV-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  const sql = `
    INSERT INTO bookings 
    (booking_reference, service_type, booking_date, booking_time, participants, total_price,
     customer_name, customer_email, customer_phone, customer_address, notes, payment_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    sql,
    [
      booking_reference,
      service_type,
      booking_date,
      booking_time,
      participants || 1,
      total_price || 0,  // ✅ Make sure total_price is included here
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      notes || "",
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Booking failed", error: err.message });
      }

      res.status(201).json({
        message: "Booking created successfully",
        bookingId: result.insertId,
        bookingReference: booking_reference,
      });
    }
  );
};

// GET ALL BOOKINGS
export const getBookings = (req, res) => {
  db.query("SELECT * FROM bookings ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ message: "Error fetching bookings", error: err.message });
    }
    res.json(results);
  });
};

// GET SINGLE BOOKING BY ID
export const getBookingById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM bookings WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error fetching booking:", err);
      return res.status(500).json({ message: "Error fetching booking", error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(result[0]);
  });
};

// UPDATE PAYMENT STATUS
export const updatePaymentStatus = (req, res) => {
  const { id } = req.params;
  const { payment_status, payment_id } = req.body;
  
  db.query(
    "UPDATE bookings SET payment_status = ?, payment_id = ? WHERE id = ?",
    [payment_status, payment_id, id],
    (err, result) => {
      if (err) {
        console.error("Error updating payment status:", err);
        return res.status(500).json({ message: "Error updating payment status", error: err.message });
      }
      res.json({ message: "Payment status updated" });
    }
  );
};