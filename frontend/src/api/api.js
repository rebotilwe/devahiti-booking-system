const API_BASE_URL = "http://localhost:5000/api";

// Get available time slots for a specific date
export const getAvailability = async (date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/availability/slots?date=${date}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.slots || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

// Get weekly schedule
export const getWeeklySchedule = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/availability/schedule`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return {};
  }
};

// GET ALL BOOKINGS (for admin)
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

// CREATE BOOKING (initiateBooking)
export const initiateBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_type: bookingData.service_type || bookingData.service?.id,
        booking_date: bookingData.booking_date,
        booking_time: bookingData.booking_time,
        participants: bookingData.participants,
        total_price: bookingData.total_price,
        customer_name: bookingData.customer_name,
        customer_email: bookingData.customer_email,
        customer_phone: bookingData.customer_phone,
        customer_address: bookingData.customer_address,
        notes: bookingData.notes || "",
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Booking failed");
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// GET SINGLE BOOKING BY ID
export const getBooking = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// UPDATE PAYMENT STATUS
export const updatePaymentStatus = async (id, paymentStatus, paymentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/payment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        payment_status: paymentStatus, 
        payment_id: paymentId 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};