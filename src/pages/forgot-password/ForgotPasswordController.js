import React, { useState } from "react";
import ForgotPasswordView from "./ForgotPasswordView";

export default function ForgotPasswordController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = (values) => {
        console.log("AAAA onSubmit values: ", values)
    }

    return(
        <ForgotPasswordView 
            showProcessing={showProcessing}
            message={message}
            onSubmit={onSubmit}
        />
    )
}