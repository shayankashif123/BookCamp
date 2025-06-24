import React from 'react';
import { NavLink } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: "Fiction",
      path: "/books/fiction",
      image: "https://th.bing.com/th/id/R.d6b35447d70d07ebbb6d131ef81ed6f1?rik=vas1LceubM8OvA&pid=ImgRaw&r=0"
    },
    {
      name: "Self-Improvement",
      path: "/books/self-improvement",
      image:"https://th.bing.com/th/id/R.cf7ed7bfdb727d1a0c7d8af48e8eba65?rik=8cPJrEZPAj1x8g&pid=ImgRaw&r=0"
    },
    {
      name: "Programming",
      path: "/books/programming",
      image: "https://www.shutterstock.com/shutterstock/photos/2370541651/display_1500/stock-vector-vector-image-of-programming-language-logos-concept-for-developers-and-it-specialists-berlin-2370541651.jpg"
    },
    {
      name: "Biography",
      path: "/books/biography",
      image: "https://th.bing.com/th/id/OIP.S4odIgRpGxxL8MCyKGwSagHaHa?rs=1&pid=ImgDetMain"
    },
    {
      name: "Productivity",
      path: "/books/productivity",
      image: "https://th.bing.com/th/id/OIP.6Yi_q5vFqE0OVYIao3EgsAHaHa?o=7rm=3&rs=1&pid=ImgDetMain"
    },
    {
      name: "Philosophy",
      path: "/books/philosophy",
      image: "https://th.bing.com/th/id/R.698abf7283158eb1df2abfeb0f395c86?rik=RnqGax9eHPgSfw&pid=ImgRaw&r=0"
    },
    {
      name: "Business",
      path: "/books/business",
      image: "https://png.pngtree.com/templates/sm/20180331/sm_5abfb8f2d57c4.jpg"
    },
    {
      name: "History",
      path: "/books/history",
      image: "https://th.bing.com/th/id/OIP.piL_DKridfJJlJcquila6gHaHa?rs=1&pid=ImgDetMain"
    },
    {
      name:"Health & Fitness",
      path: "/books/health-fitness",
      image: "https://th.bing.com/th/id/OIP.fjwofK9DMqCNqzqUifgk5QHaE8?rs=1&pid=ImgDetMain"
    },
    {
      name:"Travel",
      path: "/books/travel",
      image: "https://th.bing.com/th/id/OIP.Oeb5S-qnoZOY6EpFxIsuogHaHa?rs=1&pid=ImgDetMain"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              to={category.path}
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-md">
                {category.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;