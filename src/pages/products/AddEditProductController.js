import React, { useEffect, useState } from "react";
import AddEditProductView from "./AddEditProductView";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { productsData } from "../../fakeData";
import { config_path } from "../../router/config.path";

export default function AddEditProductController(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("AAA AddEditProductController: ", props)
    console.log("AAA location: ", location)

    const [mode, setMode] = useState(props.mode ? props.mode : 'add');
    const [product, setProduct] = useState();
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [content, setContent] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        onLoadData();
    },[])

    const onLoadData = async () => {
        await onLoadProduct();
    }

    const onLoadProduct = async () => {
        try {
            let id = window.location.pathname ? window.location.pathname.split('/').pop() : null;
            let prd = productsData.filter(x => x.id == id);
            if(prd && prd.length > 0) setProduct(prd[0]);
        } catch (error) {
            console.log("AAAA onLoadProduct error: ", error)
        }
    }

    const onSubmit = async (values) => {
        console.log("AAAA onSubmit values: ", values)
        console.log("AAAA onSubmit file: ", file)
        navigate(config_path.products);
    }

    const onUploadFile = (files) => {
        if(files && files.length > 0){
            setFile(files[0])
        }
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    return (
        <>
            <AddEditProductView
                message={message}
                mode={mode}
                product={product}
                showProcessing={showProcessing}
                content={content}
                file={file}
                onSubmit={onSubmit}
                setContent={setContent}
                onUploadFile={onUploadFile}
                setFile={setFile}
            />
        </>
    )
}