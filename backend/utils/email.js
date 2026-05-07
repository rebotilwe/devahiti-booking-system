import nodemailer from 'nodemailer';

// Configure email transporter (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

// Send booking confirmation email
export const sendBookingConfirmation = async (booking) => {
  const mailOptions = {
    from: `"Devahiti Yoga" <${process.env.EMAIL_USER}>`,
    to: booking.customer_email,
    subject: '✅ Booking Confirmed - Devahiti Yoga',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4fb4c2; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Devahiti Yoga</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0;">
          <h2>Thank you for your booking! 🙏</h2>
          <p>Your session has been confirmed.</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
            <h3 style="color: #4fb4c2; margin-top: 0;">Booking Details</h3>
            <p><strong>Reference:</strong> ${booking.booking_reference}</p>
            <p><strong>Service:</strong> ${booking.service_type}</p>
            <p><strong>Date:</strong> ${booking.booking_date}</p>
            <p><strong>Time:</strong> ${booking.booking_time}</p>
            <p><strong>Participants:</strong> ${booking.participants}</p>
            <p><strong>Total Paid:</strong> R${booking.total_price}</p>
          </div>
          
          <div style="background: #f9f3e0; padding: 15px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p><strong>📍 Important:</strong> Cheryl will confirm your booking via WhatsApp at ${booking.customer_phone}.</p>
          </div>
          
          <p>Need to make changes? Contact us at <a href="mailto:cheryl@devahiti.com">cheryl@devahiti.com</a></p>
        </div>
        <div style="background: #4a3728; padding: 15px; text-align: center; color: white; font-size: 12px;">
          <p>Devahiti Yoga • Ballito, South Africa</p>
          <p>"If you can breathe, you can do yoga"</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${booking.customer_email}`);
  } catch (error) {
    console.error('Email error:', error);
  }
};

// Send admin notification for new booking
export const sendAdminNotification = async (booking) => {
  const mailOptions = {
    from: `"Devahiti Yoga" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || 'cheryl@devahiti.com',
    subject: '🆕 New Booking Received - Devahiti Yoga',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Booking Alert!</h2>
        <div style="background: #f5f5f5; padding: 15px;">
          <p><strong>Customer:</strong> ${booking.customer_name}</p>
          <p><strong>Email:</strong> ${booking.customer_email}</p>
          <p><strong>Phone:</strong> ${booking.customer_phone}</p>
          <p><strong>Service:</strong> ${booking.service_type}</p>
          <p><strong>Date:</strong> ${booking.booking_date}</p>
          <p><strong>Time:</strong> ${booking.booking_time}</p>
          <p><strong>Amount:</strong> R${booking.total_price}</p>
        </div>
        <p>Log in to the admin dashboard to view all bookings.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Admin notification sent`);
  } catch (error) {
    console.error('Admin email error:', error);
  }
};