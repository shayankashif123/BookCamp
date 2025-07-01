import axios from 'axios';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData } from '../redux/bookSlice';
import Spinner from '../Context/Spinner';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [book, setBook] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const handleClick = async (id) => {
    try {
      await dispatch(fetchData(id)).unwrap();
      navigate(`/book/${id}`);
    } catch (err) {
      console.log(`Error in fetching data ${err}`)
    }
  }
  const handleBuyNow = async (id) => {
    try {
      await dispatch(fetchData(id)).unwrap();
      navigate(`/checkout/${id}`);
    } catch (err) {
      console.log(`Error in fetching data ${err}`)
    }
  }
  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    dispatch(addToCart(book));
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/books?page=${page}`);
        if (isMounted) {
          setBook(response.data.data.data);
          setTotalPage(response.data.data.totalPages)
        }
      } catch (err) {
        console.log(`Error in fetching data ${err}`);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => { isMounted = false }
  }
    , [page])

    useEffect(() => {
    const newPage = parseInt(searchParams.get("page")) || 1;
    setPage(newPage);
  }, [searchParams]);

  return (
    <div>
      <div className="container mx-auto px-3 py-5">
        {loading && <Spinner />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {book.map((book) => (
            <div onClick={() => handleClick(book._id)}
              key={book._id}
              className="border border-gray-200 p-6 shadow-md rounded-lg transition-all duration-300 ease-in-out  cursor-pointer  hover:border-blue-500  hover:scale-105 "
            >

              <div className="w-full h-85 overflow-hidden rounded-md">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-semibold text-xl mb-2 mt-3">{book.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
              <p className="text-sm font-semibold text-blue-600 mb-1">Category: {book.category}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">{book.price}</span>
                <span className={`text-sm font-medium ${book.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(), handleBuyNow(book._id) }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300
              relative top-2 ">
                Buy Now
              </button>
              <button onClick={(e) => handleAddToCart(book, e)} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 relative top-2  ml-2 md:ml-0 md:mt-2 lg:ml-2 ">
                🛒 Add to Cart
              </button>

            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 space-x-6">
          {page > 1 && (
            <button
              onClick={() => handlePageChange(page-1)}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
            >
              ← Prev
            </button>
          )}
          <span className="text-lg font-semibold">
            Page {page} of {totalPage}
          </span>

          {page < totalPage && (
            <button
              onClick={() => handlePageChange(page+1)}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>

  )
}

export default Home
