import express from "express";
import dotenv from 'dotenv'
import { connectDB } from './config/connection.js'
import cors from 'cors';
import morgan from 'morgan';
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import guideRouter from "./routes/guide.js";
import conversationRouter from "./routes/conversation.js";
import messageRouter from "./routes/messages.js";
import fileUpload from 'express-fileupload'
import { Server } from 'socket.io';


const app = express();
dotenv.config();
connectDB();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(morgan('dev'));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));
app.use(fileUpload({
  useTempFiles: true
}))

app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/guide', guideRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter);
          


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));


const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    cors:true,
  },
});

let users = [];

const adduser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
}

const getUser = (userId) => {
  return users.find(user => user.userId === userId)
}

const removeUser = (socketId) => {
  users = users.filter((user => user.socketId !== socketId))
}

io.on('connection', (socket) => {
  console.log("Socket connected");

  // take userid and socketid from the user
  socket.on("addUser", userId => {
    adduser(userId, socket.id)
    io.emit("getUsers", users)
  })

  socket.on("disconnect", ()=> {
    console.log("user disconnected");
    removeUser(socket.id)
    io.emit("getUsers", users)
  })

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    })
  });
});


