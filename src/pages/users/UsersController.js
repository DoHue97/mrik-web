import React, { useState } from "react";
import UsersView from "./UsersView";
import { usersData } from "../../fakeData";

export default function UsersController(props){
    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);
    const [users, setUsers] = useState({
        content: usersData,
        paging: {
            page: 1,
            size: 10,
            total: 2,
        }
    })

    const onEdit = () => {

    }

    const onDelete = () => {}

    const handleChangePage = async (page) => {
        console.log("AAA page:", page);
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
    }

    return(
        <UsersView 
            message={message}
            showProcessing={showProcessing}
            users={users}
            onEdit={onEdit}
            onDelete={onDelete}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
        />
    )
}