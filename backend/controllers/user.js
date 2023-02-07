import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserOTPVerification from '../models/UserOTPVerification.js';
import Guides from '../models/guide.js';
import Token from '../models/token.js';
import { v4 as uuidv4 } from 'uuid';
import Booking from '../models/booking.js'
import { sendEmail } from '../utils/sendEmail.js'
import crypto from 'crypto';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import moment from 'moment'
import Stripe from 'stripe';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

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

export const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(400).send({ message: "Invalid Link" });
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });
        await User.updateOne({ _id: user._id, isVerified: true });
        await token.remove()

        res.status(200).send({ message: "Email verified successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email })
        console.log("olduser", oldUser);
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWTSECRET, { expiresIn: "3h" })

        res.status(200).json({ result: oldUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

export const getGuides = async (req, res) => {
    try {
        const guides = await Guides.find({ isVerified: true });
        console.log(guides);
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
function toPascalCase(string) {
    return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}

export const guideSearch = async (req, res) => {
    try {
        const location = toPascalCase(req.query.location);
        const result = await Guides.find({ location, isVerified: true })
        if (result.length === 0) {
            res.send({ error: "No guides found for the location" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
    }
}

export const guideBooking = async (req, res) => {

    try {
        const { username, guidedetails, userid, fromDate, toDate, totalAmount, totalDays, token } = req.body.bookingDetails;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create(
            {
                amount: totalAmount,
                customer: customer.id,
                currency: "inr",
                receipt_email: token.email
            }, {
            idempotencyKey: uuidv4()
        }
        )
        if (payment) {
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
                transactionId: "1234"
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
        }
        res.status(200).send("Payment Successfull")
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }

    // try {
    //     const newBooking = new Booking({
    //         username,
    //         guidename: guidedetails.name,
    //         guideid: guidedetails._id,
    //         location: guidedetails.location,
    //         userid,
    //         fromDate: moment(fromDate).format('DD-MM-YYYY'),
    //         toDate: moment(toDate).format('DD-MM-YYYY'),
    //         totalAmount,
    //         totalDays,
    //         transactionId: "1234"
    //     })
    //     const booking = await newBooking.save()

    //     const guideBooking = await Guides.findOne({ _id: guidedetails._id });
    //     guideBooking.bookings.push({
    //         bookingid: booking._id,
    //         fromDate: moment(fromDate).format('DD-MM-YYYY'),
    //         toDate: moment(toDate).format('DD-MM-YYYY'),
    //         userid: userid,
    //         status: booking.status
    //     });

    //     await guideBooking.save()

    //     // res.status(200).send("Booking Successfull")
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).json({ error })
    // }
}





