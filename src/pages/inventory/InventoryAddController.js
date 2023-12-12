import React, { useState } from "react";
import InventoryAddView from "./InventoryAddView";

export default function InventoryAddController(props) {
    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);

    const onSubmit = async (values) => {
        console.log("AAAA onSubmit values: ", values);
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    return (
        <>
            <InventoryAddView
                message={message}
                showProcessing={showProcessing}
                onSubmit={onSubmit}
            />
        </>
    )
}