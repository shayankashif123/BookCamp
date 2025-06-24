import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../redux/bookSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { setSearchTerm,clearSearchResult,searchBooks } from '../redux/searchSlice';
import Spinner from '../Context/Spinner';
const Search = () => {
    const dispatch = useDispatch();
    const {
        searchTerm,
        searchResult,
        error,
        loading
    }= useSelector((state)=>state.search)
 const navigate=useNavigate()   
    const handleInputChange = (e) => {
     dispatch(setSearchTerm(e.target.value));
        if (!e.target.value.trim()) {
            dispatch(clearSearchResult())
        }
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(searchTerm.trim()) {
        dispatch(searchBooks(searchTerm))
    }
}
    const handleClick = async (id) => {
        try {
            await dispatch(fetchData(id)).unwrap();
            navigate(`/book/${id}`);
        } catch (err) {
            console.log(`Error in fetching data ${err}`);
        }
    };
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


    console.log('Search Results:', searchResult);
    console.log('Error:', error);
    return (
        <div className="min-h-screen bg-gray-50">
            {loading && <Spinner />}
            <div className="flex items-center justify-center p-6">
                <div className="relative max-w-md w-full">
                    <div className="absolute top-3 left-3">
                        <span className="material-icons" style={{ color: "#9CA3AF" }}> 
                            search
                        </span>
                    </div>
                    <input 
                        value={searchTerm}
                     onChange={handleInputChange}
                     onKeyDown={(e)=>e.key==='Enter' && handleSubmit(e)}
                        type="text"
                        className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search for anything..."
                    />
                    <button 
                         onClick={handleSubmit}
                         disabled={!searchTerm.trim()}
                        className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="pb-10">
                {error ? (
                    <div className="container mx-auto px-3 py-5">
                        <div className="text-center text-xl text-red-500 font-semibold">
                            {error}
                        </div>
                    </div>
                ) : searchResult && searchResult.length > 0 ? (
                    <div className="container mx-auto px-3 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {searchResult.map((book) => (
                                <div onClick={()=>handleClick(book._id)} key={book._id}   className="border border-gray-200 p-6 shadow-md rounded-lg bg-white 
                                hover:shadow-lg transition-all ease-in-out duration-300 
                                cursor-pointer hover:scale-105 hover:border-red-500">
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
                                    <div className="flex mt-4 space-x-2">
                                        <button onClick={(e)=>{e.stopPropagation(),handleBuy(book._id)}} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex-1">
                                            Buy Now
                                        </button>
                                        <button 
                                            onClick={(e) => handleAddToCart(book,e)}
                                            disabled={book.quantity <= 0}
                                            className={`flex-1 flex items-center justify-center font-semibold py-1 px-4 rounded-lg shadow-md transition duration-300 ${
                                                book.quantity > 0 
                                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                                            }`}
                                        >
                                            <span className="mr-1">🛒</span> 
                                            {book.quantity > 0 ? 'Add to Cart' : 'Unavailable'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto px-3 py-5">
                        <div className="text-center text-xl text-gray-500">
                            {searchTerm ? "No books found. Try a different search." : "Enter a search term to find books"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;