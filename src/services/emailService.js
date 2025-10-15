const transporter = require('../config/email');

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Account - OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verify Your Account</h2>
        <p>Thank you for registering! Use the OTP code below to verify your account:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
          <h1 style="margin: 0; color: #333; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = {
  sendOTPEmail
};