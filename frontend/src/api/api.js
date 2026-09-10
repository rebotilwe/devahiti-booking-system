const API_BASE_URL = "https://devahiti-booking-system-4t96.onrender.com/api";

// Get available time slots for a specific date. service is the service
// id/type (e.g. "group-class") — the backend uses it to decide whether to
// return the day's actual class start times (group class) or the generic
// private-session slot range.
export const getAvailability = async (date, service) => {
  try {
    const params = new URLSearchParams({ date });
    if (service) params.set('service', service);
    const response = await fetch(`${API_BASE_URL}/availability/slots?${params.toString()}`);
    
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
        original_price: bookingData.original_price,
        customer_name: bookingData.customer_name,
        customer_email: bookingData.customer_email,
        customer_phone: bookingData.customer_phone,
        customer_address: bookingData.customer_address,
        notes: bookingData.notes || "",
        coupon_code: bookingData.coupon_code,
        discount_amount: bookingData.discount_amount,
        discount_percentage: bookingData.discount_percentage,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || "Booking failed");
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