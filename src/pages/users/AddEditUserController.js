import React, { useEffect, useState } from "react";
import AddEditUserView from "./AddEditUserView";

export default function AddEditUserController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [mode, setMode] = useState(props.mode ? props.mode : 'add');
    const [user, setUser] = useState(props.user ? props.user : null);

    useEffect(() => {
        onLoadData();
    },[]);

    const onLoadData = async () => {
        await onLoadUserTypes();
    }

    const onLoadUserTypes = async () => {
        try {
            
        } catch (error) {
            console.log("AAAA onLoadUserTypes exception: ", error);
        }
    }

    return(
        <AddEditUserView 
            mode={mode}
            showProcessing={showProcessing}
            message={message}
        />
    )
}