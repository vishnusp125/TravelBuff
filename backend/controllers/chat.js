import asyncHandler from "express-async-handler";
import Chat from "../models/chat.js";
import guide from "../models/guide.js";
import user from "../models/user.js";


// export const accessChat = asyncHandler(async (req, res) => {
//     const { userId } = req.body;

//     if (!userId) {
//         console.log("Userid Not found");
//         return res.sendStatus(400);
//     }

//     var isChat = await Chat.find({
//         $and: [

//             { users: { $elemMatch: { $eq: req.user._id } } },
//             { users: { $elemMatch: { $eq: userId } } },
//         ],
//     })
//         .populate("users", "-password")
//         .populate("latestMessage");

//     isChat = await user.populate(isChat, {
//         path: "latestMessage.sender",
//         select: "name email",
//     });

//     if (isChat.length > 0) {
//         res.send(isChat[0]);
//     } else {
//         var chatData = {
//             chatName: "sender",
//             users: [req.user._id, userId],
//         };

//         try {
//             const createdChat = await Chat.create(chatData);

//             const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//                 "users", "-password"
//             );
//             res.status(200).send(FullChat)
//         } catch (error) {
//             console.log(error);
//             throw new Error(error.message)
//         }
//     }
// })

// export const accessChat = asyncHandler(async (req, res) => {
//     const { guideId } = req.body;

//     if (!guideId) {
//         console.log("guideId Not found");
//         return res.sendStatus(400);
//     }

//     const userExists = await user.findById(req.user._id);   
//     const guideExists = await guide.findById(guideId);

//     if (!userExists || !guideExists) {
//         console.log("User or Guide not found");
//         return res.sendStatus(400);
//     }

//     var isChat = await Chat.find({
//         $and: [

//             { users: { $elemMatch: { $eq: req.user._id } } },
//             { users: { $elemMatch: { $eq: guideId } } },
//         ],
//     })
//         .populate("users", "-password")
//         .populate("latestMessage");

//     isChat = await user.populate(isChat, {
//         path: "latestMessage.sender",
//         select: "name email",
//     });

//     if (isChat.length > 0) {
//         res.send(isChat[0]);
//     } else {
//         var chatData = {
//             chatName: `${userExists.name} and ${guideExists.name}`,
//             users: [req.user._id, guideId],
//         };

//         try {
//             const createdChat = await Chat.create(chatData);

//             const FullChat = await Chat.findOne({ _id: createdChat._id }).populate({
//                 path: "users",
//                 match: { _id: { $in: [req.user._id, guideId] } },
//                 select: "-password",
//             });
//             res.status(200).send(FullChat)
//         } catch (error) {
//             console.log(error);
//             throw new Error(error.message)
//         }
//     }
// })


// export const accessChat = asyncHandler(async (req, res) => {
//     const { guideId } = req.body;

//     if (!guideId) {
//         console.log("guideId Not found");
//         return res.sendStatus(400);
//     }

//     const userExists = await user.findById(req.user._id);
//     const guideExists = await guide.findById(guideId);

//     if (!userExists || !guideExists) {
//         console.log("User or Guide not found");
//         return res.sendStatus(400);
//     }

//     var isChat = await Chat.find({
//         $and: [

//             { user: { $elemMatch: { $eq: req.user._id } } },
//             { guide: { $elemMatch: { $eq: guideId } } },
//         ],
//     })
//         .populate("users", "-password")
//         .populate("latestMessage");


//     isChat = await user.populate(isChat, {
//         path: "latestMessage.sender",
//         select: "name email",
//     });

//     if (isChat.length > 0) {
//         res.send(isChat[0]);
//     } else {
//         var chatData = {
//             chatName: `${userExists.name} and ${guideExists.name}`,
//             user: [req.user._id],
//             guide: [guideId]
//         };
//         console.log(chatData);
//     }

//     try {
//         const createdChat = await Chat.create(chatData);

//         const FullChat = await Chat.findOne({ _id: createdChat._id })
//             .populate({
//                 path: "users",
//                 model: "User",
//                 match: { _id: { $in: [req.user._id, guideId] } },
//                 select: "-password",
//             })
//             .populate({
//                 path: "users",
//                 match: { _id: { $in: [guideId, req.user._id,] } },
//                 model: "Guide",
//                 select: "-password",
//             });
//         res.status(200).send(FullChat)
//     } catch (error) {
//         console.log(error);
//         throw new Error(error.message)
//     }
// }
//     })


export const accessChat = asyncHandler(async (req, res) => {
    const { guideId } = req.body;
    if (!guideId) {
        return res.sendStatus(400);
    }

    const userExists = await user.findById(req.user._id);
    const guideExists = await guide.findById(guideId);

    if (!userExists || !guideExists) {
        console.log("User or Guide not found");
        return res.sendStatus(400);
    }

    const userDetails = await user.findOne({ _id: req.user._id }, "name email");
    const guideDetails = await guide.findOne({ _id: guideId }, "name location");
    // const chatDetails = await Chat.findOne({
    //     $and: [
    //         { user: { $elemMatch: { $eq: req.user._id } } },
    //         { guide: { $elemMatch: { $eq: guideId } } },
    //     ],
    // })
    //     .populate({ path: "user", select: "name email" })
    //     .populate({ path: "guide", select: "name location" });

    // res.status(200).send({ userDetails, guideDetails, chatDetails });

    // let isChat = await Chat.find({
    //     $and: [
    //         { user: { $elemMatch: { $eq: req.user._id } } },
    //         { guide: { $elemMatch: { $eq: guideId } } },
    //     ],
    // })
    // .populate("user", "-password")
    // .populate("guide", "-password")
    // .populate("users", "-password")
    // .populate("latestMessage");

    // await user.populate(isChat, {
    //     path: "users",
    //     match: { _id:req.user._id },
    //     select: "name email",
    // });
    //    await guide.populate({
    //             path: "users",
    //             match: { _id:guideId },
    //             model: "Guide",
    //             select: "name location",
    //         });

    // res.send(isChat)

    // if (isChat.length > 0) {
    //     res.send(isChat[0]);
    // } else {
    //     var chatData = {
    //         chatName: `${userExists.name} and ${guideExists.name}`,
    //         users: [req.user._id, guideId],
    //     };

    //     try {
    //         const createdChat = await Chat.create(chatData);

    //         const FullChat = await Chat.findOne({ _id: createdChat._id })
    //             .populate({
    //                 path: "users",
    //                 match: { _id: { $in: [req.user._id, guideId] } },
    //                 model: "User",
    //                 select: "name ",
    //             })
    //             .populate({
    //                 path: "users",
    //                 match: { _id: { $in: [guideId] } },
    //                 model: "Guide",
    //                 select: "name location",
    //             });
    //         // res.status(200).send(FullChat)

    //         // const userDetails = FullChat.users.find(user => user._id.toString() === req.user._id.toString());
    //         const guideDetails = FullChat.users.find(guide => guide._id.toString() === guideId);

    //         res.status(200).send(guideDetails);
    // } catch (error) {
    //     console.log(error);
    //     throw new Error(error.message)
    // }
    // }
})
