import  express  from "express";
import dotenv from 'dotenv'
import {connectDB} from './config/connection.js'
import cors from 'cors';
import morgan from 'morgan';
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import guideRouter from "./routes/guide.js";
import fileUpload from 'express-fileupload'
import { connect } from "mongoose";


const app = express();
dotenv.config();
connectDB();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

app.use(morgan('dev'));
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors(corsOptions));
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/guide', guideRouter);           
 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));


