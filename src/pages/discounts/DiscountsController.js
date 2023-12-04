import React, { useState } from "react";
import DiscountsView from "./DiscountsView";

export default function DiscountsController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    return(
        <DiscountsView 
            showProcessing={showProcessing}
            message={message}
        />
    )
}