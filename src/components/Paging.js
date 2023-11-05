import React from 'react'
import PropTypes from "prop-types";
import { Grid, TablePagination } from '@mui/material';

function Paging(props) {
    const { paging } = props;
    const [rowsPerPage, setRowsPerPage] = React.useState(paging && paging.size ? paging.size : 10);

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
        <Grid xs={12} item container justifyContent={'center'} alignItems={'center'} marginTop={2}>
            <TablePagination
                component="div"
                count={paging.total}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                page={paging.page ? paging.page - 1 : 0}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
    )
}


Paging.propTypes = {
    handleChangePage: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
    paging: PropTypes.object
}

export default Paging;
