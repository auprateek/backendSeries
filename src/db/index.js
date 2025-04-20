import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DB connected : connection Instance ${connectionInstance.connection.host}` )

    } catch (error) {
        console.error(`Error while connecting to db`, error)
        process.exit(1)
    }
}

export default connectDB