# 📚 BookCamp – Online Book Store

**BookCamp** is a full-stack online bookstore built with **React**, **Redux**, **Node.js**, **Express.js**, and **MongoDB**. It offers a seamless and responsive user experience, enabling users to **browse, search, and purchase books by category** using a **guest checkout flow**. The backend efficiently stores buyer data and dynamically updates book inventory based on purchases.

---

## 🚀 Tech Stack

### Frontend
- ⚛️ **React.js**
- 📦 **Redux** (for state management)
- 💨 **Tailwind CSS** (for styling)

### Backend
- 🌐 **Node.js**
- 🚂 **Express.js**
- 🗂 **MongoDB & Mongoose**

---

## 🌟 Key Features

- 📚 **Browse Books by Category**  
  Explore books organized into categories like Fiction, Non-Fiction, Technology, etc.

- 🔍 **Search Functionality**  
  Real-time search to find books by title or keyword.

- 🔢 **Pagination Support**  
  Efficiently handles large data sets by splitting listings into pages:
  - Loads only **10 books per page**
  - Uses **query parameters** (e.g. `?page=3`) for navigation
  - Maintains current page when navigating back from book detail view
  - Improves performance and user experience

- 🏷️ **Featured Books Section**  
  Highlights top picks and popular books on the homepage.

- 🛒 **Add to Cart**  
  Easily add and manage items in the cart before purchasing.

- 💸 **Buy Now Functionality**  
  Instantly purchase books without using the cart.

- 👤 **Guest Checkout**  
  No login required — buyers can checkout as guests.

- 📦 **Purchase Handling**  
  Stores complete buyer info in the database:
  - Name, Email, Address, Contact, and Purchase Date
  - Book details (title, quantity, total price, and payment method)

- 📉 **Dynamic Inventory Management**  
  Automatically reduces book quantity after a successful purchase.

- 🧾 **Order Summary**  
  Displays total amount, selected payment method, and purchased books.

- 💳 **Cash on Delivery (COD)**  
  Default payment method for all purchases.

- 💻 **Responsive & Intuitive UI**  
  Clean, modern interface optimized for all devices.

---

## 🧠 Sample Buyer Data (MongoDB Schema)

```json
{
  "_id": "67f9445488842994ddacbc43",
  "FirstName": "kashif",
  "LastName": "khalil",
  "Email": "kashiffaroqi23@gmail.com",
  "Address": "zakariya town street no 22",
  "City": "multan",
  "State": "punjab",
  "PostalCode": "66000",
  "Phone": "03007383715",
  "Country": "United Kingdom",
  "books": [
    {
      "_id": "67edd782d1c891055fac063d",
      "title": "Tools of Titans",
      "quantity": 2,
      "price": 3000,
      "paymentMethod": "cod",
      "purchaseDate": "2025-04-11T16:33:24.415+00:00",
      "totalAmount": 6000
    }
  ]
}
