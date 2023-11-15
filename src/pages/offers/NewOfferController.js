import React, { useState } from "react";
import NewOfferView from "./NewOfferView";

export default function NewOfferController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    
    const onSubmit = async (values) => {

    }

    return(
        <>
            <NewOfferView 
                message={message}
                showProcessing={showProcessing}
                onSubmit={onSubmit}
            />
        </>
    )
}