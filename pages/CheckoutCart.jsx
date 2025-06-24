import { useContext, useEffect, useState } from "react";
import Spinner from "../Context/Spinner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { handleMultiplePurchase } from "../redux/purchaseSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const CheckoutCart = () => {
    const navigate = useNavigate();
    const cart = useSelector((state)=>state.cart.items)
    const totalAmount=useSelector((state)=>state.cart.totalAmount);
    const dispatch=useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isLoading, setIsLoading] = useState(true);
    const[isSubmitting,setIsSubmitting]=useState(false);
    const [error, setError] = useState(null);
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); 
        return () => clearTimeout(timer); 
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      setIsSubmitting(true);
      setError(null);
      try{
       const purchasedData = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
        Address: data.streetAddress,
        City: data.townCity,
        State: data.state,
        PostalCode: data.postalCode,
        Phone: data.phone,
        Country: data.country,
        books: cart.map((item) => ({
            _id: item._id,
            title: item.title,
            quantity: item.quantity,
            price: item.price
        })),
        paymentMethod: paymentMethod,
        purchaseDate: new Date().toISOString(),
        totalAmount: totalAmount
       }
       await dispatch(handleMultiplePurchase(cart)).unwrap();
       const response = await axios.post("http://localhost:3000/bookPurchase", purchasedData);
       if(response.data.success) {
        navigate('/order-success',{
            state:{
                orderId:uuidv4(),
                bookTitle:cart.map((item) => item.title),
                totalAmount:totalAmount,
            }
        })
       } else{
        setError(response.data.message || "Failed to place order");
       }
      } catch(err) {
        console.error(err);
        setError(err.response?.data?.message);
      }
      finally{
        setIsSubmitting(false);
      }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner />
                </div>
            ) : (
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        {...register("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input 
                                            type="text" 
                                            id="first-name" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            {...register("firstName", { 
                                                required: "First name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "First name must be at least 2 characters"
                                                }
                                            })}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input 
                                            type="text" 
                                            id="last-name" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            {...register("lastName", { 
                                                required: "Last name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Last name must be at least 2 characters"
                                                }
                                            })}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                    <input 
                                        type="text" 
                                        id="street-address" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        {...register("streetAddress", { 
                                            required: "Street address is required",
                                            minLength: {
                                                value: 5,
                                                message: "Address must be at least 5 characters"
                                            }
                                        })}
                                    />
                                    {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="town-city" className="block text-sm font-medium text-gray-700 mb-1">Town/City</label>
                                    <input 
                                        type="text" 
                                        id="town-city" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        {...register("townCity", { 
                                            required: "Town/City is required",
                                            minLength: {
                                                value: 2,
                                                message: "Town/City must be at least 2 characters"
                                            }
                                        })}
                                    />
                                    {errors.townCity && <p className="text-red-500 text-xs mt-1">{errors.townCity.message}</p>}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                        <input 
                                            type="text" 
                                            id="postal-code" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            {...register("postalCode", { 
                                                required: "Postal code is required",
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Postal code must be numeric"
                                                }
                                            })}
                                        />
                                        {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input 
                                            type="text" 
                                            id="state" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            {...register("state", { 
                                                required: "State is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "State must be at least 2 characters"
                                                }
                                            })}
                                        />
                                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                        <select 
                                            id="country" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            {...register("country", { required: "Country is required" })}
                                        >
                                            <option value="">Select Country</option>
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Pakistan">Pakistan</option>
                                        </select>
                                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                                    <input 
                                    type="text" 
                                    id="phone"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    {...register("phone", { 
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Phone number must be numeric"
                                        }
                                    })}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Payment Method</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input 
                                                id="cod" 
                                                name="payment-method" 
                                                type="radio" 
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={handlePaymentChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                                            />
                                            <label htmlFor="cod" className="ml-2 block text-sm text-gray-700">Cash on Delivery</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input 
                                                id="card" 
                                                name="payment-method" 
                                                type="radio" 
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={handlePaymentChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                                            />
                                            <label htmlFor="card" className="ml-2 block text-sm text-gray-700">Credit/Debit Card</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <button onClick={(e)=>e.stopPropagation()}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-6 text-white font-semibold rounded-md transition duration-300 ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {isSubmitting ? 'Placing Order...' : `Place Order - ${totalAmount.toFixed(2)}`}
                                </button>
                            </form>
                        </div>
                        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-6">Your Order</h2>
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between mb-2">
                                        <span className="mr-5">{item.title}×{item.quantity}</span>
                                        <span>{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-semibold text-lg mb-4">
                                <span>Total</span>
                                <span>{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutCart;