const API_BASE_URL = "http://localhost:5000/api";

// Get available time slots for a specific date
export const getAvailableSlots = async (date) => {
  const response = await fetch(`${API_BASE_URL}/availability/slots?date=${date}`);
  if (!response.ok) throw new Error("Failed to fetch slots");
  return response.json();
};

// Get weekly schedule template
export const getWeeklySchedule = async () => {
  const response = await fetch(`${API_BASE_URL}/availability/schedule`);
  if (!response.ok) throw new Error("Failed to fetch schedule");
  return response.json();
};

// Create a booking
export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) throw new Error("Failed to create booking");
  return response.json();
};

// Get booking by ID
export const getBooking = async (id) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
  if (!response.ok) throw new Error("Failed to fetch booking");
  return response.json();
};

// Update payment status
export const updatePaymentStatus = async (id, paymentStatus, paymentId) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}/payment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payment_status: paymentStatus, payment_id: paymentId }),
  });
  if (!response.ok) throw new Error("Failed to update payment");
  return response.json();
};