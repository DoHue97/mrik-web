import React, { useState } from "react";
import ContainerCustom from "../../components/Container";
import { Button, Grid, Hidden, IconButton, Popover, Stack, TablePagination, Typography } from "@mui/material";
import DataTable from '../../components/DataTable';
import { usersTableConfig } from "../../datatable.config";
import { DeleteIcon, EditIcon, MoreIcon, RolesIcon } from "../../components/Icons";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";

export default function UsersView(props) {
    const { users } = props;
    const { t } = useTranslation();
    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(users && users.paging && users.paging.size ? users.paging.size : 10);

    const menuActionItem = [
        { label: 'btn_roles', icon: <RolesIcon />, onClick: props.onRoles, id: 'user_roles' },
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'user_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'user_delete' },
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if(props.setUser) props.setUser(row);
        setOpenMenu(event.target)
    }

    const handleCloseMenu = (item) => {
        if (item && item.onClick) item.onClick()
        setOpenMenu(null)
    }

    //use when mobile screen
    const handleChangePage = (event, newPage) => {
        handleChangePage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        let value = event.target.value;
        let _size = users.paging.size ? users.paging.size : 10;
        console.log("AAA parseInt(value, _size): ", parseInt(value, _size))
        setRowsPerPage(value);
        props.handleChangeRowsPerPage(value);
    };

    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12} textAlign={'right'} my={1}>
                <Button variant="contained" onClick={() => props.onAddUser()}>+ {t('btn_add')}</Button>
            </Grid>
            <Grid item xs={12}>
                <Hidden mdDown>
                    <DataTable
                        tableConfig={usersTableConfig}
                        data={users.content}
                        enablePaging={true}
                        paging={users.paging}
                        onShowMenuActions={handleOpenMenu}
                        handleChangeRowsPerPage={props.handleChangeRowsPerPage}
                        handleChangePage={props.handleChangePage}
                    />
                </Hidden>
                <Hidden mdUp>
                    {users.content.map((item, index) => {
                        return(
                            <Grid item xs={12} key={index} my={1}>
                                <UserItem item={item} menuActionItem={menuActionItem} handleOpenMenu={handleOpenMenu}/>
                            </Grid>
                        )
                    })}
                    <TablePagination
                        component="div"
                        count={users.paging.total}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        page={users.paging.page ? users.paging.page - 1 : 0}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Hidden>
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
                                <Typography variant='body2'>{t(action.label)}</Typography>
                            </Stack>
                        </Stack>
                    )
                })}
            </Popover>}
        </ContainerCustom>
    )
}

function UserItem(props){
    const { item, handleOpenMenu } = props;

    return(
        <Card paddingX={2} paddingY={2}>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={1}>
                <Stack flex={1}>
                    <Typography variant="body2">{item.name}</Typography>
                </Stack>
                <Stack flex={.2} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <IconButton onClick={(event) => handleOpenMenu(event, item)}><MoreIcon /></IconButton>
                </Stack>
            </Stack>
            <Typography variant="body2">{item.email}</Typography>
        </Card>
    )
}