import { Grid, Hidden, Typography, Popover, Stack, IconButton } from "@mui/material";
import React, { useState } from "react";
import ContainerCustom from "../../components/Container";
import { useTranslation } from "react-i18next";
import DataTable from "../../components/DataTable";
import { ordersTableConfig } from "../../datatable.config";
import { EditIcon, DeleteIcon, MoreIcon } from "../../components/Icons";
import CardComponent from "../../components/Card";
import { formatDateToDDMMYYYYHHMMFrEpoch } from "../../utils/utils";

export default function OrdersView(props) {
    const { t } = useTranslation();
    const { orders } = props;
    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(orders && orders.paging && orders.paging.size ? orders.paging.size : 10);

    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'order_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'order_delete' }
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if(props.setOrder) props.setOrder(row);
        setOpenMenu(event.target)
    }

    const handleCloseMenu = (item) => {
        if (item && item.onClick) item.onClick();
        if(props.setOrder) props.setOrder(null);
        setOpenMenu(null)
    }

    const handleChangePage = (event, newPage) => {
        handleChangePage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        let value = event.target.value;
        let _size = orders.paging.size ? orders.paging.size : 10;
        console.log("AAA parseInt(value, _size): ", parseInt(value, _size))
        setRowsPerPage(value);
        props.handleChangeRowsPerPage(value);
    };

    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12}>
                <Hidden mdDown>
                    <DataTable
                        tableConfig={ordersTableConfig}
                        data={orders.content}
                        enablePaging={true}
                        paging={orders.paging}
                        onShowMenuActions={handleOpenMenu}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        handleChangePage={handleChangePage}
                    />
                </Hidden>
                <Hidden mdUp>
                    {orders.content.map((item, index) => {
                        return(                            
                            <Grid item xs={12} key={index} my={1}>
                                <OrderItem item={item} menuActionItem={menuActionItem} handleOpenMenu={handleOpenMenu}/>
                            </Grid>
                        )
                    })}
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
                                <Typography variant='subtitle2'>{t(action.label)}</Typography>
                            </Stack>
                        </Stack>
                    )
                })}
            </Popover>}
        </ContainerCustom>
    )
}

function OrderItem(props){
    const { item, handleOpenMenu } = props;

    return(
        <CardComponent paddingX={2} paddingY={2}>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={1}>
                <Stack flex={1}>
                    <Typography variant="subtitle2">{item.number}</Typography>
                </Stack>
                <Stack flex={.2} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <IconButton onClick={(event) => handleOpenMenu(event, item)}>
                        <MoreIcon />
                    </IconButton>
                </Stack>
            </Stack>
            {item.created_date && <Typography variant="body2">{formatDateToDDMMYYYYHHMMFrEpoch(item.created_date)}</Typography>}
        </CardComponent>
    )
}