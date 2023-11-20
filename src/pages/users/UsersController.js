import React, { useEffect, useState } from "react";
import UsersView from "./UsersView";
import { usersData } from "../../fakeData";
import { useTranslation } from "react-i18next";
import AddEditUserController from "./AddEditUserController";
import Confirm from "../../components/Confirm";

export default function UsersController(props) {
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
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [showRolesForm, setShowRolesForm] = useState(false);
    const [searchValue, setSearchValue] = useState(null);

    useEffect(() => {
        onLoadData();
    }, []);

    const onLoadData = async () => {
        await onLoadUsers({ page: 1, size: 10 });
    }

    const onLoadUsers = async ({ page = 1, size = 10, search_value = "" }) => {
        try {

        } catch (error) {
            console.log("AAAAA onLoadUsers exception: ", error);
        }
    }

    const onAddUser = () => {
        setMode('add');
        setShowAddEditForm(true);
    }

    const onEdit = () => {
        console.log("AAA onEdit user: ", user)
        setMode('edit');
        setShowAddEditForm(true);
    }

    const onDelete = () => {
        console.log("AAA onDelete user: ", user)
        if(!user) {
            showMessage({ status: true, message: t('can_not_found_record')});
            return false;
        }
        setConfirm({
            show: true,
            message: t('delete_desc') + user.name + "?",
            title: t('delete_title'),
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
        await onLoadUsers({ page: page });
    }

    const handleChangeRowsPerPage = async (size) => {
        console.log("AAA size:", size);
        await onLoadUsers({ size: size, page: 1 });
    }

    const onCloseAddEditForm = () => {
        setUser(null);
        setShowAddEditForm(false);
    }

    const showMessage = ({ status, title, message, otherMessage, callBackFn }) => {
        setShowProcessing(false);
        setMessage({ show: status, title: title, content: message, otherMessage, callBackFn: callBackFn ? callBackFn : () => setMessage({}) });
    }

    const onHandleChange = (value) => {
        setSearchValue(value);
    }

    const onSearch = async () => {
        if(searchValue){
            await onLoadUsers({ size: 10, page: 1, search_value: searchValue})
        }
    }

    return (
        <>
            <UsersView
                message={message}
                showProcessing={showProcessing}
                users={users}
                confirm={confirm}
                searchValue={searchValue}
                onEdit={onEdit}
                onDelete={onDelete}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                setUser={setUser}
                setConfirm={setConfirm}
                onAddUser={onAddUser}
                onHandleChange={onHandleChange}
                onSearch={onSearch}
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
            {showAddEditForm && <AddEditUserController
                isOpen={showAddEditForm}
                mode={mode}
                user={user}
                onClose={() => onCloseAddEditForm()}
            />}
        </>
    )
}