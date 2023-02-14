import mongoose from 'mongoose'

const chatSchema = mongoose.Schema(
//     {
//         chatName: { type: String, trim: true },
//         user: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: ["User"]
//             },
//         ],
//         guide: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: ["Guide"]
//             }
//         ],
//         latestMessage: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Message"
//         }
//     }, {
//     timestamps: true,
// }


    {
        chatName: { type: String, trim: true },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: ["User","Guide"]
            },
        ],
        // guide: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: ["Guide"]
        //     }
        // ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    }, {
    timestamps: true,
}
);

export default mongoose.model("Chat", chatSchema)