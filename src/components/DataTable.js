import { Button, Chip, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { cache } from '../utils/cache';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import { formatDateTimeFrEpoch, formatDateToDDMMYYYYFrEpoch, formatDateToDDMMYYYYHHSSFrEpoch, mappingValue } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { SortIcon } from './Icons';

function DataTable(props) {
    const { t } = useTranslation();
    const { tableConfig, enablePaging, paging } = props;
    const [order, setOrder] = useState('asc');
    const [rowsPerPage, setRowsPerPage] = React.useState(paging && paging.size ? paging.size : 10);
    const [orderBy, setOrderBy] = useState(null);
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        props.handleChangePage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        let value = event.target.value;
        let _size = paging.size ? paging.size : 10;
        setRowsPerPage(parseInt(value, _size));
        props.handleChangeRowsPerPage(value);
    };
    return (
        <TableContainer sx={{ marginTop: 1, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))', borderRadius: 2 }}>
            <Table>
                <EnhancedTableHead tableConfig={tableConfig} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                <EnhancedTableContent {...props} order={order} orderBy={orderBy} />
            </Table>
            <Grid xs={12} item container justifyContent={'center'} alignItems={'center'} marginTop={2}>
                {enablePaging && props.data.length > 0 && <TablePagination
                    component="div"
                    count={paging.total}
                    labelRowsPerPage={t('rows_per_page')}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    page={paging.page ? paging.page - 1 : 0}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </Grid>
        </TableContainer>
    )
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function EnhancedTableHead(props) {
    const { palette } = useTheme();
    const { tableConfig, orderBy, order, onRequestSort } = props;
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow sx={{
                borderRadius: 8,
                // backgroundColor: palette.background.main,
            }}>
                {tableConfig.map((element, index) => {
                    return (
                        <TableCell
                            key={element.key}
                            sx={{ borderBottom: 'none' }}
                            align={element.align}
                            width={element.width ? element.width : undefined}
                        >
                            {element.sort ? <Stack direction={'row'} component={"a"} spacing={1} sx={{
                                cursor: 'pointer'
                            }} onClick={() => props.onRequestSort(element.key)}>
                                <Typography variant='subtitle2'>{t(element.label)}</Typography>
                                <SortIcon />
                            </Stack> : <Typography variant='subtitle2'>{t(element.label)}</Typography>}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    )
}

function EnhancedTableContent(props) {
    const { data, tableConfig, order, orderBy } = props;
    const currency = cache.getCurrency();
    const { palette } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const getValue = (row, key) => {
        let splitObjectKey = key.split('.');
        let mainValue = row[splitObjectKey[0]];
        if (splitObjectKey.length == 1) {
            return mainValue;
        }
        for (let i = 1; i < splitObjectKey.length; i++) {
            let object = splitObjectKey[i];
            if (mainValue[object]) {
                mainValue = mainValue[object];
            }
        }
        return mainValue;
    }
    let _dataTableSort = order ? stableSort(data, getSorting(order, orderBy)) : data;
    return (
        <TableBody>
            {_dataTableSort.map((row, index) => (
                <TableRow key={index} sx={{cursor: props.onShowDetail ? 'pointer' : undefined}} onClick={props.onShowDetail ? () => props.onShowDetail(row) : undefined}>
                    {tableConfig.map((cell, index) => {
                        var value = getValue(row, cell.key);
                        if (!value && !cell.action) {
                            if (cell.type != 'amount') return (<TableCell key={index} />);
                        }
                        var formatValue = value;
                        if (cell.type == 'amount') {
                            let _color = cell.amountConfig && cell.amountConfig.stylesConfig ? cell.amountConfig.stylesConfig[row[cell.amountConfig.keyStyle]] : null;
                            if (_color) {
                                cell.customStyle = { color: _color }
                            }
                            formatValue = value ? value.toFixed(2) : "0.00";
                            formatValue = currency + formatValue;
                        } else if (cell.type == 'date') {
                            formatValue = formatDateToDDMMYYYYFrEpoch(value, false);
                        } else if (cell.type == 'datetime') {
                            formatValue = formatDateTimeFrEpoch(value, null, true);
                        } else {
                            if (cell.mappingValue) {
                                formatValue = t(mappingValue(value));
                            }
                        }
                        if (cell.component && cell.component == 'badge') {
                            let badgeConfig = cell.badgeConfig;
                            let icon = badgeConfig ? badgeConfig.defaultIcon : null;
                            let customStyle = cell.customStyle;
                            if (cell.customStyle && cell.customStyle.color) {
                                customStyle = { ...customStyle, color: palette[cell.customStyle.color] }
                            }
                            if (badgeConfig && badgeConfig.iconsConfig) {
                                icon = badgeConfig.iconsConfig[value];
                            }
                            if (badgeConfig && badgeConfig.stylesConfig && badgeConfig.stylesConfig[value]) {
                                let _color = badgeConfig.stylesConfig[value] ? badgeConfig.stylesConfig[value] : null;
                                customStyle = {
                                    backgroundColor: _color ? palette[_color].lighter : undefined,
                                    color: _color ? palette[_color].main : undefined
                                }
                            }
                            return (
                                <TableCell key={index} align={cell.align}>
                                    <Chip icon={icon ? icon() : undefined} size='small' label={formatValue} sx={{ ...customStyle, lineHeight: "unset", borderRadius: 0.5 }} />
                                </TableCell>
                            )
                        } else if (cell.action) {
                            let onClickAction = null;
                            if (cell.allowActionWith && !cell.allowActionWith[row[cell.allowActionWith.key]]) {
                                return <TableCell key={index} align={cell.align}></TableCell>;
                            }
                            if (cell.actionType == 'func' && props[cell.actionFuncName]) {
                                onClickAction = (event) => props[cell.actionFuncName](event, row);
                            }
                            else if (cell.actionType == 'redirect' && cell.actionRouter) {
                                onClickAction = () => navigate(cell.actionRouter);
                            }
                            if (cell.actionIcon && cell.actionName) {
                                let Icon = cell.actionIcon;
                                return (
                                    <TableCell key={index} align={cell.align}>
                                        <Button onClick={(e) => onClickAction(e, row)} startIcon={<Icon color={palette.grey['500']} />}>{t(cell.actionName)}</Button>
                                    </TableCell>
                                )
                            } else if (cell.actionIcon) {
                                let Icon = cell.actionIcon;
                                return (
                                    <TableCell key={index} align={cell.align}>
                                        <IconButton onClick={(e) => onClickAction(e, row)} sx={{
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer'
                                        }}>{<Icon color={palette.grey['500']} />}</IconButton>
                                    </TableCell>
                                )
                            } else {
                                return (
                                    <TableCell key={index} align={cell.align}>
                                        <Typography component={'a'} 
                                            onClick={(e) => onClickAction(e, row)} variant='subtitle2' 
                                            sx={{ ...cell.customStyle,cursor:'pointer', color: cell.customStyle && cell.customStyle.color ? palette[cell.customStyle.color].main : undefined }}>
                                                {t(cell.actionName)}
                                        </Typography>
                                    </TableCell>
                                )
                            }
                        } else {
                            return (
                                <TableCell key={index} align={cell.align}>
                                    <Typography variant='body2' sx={{ ...cell.customStyle, color: cell.customStyle && cell.customStyle.color ? palette[cell.customStyle.color].main : undefined }}>{formatValue}</Typography>
                                </TableCell>
                            )
                        }
                    })}
                </TableRow>
            ))}
        </TableBody>
    )
}

DataTable.propTypes = {
    data: PropTypes.array,
    tableConfig: PropTypes.array,
    onShowDetail: PropTypes.func,
    handleChangePage: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
    enablePaging: PropTypes.bool,
    paging: PropTypes.object
}

export default DataTable;



