import React, { useState } from "react";
import ContainerCustom from "../../components/Container";
import { Button, Grid, Box, IconButton, Popover, Stack, TablePagination, TextField, Typography, useTheme } from "@mui/material";
import { DeleteIcon, EditIcon, MoreIcon, RolesIcon, SearchIcon } from "../../components/Icons";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";

export default function OffersView(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const { offers } = props;

    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(offers && offers.paging && offers.paging.size ? offers.paging.size : 10);

    const menuActionItem = [
        { label: 'btn_edit', icon: <EditIcon />, onClick: props.onEdit, id: 'offer_edit' },
        { label: 'btn_delete', icon: <DeleteIcon />, onClick: props.onDelete, id: 'offer_delete' },
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if (props.setOffer) props.setOffer(row);
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
        let _size = offers.paging.size ? offers.paging.size : 10;
        console.log("AAA parseInt(value, _size): ", parseInt(value, _size))
        setRowsPerPage(value);
        props.handleChangeRowsPerPage(value);
    };

    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            {/* <Grid item xs={12} textAlign={'right'} my={1}>
                <Button variant="contained" onClick={() => navigate(config_path.offer_add)}>+ {t('btn_add')}</Button>
            </Grid> */}
            <Grid item xs={12}>
                <Grid item xs={12} container spacing={1} my={1} alignItems={'center'} mb={4}>
                    <Grid item xs={12} sm={9} container spacing={1} alignItems={'center'}>
                        <Grid item xs={9}>
                            <TextField
                                name="offers_search"
                                id="offers_search"
                                placeholder={t('enter_offers_search_value')}                                
                                value={props.searchValue}
                                onChange={(event) => props.onHandleChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={() => props.onSearch()}><SearchIcon color={theme.palette.common.white} /></Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} justifyContent={'flex-end'}>
                        <Box width={'100%'} textAlign={'right'}>
                            <Button variant="contained" onClick={() => navigate(config_path.offer_add)}>+ {t('btn_add')}</Button>
                        </Box>
                    </Grid>
                </Grid>
                {offers.content.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index} my={1}>
                            <OfferItem item={item} menuActionItem={menuActionItem} handleOpenMenu={handleOpenMenu} />
                        </Grid>
                    )
                })}
                <TablePagination
                    component="div"
                    count={offers.paging.total}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    page={offers.paging.page ? offers.paging.page - 1 : 0}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
            {menuActionItem && menuActionItem.length > 0 && <Popover id='menu-actions-offers'
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

function OfferItem(props) {
    const { item, handleOpenMenu } = props;

    return (
        <Card paddingX={2} paddingY={2}>
            <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={1}>
                <Stack flex={1}>
                    <Typography variant="body2">{item.name}</Typography>
                </Stack>
                <Stack flex={.2} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <IconButton onClick={(event) => handleOpenMenu(event, item)}><MoreIcon /></IconButton>
                </Stack>
            </Stack>
            <Typography variant="caption">{item.description ? item.description : null}</Typography>
            {/* <div dangerouslySetInnerHTML={{ __html: item.content }}></div> */}
        </Card>
    )
}