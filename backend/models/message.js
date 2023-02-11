import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ["User", "Guide"]
        },

        content: { type: String, trim: true },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    }, {  
    timestamps: true,
}
);

export default mongoose.model("Message", messageSchema)