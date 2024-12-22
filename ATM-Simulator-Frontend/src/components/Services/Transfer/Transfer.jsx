/*import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import './Transfer.css';
const Transfer=()=>{
    const [accountNumber,setAccountNumber]=useState("");
    const [amount,setAmount]=useState("");
    const [name,setName]=useState("");

    const navigate=useNavigate();

    const transferMoney=async()=>{
        try{
            const response=await axios.post("http://localhost:8080/transfer",{amount});
            console.log("Money Transfer was successful",response.data);

            if(response.status==200){
                navigate("/afterdashboard", { state: { message: `$${amount} has been successfully transferred.` } })
            }
        }
        catch(error){
            console.error("Error transferring money",error);
        }
    }
    return(
        <>
        <h3 className="transfer-header">Transfer to</h3>
        <div className="transfer-body">
        <Input
          type='text'
          labelText={'Account Number'}
          placeholderText="Enter the Account number"
          value={accountNumber}
          onChange={(e)=>setAccountNumber(e.target.value)}
        />
        <Input
            type="text"
            labelText={'Name'}
            placeholderText='Enter Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />
        <Input
            type='number'
            labelText={'Transfer'}
            placeholderText="Enter amount"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
         />
         <Button buttonText={'Transfer'} onClick={transferMoney}/>
         </div>
         
        </>
    )
}
export default Transfer;*/
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import './Transfer.css';

const Transfer = () => {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(""); // State to handle errors
    const navigate = useNavigate();

    const transferMoney = async () => {
        // Basic validation
        if (!accountNumber || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Please enter a valid account number and amount.");
            return;
        }
        setError(""); // Clear previous errors

        try {
            // Sending the correct payload
            const response = await axios.post("http://localhost:8080/transfer", {
                fromAccount: localStorage.getItem("accountNumber"), // Assuming you are storing the logged-in user's account
                toAccount: accountNumber,
                amount: parseFloat(amount), // Ensure the amount is treated as a number
            });

            console.log("Money transfer was successful", response.data);

            if (response.status === 200) {
                navigate("/afterdashboard", { state: { message: `$${amount} has been successfully transferred.` } });
            }
        } catch (error) {
            console.error("Error transferring money", error);
            setError("Failed to transfer money. Please try again.");
        }
    };

    return (
        <>
            <h3 className="transfer-header">Transfer to</h3>
            <div className="transfer-body">
                <Input
                    type="text"
                    labelText="Account Number"
                    placeholderText="Enter the Account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <Input
                    type="text"
                    labelText="Name"
                    placeholderText="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="number"
                    labelText="Amount"
                    placeholderText="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <Button buttonText="Transfer" onClick={transferMoney} />
            </div>
        </>
    );
};

export default Transfer;
