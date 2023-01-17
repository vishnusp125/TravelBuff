import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin.js';
import Users from '../models/user.js';

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
        res.status(200).json({ result: oldAdmin, token })
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