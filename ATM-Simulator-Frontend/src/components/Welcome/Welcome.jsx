import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './Welcome.css';

const Welcome=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        const timer=setTimeout(()=>{
             navigate("/login");
        },2000);

        return()=>clearTimeout(timer);
    },[navigate]);

    return(
        <>
        <h3 className="welcomeBanner">Welcome to SOA Bank</h3>
        </>
    )
}

export default Welcome;