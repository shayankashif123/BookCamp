
📚 BookCamp – Online Book Store
BookCamp is a full-stack online bookstore built with React, Redux, Node.js, Express.js, and MongoDB. It offers a seamless and responsive user experience, enabling users to browse, search, and purchase books by category using a guest checkout flow. The backend efficiently stores buyer data and dynamically updates book inventory based on purchases.

🚀 Tech Stack
Frontend
⚛️ React.js

📦 Redux (for state management)

💨 Tailwind CSS (for styling)

Backend
🌐 Node.js

🚂 Express.js

🗂 MongoDB & Mongoose

🌟 Key Features
📚 Browse Books by Category

Users can explore books organized into relevant categories such as Fiction, Non-Fiction, Technology, etc.

🔍 Search Functionality

Real-time search to find books by title or keyword.

🏷️ Featured Books Section

Highlights top picks and popular books on the homepage.

🛒 Add to Cart

Easily add and manage items in the cart before purchasing.

💸 Buy Now Functionality

Allows users to directly purchase books without going to the cart.

👤 Guest Checkout

No login required — buyers can checkout as guests.

📦 Purchase Handling

Stores all buyer information in the database:

Name, Email, Address, Contact, and Purchase Date

Book details (title, quantity, total price, and payment method)

📉 Dynamic Inventory Management

Automatically reduces stock quantity upon successful purchase.

🧾 Order Summary

Displays total amount, selected payment method, and purchase details.

💳 Cash on Delivery (COD)

Default payment method for purchases.

💻 Responsive & Intuitive UI

Clean, modern interface for seamless user interaction across devices.

🧠 Sample Buyer Data (MongoDB Schema)
json
Copy
Edit
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
📸
🛠️ Getting Started
bash
Copy
Edit
# Clone the repository
git clone https://github.com/your-username/bookcamp.git

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install


📞 Phone: 03157383715
