import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin.js';
import Users from '../models/user.js';
import Guides from '../models/guide.js';

const secret = "testadmin";

export const Adminsignup = async (req, res) => {
    const { email, password} = req.body;

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

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
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

        const token = jwt.sign({ email: oldAdmin.email, id: oldAdmin._id }, secret, { expiresIn: "1h" })
        res.status(200).json({ result: oldAdmin._id, token })
    } catch (error) {   
        console.log('in error');
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const users = await Users.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"})
    }
}
   
export const blockUser = async (req, res) => {
    try{
        const userId = req.params.id
        console.log(userId);
        const user = await Users.findByIdAndUpdate({ _id: userId }, { isBlocked: true })
        console.log(user);
        console.log('in tryyyy');
        res.json({status: 'ok',block: true, userDetails: user});
    } catch(error) {
        console.log(error);
        console.log('in catchhh');
    }
}

export const unblockUser = async (req, res) => {
    try{
        console.log('in tryyyy');
        const userId = req.params.id
        console.log(userId);
        const user = await Users.findByIdAndUpdate({ _id: userId }, { isBlocked: false })
        res.json({status: 'ok',block: false, userDetails: user});
    } catch(error) {
        console.log(error);
        console.log('in catchhh');

    }
}

export const getAllGuides = async (req, res) => {
    try{
        const guides = await Guides.find({ isVerified: true });
        res.status(200).json(guides)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"})
    }
}

export const verifyGuide = async (req, res) => {
    try{
        const guideId = req.params.id
        console.log(guideId);
        const guide = await Guides.findByIdAndUpdate({ _id: guideId }, { isVerified: true })
        console.log(guide);
        console.log('in tryyyy');
        res.json({status: 'ok',block: true, guideDetails: guide});
    } catch(error) {
        console.log(error);
        console.log('in catchhh');
    }
}

export const blockGuide = async (req, res) => {
    try{
        const guideId = req.params.id
        console.log(guideId);
        const guide = await Guides.findByIdAndUpdate({ _id: guideId }, { isBlocked: true })
        console.log(guide);
        console.log('in tryyyy');
        res.json({status: 'ok',block: true, guideDetails: guide});
    } catch(error) {
        console.log(error);
        console.log('in catchhh');
    }
}

export const unblockGuide = async (req, res) => {
    try{
        console.log('in tryyyy');
        const guideId = req.params.id
        console.log(guideId);
        const guide = await Guides.findByIdAndUpdate({ _id: guideId }, { isBlocked: false })
        res.json({status: 'ok',block: false, guideDetails: guide});
    } catch(error) {
        console.log(error);
        console.log('in catchhh');
    }
}


