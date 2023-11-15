import React, { useEffect, useState } from "react";
import OffersView from "./OffersView";
import { offersData } from "../../fakeData";
import Confirm from "../../components/Confirm";
import { useTranslation } from "react-i18next";

export default function OffersController(props){
    const { t } = useTranslation();
    const [showProcessing, setShowProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [offers, setOffers] = useState({
        content: offersData,
        paging: {
            size: 10, 
            page: 1, 
            total: 0
        }
    });
    const [offer, setOffer] = useState(null);
    const [showOfferDetail, setShowOfferDetail] = useState(false);
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        onLoadData();
    },[])

    const onLoadData = async () => {
        await onLoadOffers({});
    }

    const onLoadOffers = async ({size = 10, page = 1}) => {
        try {
            let result = {};            
        } catch (error) {
            console.log("AAAA onLoadOffers exception: ", error);
        }
    }

    const handleChangePage = async (page) => {
        console.log("AAA page:", page);
        await onLoadOffers({ page: page });
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
        await onLoadOffers({ size: size, page: 1 });
    }

    const onDelete = () => {
        console.log("AAA onDelete offer: ", offer)
        if(!offer) {
            showMessage({ status: true, message: t('can_not_found_offer')});
            return false;
        }
        setConfirm({
            show: true,
            message: t('delete_offer_desc') + offer.name + "?",
            title: t('delete_offer'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onDeleteProcess(offer),
            onClose: () => setConfirm({}),
        });
    }

    const onDeleteProcess = async (offer) => {
        console.log("AAAA onDeleteProcess offer: ", offer);
        try {

        } catch (error) {
            console.log("AAAAA onDeleteProcess error: ", error)
        }
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    return(
        <>
            <OffersView 
                showProcessing={showProcessing}
                message={message}
                offers={offers}                
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                setOffer={setOffer}
                onDelete={onDelete}
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