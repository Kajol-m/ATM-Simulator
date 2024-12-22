import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Thankyou = () => {
    const [countdown, setCountdown] = useState(5); // Start from 5 seconds
    const navigate = useNavigate();

    useEffect(() => {
        // Set up a timer that decreases the countdown every second
        localStorage.removeItem('accountNumber');

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer); // Stop the timer when countdown reaches 1
                    navigate("/"); // Redirect to login after countdown
                    return 0;
                }
                return prev - 1; // Decrease the countdown
            });
        }, 1000);

        // Cleanup function to clear the interval if the component unmounts
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <>
            <h3>Thank you for using SOA Bank</h3>
            <p>You will be logged out in {countdown} seconds...</p>
        </>
    );
};

export default Thankyou;
