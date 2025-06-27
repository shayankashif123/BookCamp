import book from "./models/schmea.mjs";

const addBook = async (bookDetail) => {
    try {
        const existingBook = await book.findOne({ title: bookDetail.title }).lean();
        if (existingBook) {
            return { message: "Book already exists", success: false };
        }
        const Books = new book(bookDetail);
        await Books.save();
        return { message: "Book added succesfully", success: true, data: Books }
    } catch (err) {
        console.log(`Error in adding book ${err}`)
        return { message: err.message, success: false };
    }
}
const getBookBySearch = async (title) => {
    try {
        const books = await book.find({
            title: { $regex: title, $options: "i" }
        }).lean();
        return books;

    } catch (err) {
        console.error('Search query failed:', err);
        throw new Error('Database search error');
    }
}
const getBookById = async (id) => {
    try {
        const Books = await book.findById(id).lean();
        if (Books.length === 0) {
            return { message: "Book not found", success: false }
        }
        return { message: "Book found successfully", success: true, data: Books };
    }
    catch (err) {
        console.log(`Error in searching book ${err}`);
        return { message: err.message, success: false };
    }
}
const getBookByCategory = async (category) => {
    try {
        const Books = await book.find({ category: { $regex: category, $options: "i" } }).lean();
        if (Books.length === 0) {
            return { message: "Book not found", success: false }
        }
        return { message: "Book found successfully", success: true, data: Books };
    } catch (err) {
        console.log(`Error in searching book ${err}`);
        return { message: err.message, success: false };
    }
}
const getBookByFeatured = async () => {
    try {
        const Books = await book.find({ featured: true }).lean();
        if (Books.length === 0) {
            return { message: "Book not found", success: false }
        }
        return { message: "Book found successfully", success: true, data: Books };
    } catch (err) {
        console.log(`Error in searching book ${err}`);
        return { message: err.message, success: false };
    }
}
const getAllBooks = async () => {
    try {
        const Books = await book.find().lean();
        if (!Books) {
            return { message: "Books not found", success: false };
        }
        return { message: "Books fetched successfully", success: true, data: Books };
    }
    catch (err) {
        return { message: err.message, success: false };
    }
}
const updateBookById = async (id, updatedBook) => {
    try {
        const Books = await book.findByIdAndUpdate(id, updatedBook, { new: true });
        if (!Books) {
            return { message: "Book not found", success: false };
        }
        return { message: "Book updated successfully", success: true, data: Books };
    } catch (err) {
        return { message: err.message, success: false };
    }

}
const deleteBookById = async (id) => {
    try {
        const Book = await book.findByIdAndDelete(id)
        if (!Book) {
            return { message: "Book not found", success: false };
        }
        return { message: "Book deleted successfully", success: true, data: Book };
    } catch (err) {
        return { message: err.message, success: false };
    }
}
    const handlePurchase = async (id, quantity) => {
        try {
            const updatedBook = await book.findOneAndUpdate(
                { _id: id, quantity: { $gte: quantity } },
                { $inc: { quantity: -quantity } },     
                { new: true }                           
            );

            if (!updatedBook) {
                return { message: "Not enough quantity available or book not found", success: false };
            }

            return {
                message: "Book purchased successfully",
                success: true,
                data: updatedBook,
            };
        } catch (err) {
            return { message: err.message, success: false };
        }
    };
  const handleMultiplePurchase = async (books) => {
  try {
    const results = [];

    for (const item of books) {
      const { _id, quantity, title } = item;

      const updatedBook = await book.findOneAndUpdate(
        { _id, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { new: true }
      );

      if (!updatedBook) {
        results.push({
          success: false,
          message: `Not enough quantity available or book "${title}" not found`,
        });
      } else {
        results.push({
          success: true,
          message: `Book "${title}" purchased successfully`,
          data: updatedBook,
        });
      }
    }

    return results;
  } catch (err) {
    return {
      success: false,
      message: err.message,
      data: null,
    };
  }
};

    export { addBook, getBookBySearch, getBookById, getAllBooks, getBookByCategory, getBookByFeatured, updateBookById, deleteBookById, handlePurchase, handleMultiplePurchase }