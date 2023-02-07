import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  guidename: {
    type: String,
    required: true
  },
  guideid: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true, default: "booked"
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);