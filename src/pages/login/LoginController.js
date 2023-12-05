import React, { useState } from "react";
import LoginView from './LoginView';
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";
import { authentication } from "../../wsclients/authentication";
import { useTranslation } from "react-i18next";

export default function LoginController(props){
    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const onSubmit = async (values) => {
        setShowProcessing(true)
        console.log("AAAA onSubmit values: ", values)
        try {
            let result = await authentication.authenticate({
                email: values.email,
                password: values.password,
            }, true);
            console.log("AAAA onSubmit result: ", result);
            if(result.code == 'OK'){
                navigate(config_path.dashboard);
            } else {
                showMessage({ status: true, message: t('INVALID_LOGIN')});
            }
        } catch (error) {
            console.log("AAAA onSubmit exception: ", error);

        }
        setShowProcessing(false)
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    return(
        <>
            <LoginView 
                message={message}
                showProcessing={showProcessing}
                onSubmit={onSubmit}
            />
        </>
    )
}