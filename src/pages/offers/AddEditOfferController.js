import React, { useEffect, useState } from "react";
import AddEditOfferView from "./AddEditOfferView";
import { offersData } from "../../fakeData";

export default function AddEditOfferController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [content, setContent] = useState(null);
    const [mode, setMode] = useState(props.mode ? props.mode : 'add');
    const [offer, setOffer] = useState(null);
    
    useEffect(() => {
        onLoadData();
    },[])

    const onLoadData = async () => {
        await onLoadOffer();
    }

    const onLoadOffer = async () => {
        try {
            let id = window.location.pathname ? window.location.pathname.split('/').pop() : null;
            let _offer = offersData.filter(x => x.id == id);
            if(_offer && _offer.length > 0) setOffer(_offer[0]);
        } catch (error) {
            console.log("AAAA onLoadProduct error: ", error)
        }
    }

    const onSubmit = async (values) => {
        console.log("AAAA onSubmit values: ", values)
        
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    return(
        <>
            <AddEditOfferView 
                message={message}
                showProcessing={showProcessing}
                content={content}
                offer={offer}
                mode={mode}
                onSubmit={onSubmit}
                setContent={setContent}
            />
        </>
    )
}