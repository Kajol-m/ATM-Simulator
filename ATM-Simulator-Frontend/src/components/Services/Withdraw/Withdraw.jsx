import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Input from "../../../common/Input/Input";
import axios from "axios";
import Button from "../../../common/Button/Button";
import "./Withdraw.css";

const Withdraw = () => {
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const navigate = useNavigate();

    const withdrawMoney = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            setErrorMessage("Please enter a valid amount.");
            return;
        }
    
        try {
            const accountNumber = localStorage.getItem("accountNumber"); 
            console.log(accountNumber);// Replace with actual account number
            const response = await axios.post("http://localhost:8080/withdraw", { accountNumber, amount: parseFloat(amount) });
            console.log("Withdraw Successful", response.data);
            if (response.status === 200) {
                setErrorMessage("");
                navigate("/afterdashboard", { state: { message: "Withdrawal successful" } });
            }
        } catch (error) {
            const errorMsg = error.response?.data || "Failed to withdraw money. Please try again.";
            setErrorMessage(errorMsg);
            console.error("Error withdrawing money", error);
        }
    };
    
    return (
        <>
            <h3 className="withdraw-header">Withdraw</h3>
            <div className="withdraw-body">
                <Input
                    type="number"
                    labelText={"Withdraw"}
                    placeholderText="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Button buttonText={"Withdraw"} onClick={withdrawMoney} />
            </div>
        </>
    );
}
    export default Withdraw;