import React, { useEffect, useState } from "react";
import RolesView from "./RolesView";

export default function RolesController(props){
    const [user, setUser] = useState(props.user ? props.user : null);
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [roleTypes, setRoleTypes] = useState([]);
    const [roleType, setRoleType] = useState(null);

    useEffect(() => {
        onLoadData();
    },[]);

    const onLoadData = async () => {
        await onLoadRoleTypes();
    }

    const onLoadRoleTypes = async () => {

    }

    const onSubmit = (values) => {
        console.log("AAAA onSubmit values: ", values)
    }

    const onChangeRoleType = (value) => {
        console.log("AAAA onChangeRoleType value: ", value)
        setUser(prevState => ({
            ...prevState,
            role_type: value,
        }));
        setRoleType(value);
    }

    return(
        <>
            <RolesView 
                isOpen={props.isOpen}
                user={user}
                showProcessing={showProcessing}
                message={message}
                roleTypes={roleTypes}
                roleType={roleType}
                onClose={props.onClose}
                onSubmit={onSubmit}
                onChangeRoleType={onChangeRoleType}
            />
        </>
    )
}