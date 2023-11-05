import { CircularProgress, Dialog, DialogContent, Grid } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function Loading(props){
    const { showLoading } = props;

    return(
        <Dialog open={showLoading}>
            <DialogContent>
                <Grid item container justifyContent={'center'}>
                    <CircularProgress size={'2rem'}/>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

Loading.propTypes = {
    showLoading: PropTypes.bool,
}

export default Loading;