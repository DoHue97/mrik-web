import React, { useState } from "react";
import ContainerCustom from "../../components/Container";
import { Grid, Popover, Stack, Typography } from "@mui/material";
import DataTable from '../../components/DataTable';
import { usersTableConfig } from "../../datatable.config";
import { DeleteIcon, EditIcon } from "../../components/Icons";
import { useTranslation } from "react-i18next";
import Confirm from "../../components/Confirm";

export default function UsersView(props) {
    const { users, confirm, setConfirm, mode } = props;
    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState(null);

    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'user_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'user_delete' }
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if(props.setUser) props.setUser(row);
        setOpenMenu(event.target)
    }

    const handleCloseMenu = (item) => {
        if (item && item.onClick) item.onClick()
        if(props.setUser) props.setUser(null);
        setOpenMenu(null)
    }

    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12}>
                <DataTable
                    tableConfig={usersTableConfig}
                    data={users.content}
                    enablePaging={true}
                    paging={users.paging}
                    onShowMenuActions={handleOpenMenu}
                    handleChangeRowsPerPage={props.handleChangeRowsPerPage}
                    handleChangePage={props.handleChangePage}
                />
            </Grid>
            {menuActionItem && menuActionItem.length > 0 && <Popover id='menu-actions-users'
                open={!!openMenu}
                anchorEl={openMenu}
                onClose={handleCloseMenu}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1,
                        ml: 0.75,
                        width: 200,
                    },
                }}
            >
                {menuActionItem.map((action, index) => {
                    return (
                        <Stack sx={{ cursor: 'pointer' }} spacing={1} direction={'row'} alignItems='center' px={2} py={1} key={index}
                            onClick={() => handleCloseMenu(action)} id={action.id}
                        >
                            <Stack>
                                {action.icon}
                            </Stack>
                            <Stack>
                                <Typography star variant='subtitle2'>{t(action.label)}</Typography>
                            </Stack>
                        </Stack>
                    )
                })}
            </Popover>}
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
        </ContainerCustom>
    )
}