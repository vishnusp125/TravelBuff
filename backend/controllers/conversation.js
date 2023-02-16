import Conversation from '../models/conversation.js'
import guide from '../models/guide.js'
import user from '../models/user.js'

// export const postConversation = async (req, res) => {

//     const newConversation = new Conversation({
//         members: [req.body.userid, req.body.guideid]
//     })
//     try {
//         const savedConversation = await newConversation.save()
//         res.status(200).json(savedConversation)
//     } catch (error) {
//         res.status(500).json({error})
//     }
// }

export const postConversation = async (req, res) => {
    const userId = req.body.userid;
    const guideId = req.body.guideid;

    try {
        // Check if a conversation already exists between the two members
        const existingConversation = await Conversation.findOne({
            members: { $all: [userId, guideId] }
        });
        if (existingConversation) {
            // If a conversation already exists, return it and do not create a new one
            res.status(200).json(existingConversation);
        } else {
            // If no conversation exists, create a new conversation
            const newConversation = new Conversation({
                members: [userId, guideId]
            });
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        }
    } catch (error) {
        res.status(500).json({error});
    }
}

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members:{$in:[req.params.userid]}
        });
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const getDetails = async (req, res) => {
        try {
            const guideDetails = await guide.findOne({ _id: req.params.guideId }).select('name email image')
            res.status(200).json(guideDetails)
        } catch (error) {
            res.status(500).json({error})
        }
}

export const getUserDetails = async (req, res) => {
    try {
        const userDetails = await user.findOne({ _id: req.params.userId }).select('name email')
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(500).json({error})
    }
}





