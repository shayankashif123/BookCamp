import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../redux/bookSlice'
import Spinner from '../Context/Spinner'
const Featured = () => {
  const [loading, setLoading] = useState(false)
  const [featuredBooks, setFeaturedBooks] = useState([])
  const navigate = useNavigate()
  const dispatch=useDispatch();
  useEffect(() => {
    let isMounted = true
    const fetchFeaturedBooks = async () => {
      setLoading(true)
      setTimeout(async() => {
      try {
        const books = await axios.get("http://localhost:3000/featured")
        console.log(books.data.data.data)
        const featuredData = books.data?.data?.data || []
        if (isMounted) {
          setFeaturedBooks(featuredData)
        }
      }
      catch (err) {
        console.log(`Error in fetching featured books ${err}`)
      }
      finally {
        setLoading(false)
      }
    },500)
    }
    fetchFeaturedBooks()
    return () => { isMounted = false }
  }, [])
  const handleClick = async (id) => {
    try {
      await dispatch(fetchData(id)).unwrap();
      navigate(`/book/${id}`)
    } catch (err) {
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
      dispatch(addToCart(book));
    }
  return (
    <div className="container mx-auto px-3 py-5">
      {loading && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {featuredBooks.map((book) => (
          <div onClick={()=>handleClick(book._id)} key={book._id} className="flex flex-col md:flex-row border border-gray-200 p-6 shadow-md rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:border-blue-500 hover:scale-105"> 
            <div className="w-full  md:w-1/3 h-104 md:h-55 rounded-md mb-4 md:mb-0">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 md:pl-6 flex flex-col">
              <h2 className="font-semibold text-xl mb-2">{book.title}</h2>
              <p className="text-sm font-semibold text-blue-600 mb-2">Category: {book.category}</p>

              <p className="text-gray-600 mb-4">{book.description}</p>

              <span className={`text-sm font-medium ${book.quantity > 0 ? 'text-green-600' : 'text-red-600'} mb-2`}>
                {book.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>

              <div className="mt-auto">
                <span className="text-lg font-bold block mb-3">{book.price}</span>
                <div className="flex flex-row gap-2">
                  <button onClick={(e)=>{e.stopPropagation(),handleBuy(book._id)}} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-300 flex-1 sm:flex-none">
                    Buy Now
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(book,e)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-300 flex-1 sm:flex-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Featured