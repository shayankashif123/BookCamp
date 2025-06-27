import mongoose from "mongoose";
const pruchaseSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    PostalCode: { type: String, required: true },
    Phone: { type: String, required: true },
    Country: { type: String, required: true },
    books:[{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true,default:1 },
        price: { type: Number, required: true }
    }],
    paymentMethod: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
   
    totalAmount: { type: Number, required: true },
})
const Purchase = mongoose.model("Purchase", pruchaseSchema);
export default Purchase;