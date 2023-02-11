import mongoose from 'mongoose'

const chatSchema = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: ["User", "Guide"]
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    }, {
    timestamps: true,
}
);

export default mongoose.model("Chat", chatSchema)