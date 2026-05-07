import nodemailer from 'nodemailer';

export const sendBookingConfirmation = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: booking.customer_email,
    subject: 'Booking Confirmation - Devahiti Yoga',
    html: `<h1>Thank you for booking!</h1>
           <p>Your session has been confirmed.</p>
           <p><strong>Reference:</strong> ${booking.booking_reference}</p>`,
  });
};