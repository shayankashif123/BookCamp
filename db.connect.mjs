import mongoose from "mongoose";
const uri = "mongodb://localhost:27017/bookcamp"
const connectDb=async()=>{
    try{
        await mongoose.connect(uri);
        console.log("Database connected successfully")
    } catch(err) {
        console.log("Error connecting to database");
    }
}
const disconnectDb=async()=>{
    try{
        await mongoose.disconnect();
        console.log("Database disconnected successfully")
    } catch(err) {
        console.log("Error in disconnecting to database");
    }
}
export {connectDb,disconnectDb}