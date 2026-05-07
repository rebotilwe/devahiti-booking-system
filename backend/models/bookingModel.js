import db from "../config/db.js";

export const createBooking = (data, callback) => {
  const sql = `
    INSERT INTO bookings 
    (service_type, booking_date, booking_time, participants, total_price, customer_name, customer_email, customer_phone, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.service_type,
      data.booking_date,
      data.booking_time,
      data.participants,
      data.total_price,
      data.customer_name,
      data.customer_email,
      data.customer_phone,
      data.notes,
    ],
    callback
  );
};

export const getBookings = (callback) => {
  db.query("SELECT * FROM bookings ORDER BY created_at DESC", callback);
};