import mongoose from 'mongoose'

const UserOTPVerificationSchema = mongoose.Schema({
 userId: String,
 otp: String,
 createdAt: Date,
 expiresAt: Date
});

export default mongoose.model("UserOTPVerification", UserOTPVerificationSchema)