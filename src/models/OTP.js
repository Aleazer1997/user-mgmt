const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '0s' } // TTL index for automatic expiration
  }
}, {
  timestamps: true
});

// Create compound index for faster lookups
otpSchema.index({ email: 1, otp: 1 });

module.exports = mongoose.model('OTP', otpSchema);