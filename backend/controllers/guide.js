import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Guide from '../models/guide.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import Booking from '../models/booking.js'


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
    secure: true
});



export const Guidesignup = async (req, res) => {

    try {
        const { firstName, lastName, email, password, phone, image1, image2, location } = req.body;

        const values = req.body.values;
        const image = req.body.img1;
        const certificate = req.body.img2;

        const oldGuide = await Guide.findOne({ email: values.email });
        const existingPhone = await Guide.findOne({ phone: values.phone })

        if (oldGuide !== null && existingPhone !== null) {
            return res.status(400).json({ message: "Guide already exists" })
        } else {

            const imageresult = await cloudinary.uploader.upload(image, {
                folder: "guide",
            })

            const certificateresult = await cloudinary.uploader.upload(certificate, {
                folder: "guideCertificate",
            })
            const hashedPassword = await bcrypt.hash(values.password, 12);

            const result = await Guide.create({
                name: values.firstName + " " + values.lastName,
                email: values.email,
                password: hashedPassword,
                phone: values.phone,
                image: imageresult.secure_url,
                certificate: certificateresult.secure_url,
                location: values.location,
            });

            const token = jwt.sign({ email: result.email, id: result._id }, process.env.GUIDE_JWTSECRET, { expiresIn: "1h" });
            res.status(201).json({ status: 'success' })
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

export const Guidesignin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldGuide = await Guide.findOne({ email });

        if (!oldGuide) {
            return res.status(404).json({ message: "Guide doesn't exist" });
        }

        if (!oldGuide.isVerified) {
            return res.status(400).json({ message: "Your are not approved by the admin" });
        }
        if (oldGuide.isBlocked) {
            return res.status(400).json({ message: "Your are blocked by the admin" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldGuide.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ name: oldGuide.name, email: oldGuide.email, id: oldGuide._id }, process.env.GUIDE_JWTSECRET, { expiresIn: "3h" });
            return res.status(200).json({ status: 'login success', guide: token, result: oldGuide });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const activityPost = async (req, res) => {
    try {
        const { activity, guideId } = req.body;
        const guide = guideId;
        const getActivity = activity

        const data = await Guide.findOne({ _id: guide, activities: { $in: [getActivity] } });
        if (data) {
            res.json({ error: "Already added activity" })
        } else {
            await Guide.updateOne({ _id: guideId }, { $push: { activities: getActivity } })
            res.status(200).json({ message: "Activity added successfully" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const languagePost = async (req, res) => {
    try {
        const { language, guideId } = req.body;
        const guide = guideId;
        const getLanguage = language

        const data = await Guide.findOne({ _id: guide, languages: { $in: [getLanguage] } })

        if (data) {
            res.json({ error: "Already added language" })
        } else {
            await Guide.updateOne({ _id: guideId }, { $push: { languages: getLanguage } })
            res.status(200).json({ message: "Language added successfully" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const guideDetails = async (req, res) => {
    try {
        const guideId = req.params.id;
        const guide = await Guide.findOne({ _id: guideId });
        if (!guide) return res.status(404).send('Guide not found');
        res.json(guide);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const pricePost = async (req, res) => {
    try {
        const { price, guideId } = req.body;
        const guide = guideId;
        const getPrice = price;

        const data = await Guide.findOne({ _id: guide, price: { $in: [getPrice] } });
        if (data) {
            res.json({ error: "That's your current price !!" })
        } else {
            await Guide.updateOne({ _id: guideId }, { price: getPrice })
            res.json({ message: "Price added successfully" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const descriptionPost = async (req, res) => {
    try {
        const { description, guideId } = req.body;
        const guide = guideId;
        const getDescription = description;
        await Guide.updateOne({ _id: guideId }, { description: getDescription })
        res.json({ message: "Description added successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const guideBookings = async (req, res) => {

    try {
        const guideId = req.params.id;
        const guide = await Booking.find({ guideid: guideId }).sort({ createdAt: -1 });
        if (!guide) return res.status(404).send('Guide not found');
        res.json(guide);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const editProfile = async (req, res) => {

    try {
        const guideId = req.params.id
        const file = req.body.image

        const data = await Guide.findOne({ _id: guideId });

        if (file) {
            const imageUrl = data.image
            const publicId = imageUrl.match(/\/([^\/]*)$/)[1].split('.')[0];
            cloudinary.uploader.destroy(publicId, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(result);
                }
            });
        }

        const file1 = await cloudinary.uploader.upload(file, {
            folder: "guides"
        })

        await Guide.updateOne({ _id: guideId }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                location: req.body.location,
                image: file1.url
            }
        });
        res.status(200).json({ status: 'ok', message: 'Updated Successfully' })
    } catch (err) {
        console.log(err);
    }
}

export const activityDelete = async (req, res) => {
    try {
        const { guideId, activityIndex } = req.params;
        const guide = await Guide.findById(guideId);

        guide.activities.splice(activityIndex, 1);
        await guide.save();
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

}

export const languageDelete = async (req, res) => {
    try {
        const { guideId, languageIndex } = req.params;
        const guide = await Guide.findById(guideId);

        guide.languages.splice(languageIndex, 1);
        await guide.save();
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}










