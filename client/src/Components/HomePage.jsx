import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Generate unique IDs

const HomePage = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        const roomID = value.trim() ? value : uuidv4(); // Generate a unique room ID if empty
        navigate(`/room/${roomID}`);
    }, [navigate, value]);

    return (
        <div>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Enter Room Code (or leave blank for new room)"
            />
            <button onClick={handleJoinRoom}>Join</button>
        </div>
    );
};

export default HomePage;
