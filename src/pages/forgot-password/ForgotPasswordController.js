import React, { useState } from "react";
import ForgotPasswordView from "./ForgotPasswordView";
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";

export default function ForgotPasswordController(props){
    const navigate = useNavigate();
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = (values) => {
        console.log("AAAA onSubmit values: ", values)
        navigate(config_path.login);
    }

    return(
        <ForgotPasswordView 
            showProcessing={showProcessing}
            message={message}
            onSubmit={onSubmit}
        />
    )
}