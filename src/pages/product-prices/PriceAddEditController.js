import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading";
import PriceAddEditView from "./PriceAddEditView";

export default function PriceAddEditController(props) {
    const { t } = useTranslation();
    const { price } = props;
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [mode, setMode] = useState(props.mode ? props.mode : 'add');

    const onSubmit = async (values) => {
        console.log("AAAA onSubmit values: ", values)
        try {
            showMessage({ status: true, message: t('save_success'), callBackFn: () => props.onClose() });
        } catch (error) {
            console.log("AAAA onSubmit exception: ", error)
        }
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    console.log("AAAA PriceAddEditController props: ", props)
    return (
        <>
            <PriceAddEditView
                message={message}
                mode={mode}
                price={price}
                isOpen={props.isOpen}
                onClose={props.onClose}
                onSubmit={onSubmit}
            />
            {showProcessing && <Loading showLoading={showProcessing} />}
        </>
    )
}