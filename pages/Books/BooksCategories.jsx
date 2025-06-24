import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { addToCart } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../redux/bookSlice'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Context/Spinner'
const BooksCategory = () => {
  const dispatch= useDispatch();
    const [books, setBooks] = useState([])
    const[err,setErr]=useState("")
    const [loading,setLoading]=useState(false)
    const {category} = useParams();
    useEffect(()=>{
        const fetchBook=async()=>{
          setLoading(true)
          setTimeout(async()=>{
            try {
            const response=await axios.get(`http://localhost:3000/books/${category}`)
            console.log(response.data.data.data)
            const booksData = response.data?.data?.data || [];
            setBooks(booksData);
            setErr('');
            } catch (error) {
                setErr(error.response?.data?.message || "Books not found")
                setBooks([]);
            }  
            finally{
                setLoading(false)
            } 
        }
        ,500)
        }
        fetchBook();
    },[])
    console.log(category)
    const navigate=useNavigate()
    const handleClick=async (id)=>{
        try{
          await dispatch(fetchData(id)).unwrap();
          navigate(`/book/${id}`);
        }catch(err){
          console.log(`Error in fetching data ${err}`)
        }
      }
      const handleBuy=async(id)=>{
        try{
          await dispatch(fetchData(id)).unwrap();
          navigate(`/checkout/${id}`);
        }
        catch(err) {
          console.log(`${err}`)
        }
      }
      const handleAddToCart=(book,e)=>{
        e.stopPropagation();
        dispatch(addToCart(book,e));
      }

  return (
    <div>
      <div className="container mx-auto px-3 py-5">
        {loading && <Spinner/>}
        {err && <div className="text-red-500 text-center mt-5">{err}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div onClick={()=>handleClick(book._id)} key={book._id} className="border border-gray-200 p-6 shadow-md rounded-lg transition-all duration-300 ease-in-out  cursor-pointer  hover:border-blue-500  hover:scale-105 ">

              <div className="w-full h-60 overflow-hidden rounded-md">
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
              <button onClick={(e)=>{e.stopPropagation(),handleBuy(book._id)}} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300
              relative top-2 ">
                Buy Now
              </button>
              <button onClick={(e)=> handleAddToCart(book,e)} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 relative top-2  ml-2">
                🛒 Add to Cart
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default BooksCategory