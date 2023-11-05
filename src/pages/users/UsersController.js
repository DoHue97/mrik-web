import React, { useState } from "react";
import UsersView from "./UsersView";

export default function UsersController(props){
    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);

    const onEdit = () => {

    }

    const onDelete = () => {}

    return(
        <UsersView 
            message={message}
            showProcessing={showProcessing}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    )
}