import React, { useEffect } from "react";
import { useState } from "react";
import ProductsView from "./ProductsView";
import { productsData } from "../../fakeData";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { config_path } from "../../router/config.path";
import Confirm from "../../components/Confirm";

export default function ProductsController(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [products, setProducts] = useState({
        content: productsData,
        paging: {
            size: 10,
            total: productsData.length,
            page: 1,
        }
    });
    const [product, setProduct] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        onLoadData();
    }, [])

    const onLoadData = async () => {
        await onLoadProducts({});
    }

    const onLoadProducts = async ({ size = 10, page = 1, searchValue }) => {
        try {

        } catch (error) {
            console.log("AAAA onLoadProducts error: ", error)
        }
    }

    const handleChangePage = async (page) => {
        console.log("AAA page:", page);
        await onLoadProducts({ page: page });
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
        await onLoadProducts({ size: size, page: 1 });
    }

    const onEdit = () => {
        console.log("AAAA onEdit product: ", product);
        navigate(config_path.product_edit.replace(':id', product.id), { state: { mode: 'edit' } })
    }

    const onAddProduct = () => {
        navigate(config_path.product_add)
    }

    const onDelete = () => {
        console.log("AAA onDelete product: ", product)
        if (!product) {
            showMessage({ status: true, message: t('can_not_found_record') });
            return false;
        }
        setConfirm({
            show: true,
            message: t('delete_desc') + product.name + "?",
            title: t('delete_title'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onDeleteProcess(product),
            onClose: () => setConfirm({}),
        });
    }

    const onDeleteProcess = async (product) => {
        console.log("AAAA onDeleteProcess product: ", product);
        try {

        } catch (error) {
            console.log("AAAAA onDeleteProcess error: ", error)
        }
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    const onHandleChange = (value) => {
        setSearchValue(value);
    }

    const onSearch = async () => {
        if(searchValue && searchValue.length > 1){
            console.log("AAAA onSearch searchValue: ", searchValue)
            await onLoadProducts({ size: 10, page: 1, search_value: searchValue})
        }
    }

    return (
        <>
            <ProductsView
                showProcessing={showProcessing}
                message={message}
                products={products}
                product={product}
                searchValue={searchValue}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                setProduct={setProduct}
                onAddProduct={onAddProduct}
                onEdit={onEdit}
                onDelete={onDelete}
                onSearch={onSearch}
                onHandleChange={onHandleChange}
            />
            {confirm && confirm.show && <Confirm
                isOpen={confirm.show}
                onClose={confirm.onClose ? confirm.onClose : () => setConfirm(null)}
                message={confirm.message}
                title={confirm.title}
                actionTitle={confirm.actionTitle}
                closeTitle={confirm.closeTitle}
                otherMessage={confirm.otherMessage}
                onAction={confirm.onAction ? confirm.onAction : () => setConfirm(null)}
            />}
        </>
    )
}