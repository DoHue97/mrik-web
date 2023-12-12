import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useRoutes } from "react-router-dom";
import { pricesData } from "../../fakeData";
import { config_path } from "../../router/config.path";
import { replaceParamTranslation } from "../../utils/utils";
import PriceAddEditController from "./PriceAddEditController";
import ProductPricesView from "./ProductPricesView";

export default function ProductPricesController(props) {
    const { t } = useTranslation();
    const location = useLocation();
    const product = location && location.state && location.state.product ? location.state.product : undefined;
    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);
    const [prices, setPrices] = useState({
        content: pricesData,
        paging: {
            total: 0,
            size: 10,
            page: 1,
        }
    });
    const [price, setPrice] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [mode, setMode] = useState(null);
    const [showAddEditPrice, setShowAddEditPrice] = useState(false);

    console.log("AAAA ProductPricesController props: ", props)
    console.log("AAAA ProductPricesController location: ", location)

    useEffect(() => {
        onLoadData();
    }, [])

    const onLoadData = async () => {
        await onLoadPrices({});
    }

    const onLoadPrices = async ({ size = 10, page = 1 }) => {
        try {

        } catch (error) {
            console.log("AAAA onLoadPrices error: ", error)
        }
    }

    const handleChangePage = async (page) => {
        console.log("AAA page:", page);
        await onLoadPrices({ page: page });
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
        await onLoadPrices({ size: size, page: 1 });
    }

    const onEdit = () => {
        console.log("AAAA onEdit price: ", price);
        setMode('edit');
        setShowAddEditPrice(true)
    }

    const onAdd = () => {
        console.log("AAAA onEdit price: ", price);
        setMode('add');
        setShowAddEditPrice(true)
    }

    const onDelete = () => {
        console.log("AAA onDelete price: ", price)
        if (!price) {
            showMessage({ status: true, message: t('can_not_found_record') });
            return false;
        }
        setConfirm({
            show: true,
            message: replaceParamTranslation(t('delete_desc'), [price.code]),
            title: t('delete_title'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onDeleteProcess(price),
            onClose: () => setConfirm({}),
        });
    }

    const onDeleteProcess = async (price) => {
        console.log("AAAA onDeleteProcess price: ", price);
        setConfirm({})
        try {
        } catch (error) {
            console.log("AAAAA onDeleteProcess error: ", error)
        }
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }


    return (
        <>
            <ProductPricesView
                message={message}
                showProcessing={showProcessing}
                prices={prices}
                price={price}
                product={product}
                confirm={confirm}
                onDelete={onDelete}
                onAdd={onAdd}
                onEdit={onEdit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                setPrice={setPrice}
            />
            {showAddEditPrice && <PriceAddEditController 
                isOpen={showAddEditPrice}
                price={price}
                mode={mode}
                onClose={() => {
                    setPrice(null);
                    setShowAddEditPrice(false)
                }}
            />}
        </>
    )
}