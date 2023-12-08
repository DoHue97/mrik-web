import { Hidden, IconButton, Popover, Stack, Typography, Grid, TablePagination, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardComponent from "../../components/Card";
import ContainerCustom from "../../components/Container";
import DataTable from "../../components/DataTable";
import { DeleteIcon, EditIcon, MoreIcon } from "../../components/Icons";
import { productPricesTableConfig } from "../../datatable.config";
import { config_path } from "../../router/config.path";
import { cache } from "../../utils/cache";

export default function ProductPricesView(props) {
    const { t } = useTranslation();
    const { product, prices } = props;
    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(prices && prices.paging && prices.paging.size ? prices.paging.size : 10);
    console.log("AAAAA ProductPricesView props: ", props)

    let productCode = product && product.code ? product.code : '';
    let breadcrumbs = [
        {
            name: t('products'),
            link: config_path.products,
        },
        {
            name: productCode,
            link: config_path.product_edit.replace(':id', product.id),
        },
        {
            name: t('prices'),
        }
    ]

    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'price_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'price_delete' },
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if (props.setPrice) props.setPrice(row);
        setOpenMenu(event.target)
    }

    const handleCloseMenu = (item) => {
        if (item && item.onClick) item.onClick()
        setOpenMenu(null)
    }

    const handleChangePage = (event, newPage) => {
        handleChangePage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        let value = event.target.value;
        let _size = prices.paging.size ? prices.paging.size : 10;
        console.log("AAA parseInt(value, _size): ", parseInt(value, _size))
        setRowsPerPage(value);
        props.handleChangeRowsPerPage(value);
    };

    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message} showBreadCrumbs={true} breadcrumbs={breadcrumbs}>
            <Grid item xs={12}>
                <Grid item xs={12} container spacing={1} my={1} alignItems={'center'} mb={4}>
                    <Box width={'100%'} textAlign={'right'}>
                        <Button variant="contained" onClick={() => props.onAdd()}>+ {t('btn_add')}</Button>
                    </Box>
                </Grid>
                <Hidden mdDown>
                    <DataTable
                        tableConfig={productPricesTableConfig}
                        data={prices.content}
                        enablePaging={true}
                        paging={prices.paging}
                        onShowMenuActions={handleOpenMenu}
                        handleChangeRowsPerPage={props.handleChangeRowsPerPage}
                        handleChangePage={props.handleChangePage}
                    />
                </Hidden>
                <Hidden mdUp>
                    {prices.content.map((item, index) => {
                        return (
                            <Grid item xs={12} key={index} my={1}>
                                <PriceItem item={item} menuActionItem={menuActionItem} handleOpenMenu={handleOpenMenu} />
                            </Grid>
                        )
                    })}
                    <TablePagination
                        component="div"
                        count={prices.paging.total}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        page={prices.paging.page ? prices.paging.page - 1 : 0}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Hidden>
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
            </Grid>
        </ContainerCustom>
    )
}

function PriceItem(props) {
    const { item, handleOpenMenu } = props;
    const currency = cache.getCurrency();
    return (
        <CardComponent paddingX={2} paddingY={2}>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={1}>
                <Stack flex={1}>
                    <Typography variant="body2">{currency}{item.price ? item.price.toFixed(2) : '0.00'}</Typography>
                </Stack>
                <Stack flex={0.2} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <IconButton onClick={(event) => handleOpenMenu(event, item)}><MoreIcon /></IconButton>
                </Stack>
            </Stack>
            {item.description && <Typography variant="body2">{item.description}</Typography>}
        </CardComponent>
    )
}