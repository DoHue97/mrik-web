import React, { useEffect, useState } from "react";
import { requestDrawData } from "../../fakeData";
import RequestMoneyUpdateController from "./RequestMoneyUpdateController";
import RequestMoneyView from "./RequestMoneyView";

export default function RequestMoneyController(props){
    const [showProcessing, setShowProcessing] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [message, setMessage] = useState(null);
    const [transactions, setTransactions] = useState({
        content: requestDrawData,
        paging: {
            size: 10,
            total: requestDrawData.length,
            page: 1,
        }
    });
    const [transaction, setTransaction] = useState(null);
    const [showFormUpdate, setShowFormUpdate] = useState(false);

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

    const onUpdate = () => {
        setShowFormUpdate(true)
    }

    return(
        <>
            <RequestMoneyView 
                confirm={confirm}
                showProcessing={showProcessing}
                message={message}
                transactions={transactions}
                showFormUpdate={showFormUpdate}
                setTransaction={setTransaction}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onUpdate={onUpdate}
            />
            {showFormUpdate && <RequestMoneyUpdateController 
                isOpen={showFormUpdate}
                transaction={transaction}
                onClose={() => setShowFormUpdate(false)}
            />}
        </>
    )
}