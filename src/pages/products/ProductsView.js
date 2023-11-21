import React, { useState } from "react";
import ContainerCustom from '../../components/Container'
import { Grid, Hidden, Popover, TablePagination, Typography, Stack, IconButton, Button, useTheme, TextField, Box } from "@mui/material";
import { EditIcon, DeleteIcon, MoreIcon, SearchIcon } from "../../components/Icons";
import { useTranslation } from "react-i18next";
import DataTable from "../../components/DataTable";
import CardComponent from "../../components/Card";
import { productsTableConfig } from "../../datatable.config";

export default function ProductsView(props){
    const { t } = useTranslation();
    const theme = useTheme();
    const { products } = props;
    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(products && products.paging && products.paging.size ? products.paging.size : 10);
    
    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'product_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'product_delete' },
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if(props.setProduct) props.setProduct(row);
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
        let _size = products.paging.size ? products.paging.size : 10;
        console.log("AAA parseInt(value, _size): ", parseInt(value, _size))
        setRowsPerPage(value);
        props.handleChangeRowsPerPage(value);
    };

    return(        
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12}>
                <Grid item xs={12} container spacing={1} my={1} alignItems={'center'} mb={4}>
                    <Grid item xs={12} sm={9} container spacing={1} alignItems={'center'}>
                        <Grid item xs={9}>
                            <TextField
                                name="products_search"
                                id="products_search"
                                placeholder={t('enter_product_search_value')}                                
                                value={props.searchValue}
                                onChange={(event) => props.onHandleChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3} container justifyContent={'flex-end'}>
                            <Button variant="contained" onClick={() => props.onSearch()}><SearchIcon color={theme.palette.common.white} /></Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} justifyContent={'flex-end'}>
                        <Box width={'100%'} textAlign={'right'}>
                            <Button variant="contained" onClick={() => props.onAddProduct()}>+ {t('btn_add')}</Button>
                        </Box>
                    </Grid>
                </Grid>
                <Hidden mdDown>
                    <DataTable
                        tableConfig={productsTableConfig}
                        data={products.content}
                        enablePaging={true}
                        paging={products.paging}
                        onShowMenuActions={handleOpenMenu}
                        handleChangeRowsPerPage={props.handleChangeRowsPerPage}
                        handleChangePage={props.handleChangePage}
                    />
                </Hidden>
                <Hidden mdUp>
                    {products.content.map((item, index) => {
                        return(
                            <Grid item xs={12} key={index} my={1}>
                                <ProductItem item={item} menuActionItem={menuActionItem} handleOpenMenu={handleOpenMenu}/>
                            </Grid>
                        )
                    })}
                    <TablePagination
                        component="div"
                        count={products.paging.total}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        page={products.paging.page ? products.paging.page - 1 : 0}
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

function ProductItem(props){
    const { item, handleOpenMenu } = props;

    return(
        <CardComponent paddingX={2} paddingY={2}>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={1}>
                <Stack flex={1}>
                    <Typography variant="body2">{item.name}</Typography>
                </Stack>
                <Stack flex={0.2} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <IconButton onClick={(event) => handleOpenMenu(event, item)}><MoreIcon /></IconButton>
                </Stack>
            </Stack>
            {item.description && <Typography variant="body2">{item.description}</Typography>}
        </CardComponent>
    )
}