import { Grid, Hidden, Typography, Popover, Stack, IconButton, TextField, Button, useTheme, Box, Select, MenuItem, TablePagination } from "@mui/material";
import React, { useState } from "react";
import ContainerCustom from "../../components/Container";
import { useTranslation } from "react-i18next";
import DataTable from "../../components/DataTable";
import { ordersTableConfig } from "../../datatable.config";
import { EditIcon, DeleteIcon, MoreIcon, CheckDoubleFillIcon, SearchIcon, CloseIcon } from "../../components/Icons";
import CardComponent from "../../components/Card";
import { formatDateToDDMMYYYYHHMMFrEpoch } from "../../utils/utils";

export default function OrdersView(props) {
    const { t } = useTranslation();
    const theme = useTheme();
    const { orders, searchValue, setState, state, } = props;
    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(orders && orders.paging && orders.paging.size ? orders.paging.size : 10);

    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'order_edit' },
        { label: 'btn_approve', icon: <CheckDoubleFillIcon />, onClick: props.onApprove, id: 'order_approve' },
        { label: 'btn_reject', icon: <CloseIcon color={theme.palette.error.main}/>, onClick: props.onReject, id: 'order_reject' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'order_delete' }
    ]

    const statuses = [
        {
            label: t('new'),
            value: 'NEW',
        },
        {
            label: t('delivered'),
            value: 'DELIVERED',
        },
        {
            label: t('paid'),
            value: 'PAID',
        },
        {
            label: t('stock_out_request'),
            value: 'STOCK_OUT_REQUEST',
        },
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        event.stopPropagation();
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
                <Grid item xs={12} my={1} mb={4}>
                    <Grid item xs={12} container spacing={1}>
                        <Grid item xs={12} sm={11} container spacing={1}>
                            <Grid item xs={12} md={6} mb={1}>
                                <TextField
                                    name="orders_search"
                                    id="orders_search"
                                    placeholder={t('enter_orders_search_value')}                                
                                    value={searchValue}
                                    onChange={(event) => props.onHandleChange(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Select 
                                    defaultValue={state ? state : undefined}
                                    value={state ? state : undefined}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <MenuItem value="">{t('Select')}</MenuItem>
                                    {statuses.map((item, index) => {
                                        return(
                                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={1} container justifyContent={'flex-end'}>
                            <Button variant="contained" onClick={() => props.onSearch()}>
                                <SearchIcon color={theme.palette.common.white} />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden mdDown>
                    <DataTable
                        tableConfig={ordersTableConfig}
                        data={orders.content}
                        enablePaging={true}
                        paging={orders.paging}
                        onShowMenuActions={handleOpenMenu}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        handleChangePage={handleChangePage}
                        onShowDetail={props.onShowDetail}
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
                    <TablePagination
                        component="div"
                        count={orders.paging.total}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        page={orders.paging.page ? orders.paging.page - 1 : 0}
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