import React, { useEffect, useState } from "react";
import OrdersView from "./OrdersView";
import { ordersData } from "../../fakeData";
import Confirm from "../../components/Confirm";
import { replaceParamTranslation } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";

export default function OrdersController(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [orders, setOrders] = useState({
        content: ordersData,
        paging: {
            size: 10,
            total: 1,
            page: 1,
        },
    });
    const [order, setOrder] = useState(null);
    const [showOrderDetail, setShowOrderDetail] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [state, setState] = useState(null);

    useEffect(() => {
        onLoadData();
    }, [])

    const onLoadData = async () => {
        await onLoadOrders({});
    }

    const onLoadOrders = async ({ size = 10, page = 1, searchValue }) => {
        try {

        } catch (error) {
            console.log("AAAA onLoadOrders exception: ", error)
        }
    }

    const handleChangePage = async (page) => {
        console.log("AAA page:", page);
        await onLoadOrders({ page: page })
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
        await onLoadOrders({ page: 1, size: size })
    }

    const onHandleChange = (value) => {
        setSearchValue(value);
    }

    const onSearch = async () => {
        if(searchValue){
            await onLoadOrders({ size: 10, page: 1, search_value: searchValue})
        }
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    const onDelete = () => {
        console.log("AAA onDelete order: ", order)
        if(!order) {
            showMessage({ status: true, message: t('can_not_found_record')});
            return false;
        }
        setConfirm({
            show: true,
            message: replaceParamTranslation(t('delete_desc'), [order.number]),
            title: t('delete_title'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onDeleteProcess(order),
            onClose: () => setConfirm({}),
        });
    }

    const onDeleteProcess = async (order) => {
        console.log("AAAA onDeleteProcess order: ", order);
        try {
            setConfirm({})
        } catch (error) {
            console.log("AAAAA onDeleteProcess error: ", error)
        }
    }

    const onApprove = () => {
        console.log("AAA onApprove order: ", order)
        if(!order) {
            showMessage({ status: true, message: t('can_not_found_record')});
            return false;
        }
        setConfirm({
            show: true,
            message: replaceParamTranslation(t('approve_desc'), [order.number]),
            title: t('approve_title'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onApproveProcess(order),
            onClose: () => setConfirm({}),
        });
    }

    const onApproveProcess = async (order) => {
        console.log("AAAA onApproveProcess order: ", order);
        try {
            setConfirm({})
        } catch (error) {
            console.log("AAAAA onApproveProcess error: ", error)
        }
    }

    const onShowDetail = (row) => {
        navigate(config_path.orders_detail.replace(':id', row.id))
    }

    const onReject = () => {
        console.log("AAA onReject order: ", order)
        if(!order) {
            showMessage({ status: true, message: t('can_not_found_record')});
            return false;
        }
        setConfirm({
            show: true,
            message: replaceParamTranslation(t('reject_order_desc'), [order.number]),
            title: t('reject_order_title'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onRejectProcess(order),
            onClose: () => setConfirm({}),
        });
    }

    const onRejectProcess = async (order) => {
        console.log("AAAA onRejectProcess order: ", order);
        try {
            setConfirm({})
        } catch (error) {
            console.log("AAAAA onRejectProcess error: ", error)
        }
    }

    return (
        <>
            <OrdersView
                message={message}
                showProcessing={showProcessing}
                orders={orders}
                searchValue={searchValue}
                state={state}
                confirm={confirm}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                setOrder={setOrder}
                onHandleChange={onHandleChange}
                onSearch={onSearch}
                onDelete={onDelete}
                onApprove={onApprove}
                onShowDetail={onShowDetail}
                setState={setState}
                onReject={onReject}
            />
        </>
    )
}