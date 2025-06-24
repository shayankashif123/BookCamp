import react, { createContext, useState } from "react";
import axios from "axios";
const BuyContext = createContext();
const BuyProvider = ({ children }) => {
    const [purchaseBook,setPurchaseBook] = useState(null);
    const [multiplePurchaseBook,setMultiplePurchaseBook] = useState([]);
    const handlePurchase=async(id,quantity)=>{
        try {
        const response = await axios.post(`http://localhost:3000/purchase/${id}`,{quantity});
        if(response.data.data.data) {
            setPurchaseBook(response.data.data.data);
    } 
  }  catch(err) {
        console.log(`Error in purchasing book ${err}`);
    }
    }
    const handleMultiplePurchase=async(books)=>{
        try {
            const response = await axios.post(`http://localhost:3000/multiplePurchase`, { books });
            if (response.data.data.data) {
                setMultiplePurchaseBook(response.data.data.data);
            }
        } catch (err) {
            console.log(`Error in purchasing book ${err}`);
        }
    }
    return (
        <BuyContext.Provider value={{ purchaseBook,handlePurchase,handleMultiplePurchase,multiplePurchaseBook }}>
            {children}
        </BuyContext.Provider>
    )
}
export { BuyProvider, BuyContext };