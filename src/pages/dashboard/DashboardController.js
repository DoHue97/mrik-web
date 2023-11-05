import React, { useState } from "react";
import DashboardView from "./DashboardView";

export default function DashboardController(props) {
    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);

    return (
        <>
            <DashboardView
                message={message}
                showProcessing={showProcessing}
            />
        </>
    )
}