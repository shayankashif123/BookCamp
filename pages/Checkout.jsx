import React, { useState, useEffect, useContext } from 'react';
import { handlePurchase } from '../redux/purchaseSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Context/Spinner';
import { useForm } from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedBook= useSelector((state)=>state.book.selectedBook);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [Loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();

    useEffect(() => {
        if (!selectedBook) {
            navigate("/");
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [selectedBook, navigate]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            const purchaseData = {
                FirstName: data.firstName,
                LastName: data.lastName,
                Email: data.email,
               Address: data.address,
                City: data.city,
                State: data.state,
                PostalCode: data.postalCode,
                Phone: data.phone,
                Country: data.country,
                books:[{
                    _id:selectedBook._id,
                    title: selectedBook.title,
                    quantity: 1,
                    price: selectedBook.price
                }],
                paymentMethod: paymentMethod,
                purchaseDate: new Date().toISOString(),
                totalAmount: Number(selectedBook.price), 
            };
            await dispatch(handlePurchase({ id: selectedBook._id, quantity: 1 })).unwrap();

            const response = await axios.post("http://localhost:3000/bookPurchase",purchaseData);

            if (response.data.success) {
                navigate('/order-success', {
                    state: {
                        orderId: uuidv4(),
                        bookTitle: selectedBook.title,
                        totalAmount: selectedBook.price
                    }
                });
            } else {
                setSubmitError(response.data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order submission error:', error);
            setSubmitError(error.response?.data?.message || 'An error occurred while placing your order');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedBook) {
        return null;
    }
    return (
        <div className="bg-gray-100 min-h-screen py-8">
            {Loading ? (
                <Spinner />
            ) : (
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                            {submitError && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                    {submitError}
                                </div>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)}>
            
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        {...register('firstName', { required: 'First name is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                                    )}
                                </div>

                                
                                <div className="mb-4">
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        {...register('lastName', { required: 'Last name is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                    )}
                                </div>

                       
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
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
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                               
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        {...register('address', { required: 'Address is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                                    )}
                                </div>

                                
                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        {...register('city', { required: 'City is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                                    )}
                                </div>

                               
                                <div className="mb-4">
                                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        {...register('state', { required: 'State is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.state && (
                                        <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                                    )}
                                </div>

                                
                                <div className="mb-4">
                                    <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        {...register('postalCode', { required: 'Postal code is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.postalCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        {...register('phone', { required: 'Phone number is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                
                                <div className="mb-4">
                                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        {...register('country', { required: 'Country is required' })}
                                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                                    />
                                    {errors.country && (
                                        <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                                    )}
                                </div>

    
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Payment Method
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <input
                                                type="radio"
                                                id="cod"
                                                value="cod"
                                              {...register('paymentMethod', { required: 'Payment method is required' })}
                                          
                                                className="mr-2"
                                            />
                                            <label htmlFor="cod" className="text-sm">Cash on Delivery</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="card"
                                                value="card"
                                               
                                                
                                                {...register('paymentMethod', { required: 'Payment method is required' })}
                                                className="mr-2"
                                            />
                                            <label htmlFor="card" className="text-sm">Credit/Debit Card</label>
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
                                    {isSubmitting ? 'Placing Order...' : `Place Order - ${selectedBook.price}`}
                                </button>
                            </form>
                        </div>

                        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow h-[60vh]">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="border-b pb-4 mb-4">
                                <p className="text-gray-700">Book: <span className="font-medium">{selectedBook.title}</span></p>
                                <p className="text-gray-700">Price: <span className="font-medium">{selectedBook.price}</span></p>
                            </div>
                            <p className="text-gray-800 font-bold text-lg">Total: {selectedBook.price}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
