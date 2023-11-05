import React, { useState } from "react";
import ContainerCustom from "../../components/Container";
import { Grid, Popover, Stack, Typography } from "@mui/material";
import DataTable from '../../components/DataTable';
import { usersTableConfig } from "../../datatable.config";
import { DeleteIcon, EditIcon } from "../../components/Icons";
import { useTranslation } from "react-i18next";

export default function UsersView(props) {
    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState(null);

    const users = [
        {
            name: 'Hue Do 01',
            email: 'dohue01@gmail.com',
        },
        {
            name: 'Hue Do 02',
            email: 'dohue02@gmail.com',
        },
    ]
    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'user_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'user_delete' }
    ]

    const handleOpenMenu = (event) => {
        console.log("AAA event: ", event)
        setOpenMenu(event.target)
    }

    const handleCloseMenu = (item) => {
        if (item && item.onClick) item.onClick()
        setOpenMenu(null)
    }

    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message} showHeader={true} showFooter={true} showSideBar={true}>
            <Grid item xs={12}>
                <DataTable
                    tableConfig={usersTableConfig}
                    data={users}
                    onShowMenuActions={handleOpenMenu}
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
        </ContainerCustom>
    )
}