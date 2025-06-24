
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout"
import Home from "../pages/Home";
import Featured from "../pages/Featured"
import Categories from "../pages/Categories"
import Contact from "../pages/Contact"
import Cart from "../pages/Cart";
import Search from "../pages/Search";
import BooksCategory from "../pages/Books/BooksCategories";
import BookDetail from "../pages/BookDetail";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/Order_success";
import CheckoutCart from "../pages/CheckoutCart";
import { BuyProvider } from "../Context/buyContext";
const Books=()=>{
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children: [
        {index:true,element:<Home/>},
        {path:"/categories",element:<Categories/>},
        {path:"/featured",element:<Featured/>},
        {path:"/contacts",element:<Contact/>},
        {path:"/cart",element:<Cart/>},
        {path:"/search",element:<Search/>},
        {path:"/books/:category",element:<BooksCategory/>},
        {path:"/book/:id",element:<BookDetail/>},
        {path:"/checkout/:id",element:<Checkout/>},
        {path:"/checkoutcart",element:<CheckoutCart/>},
        {path:"/order-success",element:<OrderSuccess/>},
      ],
    },
  ])
  return (
    <BuyProvider>
  <RouterProvider router={routes}/>
  </BuyProvider>
  );
};
export default Books
