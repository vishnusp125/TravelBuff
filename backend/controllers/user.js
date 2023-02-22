import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserOTPVerification from '../models/UserOTPVerification.js';
import Guides from '../models/guide.js';
import Booking from '../models/booking.js'
import Razorpay from 'razorpay'
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import moment from 'moment'
import { raw } from 'express';


dotenv.config();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
})

// send otp verification email
const sendOTPVerificationEmail = async (result, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        //mail options
        const mailOptions = {
            from: "travelbuff@gmail.com",
            to: result.email,
            subject: "Verify your Email",
            html: `<p>Thank You for joining Travell Buff !!! <p>
            <p>Enter this OTP <b>${otp}</b> in the app to verify your account</p>`
        };

        // hash otp
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: result._id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        // save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions)
        res.json({
            status: "Pending",
            message: "Verification OTP has been sent to your email",
            data: {
                userId: result._id,
                email: result.email,
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "Failed",
            message: error.message
        })
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            phone,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });
        await sendOTPVerificationEmail(result, res)
        // const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
        // const token = await new Token({
        //     userId: result._id,
        //     token: crypto.randomBytes(32).toString("hex"),
        // }).save();

        // const url = `${process.env.BASE_URL}users/${result._id}/verify/{token.token}`;
        // await sendEmail(result.email, "Verify Email", url)
        // res.status(201).json({ result, token, message: "An Email sent to your account please verify" })
        // res.status(201).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const userId = req.body.id;
        const otp = req.body.otp;

        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed")
        } else {
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,
            });
            if (UserOTPVerification.length <= 0) {
                throw new Error("Account doesn't exist or already registered")
            } else {
                // user otp record exists
                const { expiresAt } = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    // expired
                    await UserOTPVerification.deleteMany({ userId })
                    throw new Error("Code has expired. Request again")
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP)

                    if (!validOTP) {
                        throw new Error("Invalid OTP")

                    } else {
                        await User.updateOne({ _id: userId }, { isVerified: true })
                        await UserOTPVerification.deleteMany({ userId });
                        res.json({
                            status: "Success",
                            message: "Email verified successfully"
                        })
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "Failed",
            message: error.message
        })
    }
}

export const signin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const oldUser = await User.findOne({ email })
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
        if (oldUser.isVerified === false) return res.status(404).json({ message: "User is not verified" });
        if (oldUser.isBlocked) return res.status(404).json({ message: "You have been blocked by the admin" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWTSECRET, { expiresIn: "3d" })

        res.status(200).json({ result: oldUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

export const getGuides = async (req, res) => {
    try {
        const guides = await Guides.find({ isVerified: true });
        res.status(200).json(guides)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}

export const guideSingle = async (req, res) => {
    try {
        const guideId = req.params.id
        const guide = await Guides.findById({ _id: guideId })
        res.status(200).json(guide)
    } catch (err) {
        console.log(err);
    }
}

export const guideSearch = async (req, res) => {
    try {
        const location = req.query.location;
        const regex = new RegExp(location, "i"); // case-insensitive regex
        const result = await Guides.find({ location: { $regex: regex }, isVerified: true });
        if (result.length === 0) {
            res.send({ error: "No guides found for the location" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
    }
};


export const guideBooking = async (req, res) => {
    try {
        const { username, guidedetails, userid, fromDate, toDate, totalAmount, totalDays } = req.body;
        const newBooking = new Booking({
            username,
            guidename: guidedetails.name,
            guideid: guidedetails._id,
            location: guidedetails.location,
            userid,
            fromDate: moment(fromDate).format('DD-MM-YYYY'),
            toDate: moment(toDate).format('DD-MM-YYYY'),
            totalAmount,
            totalDays,
        })
        const booking = await newBooking.save()

        const guideBooking = await Guides.findOne({ _id: guidedetails._id });
        guideBooking.bookings.push({
            bookingid: booking._id,
            fromDate: moment(fromDate).format('DD-MM-YYYY'),
            toDate: moment(toDate).format('DD-MM-YYYY'),
            userid: userid,
            status: booking.status
        });
        await guideBooking.save()
        await generateRazorpay(booking._id, totalAmount, res)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

const generateRazorpay = async (id, amount, res) => {
    try {
        instance.orders.create(
            {
                amount: amount * 100,
                currency: "INR",
                receipt: `${id}`
            }, (err, order) => {
                res.json({ status: true, order: order })
            })
    } catch (error) {
        res.json({ status: "Failed", message: error.message })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        // Creating hmac object
        let hmac = crypto.createHmac('sha256', process.env.KEY_SECRET)

        //passing the data to be hashed
        hmac.update(req.body.res.razorpay_order_id + "|" + req.body.res.razorpay_payment_id)
        //creating the hmac in the required format
        const generated_signature = hmac.digest('hex')

        var response = { signatureIsValid: "false" }
        if (generated_signature === req.body.res.razorpay_signature) {
            response = { signatureIsValid: "true" }
            changeStatus(req.body.order, res)
            // res.json(response)
        } else {
            res.send(response)
        }
    } catch (error) {
        console.log(error);
    }
}

export const changeStatus = async (req, res) => {
    try {
        await Booking.findOneAndUpdate({ _id: req.receipt }, {
            $set: {
                status: "Booked"
            }
        })
        res.json({ status: true, message: "Payment Successfull" })
    } catch (error) {
        console.log(error);
        res.json({ error: "Payment failed" })
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const userid = req.params.id
        const bookings = await Booking.find({ userid }).sort({ createdAt: -1 })
        res.status(200).send(bookings)

    } catch (error) {
        console.log(error);
    }
}

export const resentOtp = async (req, res) => {
    try {
        const email = req.body.values;
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "User doesn't exist" })
        }
        if (user.isVerified === true) {

            return res.json({ message: "User already verified please Login" })
        }

        const userid = user._id

        await UserOTPVerification.deleteMany({ userid })
        sendOTPVerificationEmail(user, res)

    } catch (error) {
        console.log(error);
    }
}

export const cancelBooking = async (req, res) => {

    try {
        const { bookingid, guideid } = req.body;
        const bookingItem = await Booking.findOne({ _id: bookingid })
        bookingItem.status = "Cancelled"
        await bookingItem.save()

        const guide = await Guides.findOne({ _id: guideid })

        const bookings = guide.bookings
        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
        guide.bookings = temp;
        await guide.save()
        const bookingIte = await Booking.findOne({ _id: bookingid })
        res.json({ status: true, message: "Your booking cancelled successfully", bookingIte })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

export const userDetails = async (req, res) => {
    try {
        const userDetails = await User.findOne({ _id: req.params.id });
        if (!userDetails) return res.status(404).send('User not found');
        res.json(userDetails);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const UserEditProfile = async (req, res) => {

    try {
        // const data = await User.findOne({ _id: req.params.id });
        await User.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
            }
        });
        res.status(200).json({ status: 'ok', message: 'Updated Successfully' })
    } catch (err) {
        console.log(err);
    }
}

















