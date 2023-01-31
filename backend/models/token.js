import mongoose, { Schema } from 'mongoose'


const tokenSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.model("Token", tokenSchema)
