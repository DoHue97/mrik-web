import React, { useState } from "react";
import UsersView from "./UsersView";
import { usersData } from "../../fakeData";
import { useTranslation } from "react-i18next";

export default function UsersController(props){
    const { t } = useTranslation();

    const [message, setMessage] = useState(null);
    const [showProcessing, setShowProcessing] = useState(false);
    const [users, setUsers] = useState({
        content: usersData,
        paging: {
            page: 1,
            size: 10,
            total: 2,
        }
    });
    const [confirm, setConfirm] = useState(null);
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState(null);

    const onEdit = () => {
        console.log("AAA onEdit user: ", user)
        setMode('edit');
    }

    const onDelete = () => {
        console.log("AAA onDelete user: ", user)
        setConfirm({
            show: true,
            message: t('Are you sure delete this user ' + user.name),
            title: t('Delete User'),
            actionTitle: t('yes'),
            closeTitle: t('no'),
            onAction: () => onDeleteProcess(user),
            onClose: () => setConfirm({}),
        });
    }

    const onDeleteProcess = async (user) => {
        console.log("AAAA onDeleteProcess user: ", user);
        try {
            
        } catch (error) {
            console.log("AAAAA onDeleteProcess error: ", error)
        }
    }

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
            confirm={confirm}
            mode={mode}
            onEdit={onEdit}
            onDelete={onDelete}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            setUser={setUser}
            setConfirm={setConfirm}
        />
    )
}