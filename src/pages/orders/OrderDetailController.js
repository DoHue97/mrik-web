import React, { useEffect, useState } from "react";
import OrderDetailView from "./OrderDetailView";
import { useTranslation } from "react-i18next";
import { ordersData } from "../../fakeData";

export default function OrderDetailController(props) {
    const { t } = useTranslation();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        onLoadData();
    },[])

    const onLoadData = async () => {
        await onLoadOrder();
    }

    const onLoadOrder = async () => {
        try {
            let id = window.location.pathname ? window.location.pathname.split('/').pop() : null;
            let _order = ordersData.filter(x => x.id == id);
            if(_order && _order.length > 0) setOrder(_order[0]);
        } catch (error) {
            console.log("AAAA onLoadOrder exception: ", error)
        }
    }

    return (
        <>
            <OrderDetailView 
                order={order}
            />
        </>
    )
}