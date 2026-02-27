import React, { useState, useEffect } from "react";
import SoccerPanel from "../../components/ThreeSoccerPanel/soccerPanel.js";
import CalendarMonth from "../../components/Calendar/calendarMonth.js";
import Navbar from "../../components/Navbar/navbar.js";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
    }, []);
    
    const handleFieldSelect = (fieldId) => {
        setSelectedField(fieldId);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <SoccerPanel onFieldSelect={handleFieldSelect} />
            <CalendarMonth selectedField={selectedField} />
        </div>
    );
}

export default Home;