import React, { useState } from "react";
import ContainerCustom from '../../components/Container';
import { Grid, Hidden, Popover, Stack, TablePagination, Typography, IconButton } from "@mui/material";
import { EditIcon, MoreIcon } from "../../components/Icons";
import DataTable from "../../components/DataTable";
import CardComponent from "../../components/Card";
import { useTranslation } from "react-i18next";
import { transactionsTableConfig } from "../../datatable.config";

export default function RequestWithDrawalView(props) {
    const { t } = useTranslation();
    const { transactions } = props;
    const [openMenu, setOpenMenu] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(transactions && transactions.paging && transactions.paging.size ? transactions.paging.size : 10);

    const menuActionItem = [
        { label: 'btn_update', icon: <EditIcon />, onClick: props.onUpdate, id: 'transaction_update' },
    ]

    const handleOpenMenu = (event, row) => {
        console.log("AAA event: ", event)
        if (props.setTransaction) props.setTransaction(row);
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
        let _size = transactions.paging.size ? transactions.paging.size : 10;
        console.log("AAA parseInt(value, _size): ", parseInt(value, _size))
        setRowsPerPage(value);
        props.handleChangeRowsPerPage(value);
    };


    return (
        <ContainerCustom message={props.message} showProcessing={props.showProcessing}>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Hidden mdDown>
                        <DataTable
                            tableConfig={transactionsTableConfig}
                            data={transactions.content}
                            enablePaging={true}
                            paging={transactions.paging}
                            onShowMenuActions={handleOpenMenu}
                            handleChangeRowsPerPage={props.handleChangeRowsPerPage}
                            handleChangePage={props.handleChangePage}
                        />
                    </Hidden>
                    <Hidden mdUp>
                        {transactions.content.map((item, index) => {
                            return (
                                <Grid item xs={12} key={index} my={1}>
                                    <Item item={item} menuActionItem={menuActionItem} handleOpenMenu={handleOpenMenu} />
                                </Grid>
                            )
                        })}
                        <TablePagination
                            component="div"
                            count={transactions.paging.total}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            page={transactions.paging.page ? transactions.paging.page - 1 : 0}
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
            </Grid>
        </ContainerCustom>
    )
}

function Item(props){
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