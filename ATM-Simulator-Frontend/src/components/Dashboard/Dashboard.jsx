import React from "react";
import Button from "../../common/Button/Button";
import Header from "../Header/Header"
import { Link } from "react-router-dom";
import './Dashboard.css';


const Dashboard=()=>{
    return(
        <>
            <Header/>
            <h1 className="dashboard-header">Welcome to SAO Bank</h1>
            <Link to="/deposit" className="dashboard-buttons">
                <Button buttonText="Deposit" />
            </Link>
            <Link to="/withdraw" className="dashboard-buttons">
                <Button buttonText="Withdraw" />
            </Link>
            <Link to="/transfer" className="dashboard-buttons">
                <Button buttonText="Transfer" />
            </Link>
            <Link to="/balance" className="dashboard-buttons">
                <Button buttonText="Balance Inquiry" />
            </Link>
        </>
    )
}

export default Dashboard;