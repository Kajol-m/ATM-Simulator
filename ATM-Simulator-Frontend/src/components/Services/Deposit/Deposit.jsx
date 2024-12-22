import React, { useState } from "react";
import Input from "../../../common/Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated for navigation
import Button from "../../../common/Button/Button";
import "./Deposit.css";

const Deposit = () => {
    // State to hold the deposit amount
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(""); // To handle errors

    const navigate = useNavigate(); // Hook for navigation

    // Function to handle the deposit
    const depositMoney = async () => {
        const storedAccountNumber = localStorage.getItem("accountNumber");
        console.log(storedAccountNumber);
        //console.log(amount);
        if (!storedAccountNumber) {
            setError("Account number not found. Please log in again.");
            return;
        }
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Please enter a valid deposit amount");
            return;
        }
        setError(""); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:8080/deposit", {
                accountNumber: storedAccountNumber,
                amount: parseFloat(amount), // Ensure it's a number
            });

            if (response.status === 200) {
                console.log("Deposit Successful:", response.data);
                navigate("/afterdashboard", { state: { message: "Deposit successful" } }); // Navigate after successful deposit
            }
        } catch (error) {
            console.error("Error depositing money:", error);
            setError(error.response ? error.response.data.message : "Failed to deposit money. Please try again.");
        }
    };

    return (
        <>
            <h3 className="deposit-header">Deposit</h3>
            <div className="deposit-body">
                <Input
                    type="number"
                    labelText="Enter Amount"
                    placeholderText="Enter Amount to Deposit"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // Fixing onChange handler
                />
                {error && <p className="error-message">{error}</p>} {/* Display error messages */}
                <Button buttonText="Deposit" onClick={depositMoney} />
            </div>
        </>
    );
};

export default Deposit;
