import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";
import InventoryView from "./InventoryView";

export default function InventoryController(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [transactions, setTransactions] = useState({
        content: [],
        paging: {
            size: 10,
            total: 0,
            page: 1,
        }
    });
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        onLoadData();
    },[])

    const onLoadData = async () => {
        await onLoadTransactions({});
    }
    
    const onLoadTransactions = async ({ size = 10, page = 1 }) => {
        try {

        } catch (error) {
            console.log("AAAA onLoadTransactions error: ", error)
        }
    }

    const handleChangePage = async (page) => {
        console.log("AAA page:", page);
        await onLoadTransactions({ page: page });
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
        await onLoadTransactions({ size: size, page: 1 });
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    const onAdd = () => {
        navigate(config_path.inventory_add)
    }

    return (
        <>
            <InventoryView
                message={message}
                showProcessing={showProcessing}
                confirm={confirm}
                transactions={transactions}
                onAdd={onAdd}
            />
        </>
    )
}