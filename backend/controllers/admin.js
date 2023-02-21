import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin.js';
import Users from '../models/user.js';
import Guides from '../models/guide.js';
import Booking from '../models/booking.js'
import dotenv from 'dotenv'

dotenv.config();

export const Adminsignup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldAdmin = await AdminModel.findOne({ email });

        if (oldAdmin) {
            return res.status(400).json({ message: "Admin already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await AdminModel.create({
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.ADMIN_JWTSECRET, { expiresIn: "1h" });
        res.status(201).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}


export const Adminsignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldAdmin = await AdminModel.findOne({ email });
        if (!oldAdmin)
            return res.status(404).json({ message: "Admin doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldAdmin.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldAdmin.email, id: oldAdmin._id }, process.env.ADMIN_JWTSECRET, { expiresIn: "3d" })
        res.status(200).json({ result: oldAdmin._id, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}

export const blockUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await Users.findByIdAndUpdate({ _id: userId }, { isBlocked: true })
        res.json({ status: 'ok', block: true, userDetails: user });
    } catch (error) {
        console.log(error);
    }
}

export const unblockUser = async (req, res) => {
    try {

        const userId = req.params.id
        const user = await Users.findByIdAndUpdate({ _id: userId }, { isBlocked: false })
        res.json({ status: 'ok', block: false, userDetails: user });
    } catch (error) {
        console.log(error);
    }
}

export const getAllGuides = async (req, res) => {
    try {
        const guides = await Guides.find({ isVerified: true });
        res.status(200).json(guides)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}

export const blockGuide = async (req, res) => {
    try {
        const guideId = req.params.id
        const guide = await Guides.findByIdAndUpdate({ _id: guideId }, { isBlocked: true })
        res.json({ status: 'ok', block: true, guideDetails: guide });
    } catch (error) {
        console.log(error);
    }
}

export const unblockGuide = async (req, res) => {
    try {
        const guideId = req.params.id
        const guide = await Guides.findByIdAndUpdate({ _id: guideId }, { isBlocked: false })
        res.json({ status: 'ok', block: false, guideDetails: guide });
    } catch (error) {
        console.log(error);
    }
}

export const approveGuide = async (req, res) => {
    try {
        const guides = await Guides.find({ isVerified: false });
        res.status(200).json({ guideDetails: guides, status: "ok" })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}


export const verifyGuide = async (req, res) => {
    try {
        const guideId = req.params.id
        const guide = await Guides.findByIdAndUpdate({ _id: guideId }, { isVerified: true })
        res.json({ status: 'ok', verified: true, guideDetails: guide });
    } catch (error) {
        console.log(error);
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 })
        res.send(bookings)

    } catch (error) {
        console.log(error);
    }
}

export const getAllDetails = async (req, res) => {
    try {
        const numUsers = await Users.countDocuments();
        const numGuides = await Guides.countDocuments();
        const numBookings = await Booking.countDocuments();
        const bookingDetails = await Booking.find()
        const result = await Booking.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            {
                $group: {
                    _id: 0,
                    totalAmount: { $sum: '$totalAmount' }
                }
            }
        ]);
        const bookingTotal = result[0].totalAmount;
        // Booking.aggregate([
        //     {
        //       $group: {
        //         _id: { day: { $dayOfYear: "$createdAt" }, year: { $year: "$createdAt" } },
        //         totalAmount: { $sum: "$totalAmount" },
        //         count: { $sum: 1 }
        //       }
        //     },
        //     {
        //       $project: {
        //         _id: 0,
        //         date: { $dateFromParts: { year: "$_id.year", dayOfYear: "$_id.day" } },
        //         totalAmount: 1,
        //         count: 1
        //       }
        //     }
        //   ]).toArray((err, result) => {
        //     if (err) throw err;
        //     console.log(result);
        //     // Do something with the query result here
        //   });

        // Booking.aggregate([
        //     { $project: { createdAt: 1, totalAmount: 1, _id: 0 } }
        //   ]).exec((err, result) => {
        //     if (err) throw err;
        //     console.log(result);
        //     // Do something with the query result here
        //   });
        var totalAmounts
        var createdAtDates

        Booking.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalAmount: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    totalAmount: 1,
                    createdAt: { $dateFromString: { dateString: "$_id" } }
                }
            }
        ]).exec((err, result) => {
            if (err) throw err;
            totalAmounts = result.map(item => item.totalAmount);
            createdAtDates = result.map(item => item.createdAt);
            res.json({ numUsers, numGuides, numBookings, bookingTotal, totalAmounts, createdAtDates, bookingDetails });
        });
        // console.log(totalAmounts);
        // console.log(createdAtDates);




    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}








