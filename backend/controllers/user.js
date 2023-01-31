import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserOTPVerification from '../models/UserOTPVerification.js';
import Guides from '../models/guide.js';
import Token from '../models/token.js';
import { sendEmail } from '../utils/sendEmail.js'
import crypto from 'crypto';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();


const secret = "test";

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
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        console.log(otp, "otppp");

        //mail options
        const mailOptions = {
            from: "travelbuff@gmail.com",
            to: email,
            subject: "Verify your Email",
            html: `<p>Thank You for joining Travell Buff !!! <p>
            <p>Enter this OTP <b>${otp}</b> in the app to verify your account</p>`
        };

        // hash otp
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        // save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions)
        res.json({
            status: "Pending",
            message: "Verification otp email sent",
            data: {
                userId: _id,
                email,
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
        sendOTPVerificationEmail(result, res)
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
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
        // console.log(error);
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

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" })

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

    }
}

