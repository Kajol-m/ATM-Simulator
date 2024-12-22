import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AfterService.css";

const AfterService = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Import navigate to handle redirection

    // Extract the message from location state, with a fallback message
    const message = location.state?.message || "Action completed successfully!";

    // Set up a state for the countdown starting at 3 seconds
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Set up a timer that decreases the countdown every second
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer); // Stop the timer when countdown reaches 1
                    navigate("/thankyou"); // Redirect to thankyou page after countdown
                    return 0;
                }
                return prev - 1; // Decrease the countdown
            });
        }, 1000);

        // Cleanup function to clear the interval if the component unmounts
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="after-dashboard-container">
            <h2 className="after-dashboard-message">{message}</h2>
        </div>
    );
};

export default AfterService;
