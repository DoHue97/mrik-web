import React from "react";
import LoginView from './LoginView';
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";

export default function LoginController(props){
    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log("AAAA onSubmit values: ", values)
        navigate(config_path.dashboard)
    }

    return(
        <>
            <LoginView 
                onSubmit={onSubmit}
            />
        </>
    )
}