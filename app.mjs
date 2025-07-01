import { addBook,getBookById,getAllBooks,getBookBySearch,getBookByCategory,getBookByFeatured,updateBookById,deleteBookById,handlePurchase,handleMultiplePurchase } from "./crud.controller.mjs";
import { connectDb,disconnectDb } from "./db.connect.mjs";
import Purchase from "./models/PurchaseSchema.mjs";
import express from "express"
import cors from "cors";
const app = express();
app.use(express.json());
app.use((cors()));
const PORT = 3000;
connectDb();
app.post("/books",async(req,res)=>{
    try{
        const bookData= req.body;
        const books=await addBook(bookData);
        res.status(201).json({message:"Book added successfully",success:true,data:books});
    } catch(error) {
        res.status(501).json({message:error.message,success:false})
    }
})
app.get("/book/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await getBookById(id);
        if(!book) {
          return res.status(404).json({message:"Book not found",success:false});
        }
        res.status(200).json({message:"Book found successfully",success:true,data:book});
    }
    catch(err) {
        res.status(500).json({message:err.message,success:false});
    }
})
app.get("/books/search", async (req, res) => {
    try {
        const title = req.query.title;
        if (!title?.trim()) { // if title is empty or undefined and even after trimming it is empty
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        const books = await getBookBySearch(title.trim());
        return res.json({
            success: true,
            message: books.length 
                ? `${books.length} books found`
                : "No books match your search",
            data: books
        });
    } catch (err) {
        console.error('Search endpoint error:', err);
        return res.status(500).json({
            success: false,
            message: "Search failed - please try again"
        });
    }
});
app.get("/books/:category",async(req,res)=>{
    try{
        const {category}=req.params;
        const books= await getBookByCategory(category);
        if(!books) {
            return res.status(404).json({message:"Books not found",success:false});
        }
        res.status(200).json({message:"Books fetched successfully",success:true,data:books});
    } catch(err) {
        res.status(500).json({message:err.message,success:false});
    }
})
app.get("/featured",async(req,res)=>{
    try{
        const books= await getBookByFeatured();
        if(!books) {
            return res.status(404).json({message:"Books not found",success:false});
        }
        res.status(200).json({message:"Books fetched successfully",success:true,data:books});
    } catch(err) {
        res.status(500).json({message:err.message,success:false});
    }
})
app.get("/books",async(req,res)=>{
    try{
        const page = parseInt(req.query.page)||1;
        const limit = 10;
        const books= await getAllBooks(page,limit);
        if (!books) {
            return res.status(400).json({message:"Books not found",success:false});
        }
        res.status(200).json({message:"Books fetched successfully",success:true,data:books});
    }  catch(err){
        res.status(500).json({message:err.message,success:false});
    }
})
app.put("/book/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const {updatedData}=req.body;
        const book= await updateBookById(id,updatedData);
        if(!book) {
            return res.status(404).json({message:"Book not found",success:false});
        } 
        res.status(200).json({message:"Books updated successfully",success:true,data:product});
    } catch(err) {
        res.status(500).json({message:err.message,success:false})
    }
})
app.delete("/book/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const Book=await deleteBookById(id);
        if(!Book) {
            return res.status(404).json({message:"Book not found",success:false})
        }
        res.status(200).json({message:"Books deleted successfully",success:true,data:Book})
    } catch(err) {
        res.status(500).json({message:err.message,success:false});
    }
})
app.post("/purchase/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {quantity}=req.body;
        if(!quantity || quantity<=0) {
            return res.status(404).json({message:"Invalid quantity",success:false});
        }
        const purchase=await handlePurchase(id,quantity);
        if (!purchase.success) {
            return res.status(400).json({ message: purchase.message, success: false });
        }
        res.status(201).json({ message: "Purchase successful", success: true, data: purchase });
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
})
app.post("/multiplePurchase", async (req, res) => {
    try {
      const { books } = req.body;
      if (!books || !Array.isArray(books)) {
        return res.status(400).json({
          success: false,
          message: "Invalid books data: Expected an array"
        });
      }
  
      const purchaseResults = await handleMultiplePurchase(books);
      const hasFailures = purchaseResults.some(item => !item.success);
  
      if (hasFailures) {
        return res.status(207).json({ 
          success: false,
          message: "Some items could not be purchased",
          data: purchaseResults
        });
      }
      res.status(201).json({
        success: true,
        message: "All books purchased successfully",
        data: purchaseResults
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  });
app.post("/bookPurchase",async(req,res)=>{
    try{
    const{FirstName,LastName,Email,Address,City,State,PostalCode,Phone,Country,paymentMethod,books,purchaseDate,totalAmount}=req.body;
    const newPurchase=new Purchase({
        FirstName,
        LastName,
        Email,
        Address,
        City,
        State,
        PostalCode,
        Phone,
        Country,
        books,
        paymentMethod,
        purchaseDate,
        totalAmount
    })
        const savedPurchase=await newPurchase.save();
        res.status(201).json({message:"Purchase details saved successfully",success:true,data:savedPurchase})
    } catch(err) {
        res.status(500).json({message:err.message,success:false});
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
process.on("SIGINT",async()=>{
    await disconnectDb();
    process.exit();
})
