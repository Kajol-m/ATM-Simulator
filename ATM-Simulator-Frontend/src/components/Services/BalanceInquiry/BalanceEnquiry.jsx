import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BalanceEnquiry.css";

const BalanceEnquiry = () => {
    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const accountNumber = localStorage.getItem("accountNumber"); // Replace with actual account number from context or login

    useEffect(() => {
        if (!accountNumber) {
            setErrorMessage("Account number is missing.");
            return;
        }

        const fetchBalanceAndTransactions = async () => {
            try {
                console.log(accountNumber);
                const response = await axios.get(`http://localhost:8080/history/${accountNumber}`);
                console.log("API Response: ", response.data); // Log the response data
                setBalance(response.data.balance);
                setTransactions(response.data.transactions);
            } catch (error) {
                setErrorMessage("Failed to fetch balance or transaction history.");
                console.error("Error fetching balance", error);
            }
        };

        fetchBalanceAndTransactions();
    }, [accountNumber]);

    const handleClose = () => {
        // Navigate to the Thank You page
        navigate("/thankyou");
    };

    return (
        <div className="balance-enquiry">
            <h3>Balance Enquiry</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {balance !== null && (
                <div>
                    <h4>Your Balance: ₹{balance}</h4>
                </div>
            )}
            {transactions.length > 0 ? (
                <div className="transaction-history">
                    <h4>Transaction History</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.type}</td>
                                    <td>₹{transaction.amount}</td>
                                    <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No transactions found.</p>
            )}
            <button className="close-button" onClick={handleClose}>
                Close
            </button>
        </div>
    );
};

export default BalanceEnquiry;
