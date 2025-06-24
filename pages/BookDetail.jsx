import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../redux/bookSlice';
import { addToCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData(id));
  }, [id]);

  const selectedBook = useSelector((state) => state.book.selectedBook);

  if (!selectedBook) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  const handleBuy = async(id) => {
    try {
    await dispatch(fetchData(id)).unwrap();
    navigate(`/checkout/${id}`);
    } catch(error) {
      console.log(`Error in fetching data ${error}`)
    }
  };

  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    dispatch(addToCart(book));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <img
            src={selectedBook.image}
            alt={selectedBook.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedBook.title}</h1>
          <p className="text-gray-700 mb-4">{selectedBook.description}</p>
          <p className="text-blue-600 font-semibold mb-2">
            Category: {selectedBook.category}
          </p>
          <p className="text-xl font-bold mb-4">
            Rs. {Number(selectedBook.price).toLocaleString()}
          </p>
          <p
            className={`text-sm font-medium mb-4 ${selectedBook.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {selectedBook.quantity > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleBuy(selectedBook._id);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 cursor-pointer"
            >
              Buy Now
            </button>
            <button
              onClick={(e) => handleAddToCart(selectedBook, e)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 cursor-pointer"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
