import Conversation from '../models/conversation.js'

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
        console.log("in backendd");
        console.log(req.params.userid);
        const conversation = await Conversation.find({
            members:{$in:[req.params.userid]}
        });
        console.log(conversation);
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({error})
    }
}

