import mongoose from "mongoose";
const bookSchema=new mongoose.Schema({
    title:{ type: String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true},
    image:{type:String, required:true},
    featured: { type: Boolean, default: false }
})
const book = mongoose.model("book",bookSchema);
export default book;