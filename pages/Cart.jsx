import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { removeItems } from '../redux/cartSlice';
import { fetchData } from '../redux/bookSlice';
const Cart = () => {
  const cart = useSelector((state)=>state.cart.items)
  const totalAmount = useSelector((state)=>state.cart.totalAmount)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async (id) => {
    try {
      await dispatch(fetchData(id)).unwrap();
      navigate(`/book/${id}`);
    } catch (err) {
      console.log(`Error in fetching data ${err}`);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/checkoutcart');
  };
  const handleremoveItems=(id,e)=>{
    e.stopPropagation();
    dispatch(removeItems(id));
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map(({ _id, image, title, price, quantity }) => (
              <div onClick={() => handleClick(_id)} key={_id} className="cursor-pointer flex items-center border-b border-gray-200 pb-6">
                <img
                  src={image}
                  alt={title}
                  className="w-24 h-24 object-cover rounded-lg mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                  <p className="text-gray-600">Price: {(price ?? 0).toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {quantity}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                   handleremoveItems(_id,e)
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Total Amount: {(totalAmount ?? 0).toFixed(2)}
            </h2>
            <button
              onClick={handleProceedToPayment}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;