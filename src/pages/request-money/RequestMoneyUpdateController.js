import React, { useState } from "react";
import RequestMoneyUpdateView from "./RequestMoneyUpdateView";

export default function RequestMoneyUpdateController(props){
    const { transaction } = props;
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = async (values) => {
        console.log("AAAA values: ", values);
        props.onClose();
    }

    return(
        <>
            <RequestMoneyUpdateView 
                message={message}
                showProcessing={showProcessing}
                isOpen={props.isOpen}
                onClose={props.onClose}
                onSubmit={onSubmit}
            />
        </>
    )
}