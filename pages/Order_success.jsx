import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId,bookTitle, totalAmount } = location.state || {};

    return (
        <div className="bg-green-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-6">Order Placed Successfully!</h1>
                    <div className="mb-6">
                        <p className="text-lg text-gray-700">Thank you for your purchase! Your order has been successfully placed.</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                        <p className="text-gray-700 mt-2">Order ID: <span className="font-medium">{orderId}</span></p>
                        <p className="text-gray-700 mt-2">Book Title,: <span className="font-medium">{bookTitle}</span></p>
                        <p className="text-gray-700 mt-2">Total Amount: <span className="font-medium">{totalAmount}</span></p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-md transition duration-300 hover:bg-blue-700"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
