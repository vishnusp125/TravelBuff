import Conversation from '../models/conversation.js'
import guide from '../models/guide.js'

export const postConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)

    } catch (error) {
        res.status(500).json({error})
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



