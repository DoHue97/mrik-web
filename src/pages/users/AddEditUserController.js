import React, { useEffect, useState } from "react";
import AddEditUserView from "./AddEditUserView";

export default function AddEditUserController(props){
    console.log("AAAA AddEditUserController props: ", props)
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

    const onSubmit = async (values) => {
        console.log("AAAA onSubmit values: ", values)
        setShowProcessing(true)
        try {
            
        } catch (error) {
            console.log("AAAA onSubmit exception: ", error)
        }
        setShowProcessing(false)
    }

    return(
        <AddEditUserView 
            mode={mode}
            showProcessing={showProcessing}
            message={message}
            user={user}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={onSubmit}
        />
    )
}