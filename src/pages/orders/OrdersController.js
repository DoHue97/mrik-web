import React, { useEffect, useState } from "react";
import OrdersView from "./OrdersView";
import { ordersData } from "../../fakeData";

export default function OrdersController(props) {
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

    useEffect(() => {
        onLoadData();
    }, [])

    const onLoadData = async () => {
        await onLoadOrders({});
    }

    const onLoadOrders = async ({ size = 10, page = 1 }) => {
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

    return (
        <>
            <OrdersView
                message={message}
                showProcessing={showProcessing}
                orders={orders}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                setOrder={setOrder}
            />
        </>
    )
}