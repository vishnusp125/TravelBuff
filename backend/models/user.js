import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    id: { type: String },
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema)
