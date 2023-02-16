import message from "../models/message.js"

export const postMessage = async (req, res) => {
    const newMessage = new message(req.body)

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getMessage = async (req, res) => {
    try {
        const messages = await message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages) 
    } catch (err) {
        console.log(err);
    }
}

