const OTP = require('../models/OTP');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const saveOTP = async (email, otp) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(process.env.OTP_EXPIRY_MINUTES) || 10);

  // Remove any existing OTPs for this email
  await OTP.deleteMany({ email });

  const otpRecord = new OTP({
    email,
    otp,
    expiresAt
  });

  return await otpRecord.save();
};

const verifyOTP = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });
  
  if (!otpRecord) {
    return { isValid: false, message: 'Invalid OTP' };
  }

  if (new Date() > otpRecord.expiresAt) {
    await OTP.deleteOne({ _id: otpRecord._id });
    return { isValid: false, message: 'OTP has expired' };
  }

  // Delete the OTP after successful verification
  await OTP.deleteOne({ _id: otpRecord._id });

  return { isValid: true, message: 'OTP verified successfully' };
};

module.exports = {
  generateOTP,
  saveOTP,
  verifyOTP
};