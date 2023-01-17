import  express  from "express";
import dotenv from 'dotenv'
import {connectDB} from './config/connection.js'
import cors from 'cors';
import morgan from 'morgan';
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import { connect } from "mongoose";


const app = express();
dotenv.config();
connectDB();


app.use(morgan('dev'));
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use('/users', userRouter);
app.use('/admin', adminRouter);         
 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));


