import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Send booking confirmation email to customer
export const sendBookingConfirmation = async (booking) => {
  const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const mailOptions = {
    from: `"Devahiti Yoga" <${process.env.EMAIL_USER}>`,
    to: booking.customer_email,
    subject: '✅ Booking Received - Devahiti Yoga',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #4fb4c2; padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Devahiti Yoga</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">✨ Ballito, South Africa</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px;">
            <h2 style="color: #333; margin-top: 0;">Thank You for Your Booking! 🙏</h2>
            <p style="color: #666; line-height: 1.6;">Your session has been received. We will confirm your booking shortly via WhatsApp.</p>
            
            <div style="background: #f5f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4fb4c2;">
              <h3 style="color: #4fb4c2; margin-top: 0; font-size: 16px;">📋 Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Reference</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">#${booking.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px; text-transform: capitalize;">${booking.service_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Time</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${booking.booking_time ? booking.booking_time.substring(0, 5) : 'TBD'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Participants</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${booking.participants}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Amount Paid</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 16px; color: #4fb4c2;">R${booking.total_price}</td>
                </tr>
                ${booking.coupon_code ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Coupon Used</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px; color: #28a745;">${booking.coupon_code}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background: #fff9e6; padding: 15px 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>📍 Important:</strong> Cheryl will confirm your booking via WhatsApp at <strong>${booking.customer_phone}</strong> within 24 hours.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;">
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Need to make changes or have questions? 
              <br>Contact us at: 
              <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #4fb4c2; text-decoration: none;">${process.env.ADMIN_EMAIL}</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #4a3728; padding: 20px; text-align: center;">
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 13px;">
              Devahiti Yoga • Ballito, South Africa
            </p>
            <p style="color: rgba(255,255,255,0.6); margin: 5px 0 0; font-size: 12px; font-style: italic;">
              "If you can breathe, you can do yoga" 🧘‍♀️
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Booking confirmation sent to ${booking.customer_email}`);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send admin notification for new booking
export const sendAdminNotification = async (booking) => {
  const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const mailOptions = {
    from: `"Devahiti Yoga" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: '🆕 New Booking Received - Devahiti Yoga',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #4fb4c2; padding: 25px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🆕 New Booking Alert!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">A new booking has been made</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 25px;">
            <div style="background: #f5f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #4fb4c2; margin-top: 0; font-size: 16px;">📋 Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Reference</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">#${booking.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Customer</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${booking.customer_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${booking.customer_email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${booking.customer_phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Address</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${booking.customer_address || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #f5f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #4fb4c2; margin-top: 0; font-size: 16px;">📅 Session Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px; text-transform: capitalize;">${booking.service_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Time</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${booking.booking_time ? booking.booking_time.substring(0, 5) : 'TBD'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Participants</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${booking.participants}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Amount</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 16px; color: #4fb4c2;">R${booking.total_price}</td>
                </tr>
                ${booking.coupon_code ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Coupon Used</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px; color: #28a745;">${booking.coupon_code}</td>
                </tr>
                ` : ''}
                ${booking.notes ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Notes</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${booking.notes}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
              <a href="${process.env.ADMIN_URL}" 
                 style="background: #4fb4c2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View in Admin Dashboard
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #4a3728; padding: 15px; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
              Devahiti Yoga • Ballito, South Africa
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin notification sent to ${process.env.ADMIN_EMAIL}`);
    return { success: true, message: 'Admin notification sent' };
  } catch (error) {
    console.error('❌ Admin email error:', error);
    return { success: false, error: error.message };
  }
};

// Send payment confirmation to customer
export const sendPaymentConfirmation = async (booking, paymentDetails) => {
  const mailOptions = {
    from: `"Devahiti Yoga" <${process.env.EMAIL_USER}>`,
    to: booking.customer_email,
    subject: '💳 Payment Confirmed - Devahiti Yoga',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #28a745; padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Payment Confirmed! 💳</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">Thank you for your payment</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px;">
            <h2 style="color: #333; margin-top: 0;">Your Payment Was Successful ✅</h2>
            <p style="color: #666; line-height: 1.6;">Your booking is now confirmed. We look forward to welcoming you!</p>
            
            <div style="background: #f5f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #28a745; margin-top: 0; font-size: 16px;">💳 Payment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Booking Reference</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">#${booking.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Amount Paid</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 18px; color: #28a745;">R${paymentDetails.amount || booking.total_price}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Payment Method</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${paymentDetails.method || 'Card'}</td>
                </tr>
                ${paymentDetails.transactionId ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Transaction ID</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${paymentDetails.transactionId}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background: #e8f5e9; padding: 15px 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #1e7e34; font-size: 14px;">
                <strong>📅 Session Details:</strong> ${booking.service_type} on ${new Date(booking.booking_date).toLocaleDateString()} at ${booking.booking_time ? booking.booking_time.substring(0, 5) : 'TBD'}
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;">
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Questions? Contact us at: 
              <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #4fb4c2; text-decoration: none;">${process.env.ADMIN_EMAIL}</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #4a3728; padding: 20px; text-align: center;">
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 13px;">
              Devahiti Yoga • Ballito, South Africa
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Payment confirmation sent to ${booking.customer_email}`);
    return { success: true, message: 'Payment confirmation sent' };
  } catch (error) {
    console.error('❌ Payment email error:', error);
    return { success: false, error: error.message };
  }
};

// Send admin notification for payment
export const sendAdminPaymentNotification = async (booking, paymentDetails) => {
  const mailOptions = {
    from: `"Devahiti Yoga" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: '💰 Payment Received - Devahiti Yoga',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #28a745; padding: 25px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">💰 Payment Received!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">A payment has been processed</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 25px;">
            <div style="background: #f5f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #28a745; margin-top: 0; font-size: 16px;">💰 Payment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Booking Reference</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">#${booking.id}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Customer</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${booking.customer_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${booking.customer_email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${booking.customer_phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Service</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px; text-transform: capitalize;">${booking.service_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Amount Paid</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 18px; color: #28a745;">R${paymentDetails.amount || booking.total_price}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Payment Method</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold; font-size: 14px;">${paymentDetails.method || 'Card'}</td>
                </tr>
                ${paymentDetails.transactionId ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Transaction ID</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px;">${paymentDetails.transactionId}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
              <a href="${process.env.ADMIN_URL}" 
                 style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                View in Admin Dashboard
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #4a3728; padding: 15px; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
              Devahiti Yoga • Ballito, South Africa
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin payment notification sent`);
    return { success: true, message: 'Admin payment notification sent' };
  } catch (error) {
    console.error('❌ Admin payment email error:', error);
    return { success: false, error: error.message };
  }
};

// Combined function for full booking flow
export const sendAllBookingEmails = async (booking, paymentDetails = null) => {
  try {
    // Send customer booking confirmation
    await sendBookingConfirmation(booking);
    
    // Send admin booking notification
    await sendAdminNotification(booking);
    
    // If payment details provided, send payment confirmations
    if (paymentDetails) {
      await sendPaymentConfirmation(booking, paymentDetails);
      await sendAdminPaymentNotification(booking, paymentDetails);
    }
    
    console.log('✅ All emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    return { success: false, error: error.message };
  }
};