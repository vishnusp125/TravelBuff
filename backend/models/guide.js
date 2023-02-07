import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const guideSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    activities: {
        type: [String],
    },
    price: {
        type: String,
    },
    languages: {
        type: [String],
    },
    bookings: [],
}, {
    timestamps: true
});

export default mongoose.model('Guide', guideSchema);

