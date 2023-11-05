import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function Alert(props){
    const { isOpen, onClose, title, message, otherMessage, actionName } = props;

    return(
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
                {otherMessage}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" id="alert/btnClose" onClick={onClose}>{actionName ? actionName : 'OK'}</Button>
            </DialogActions>
        </Dialog>
    )
}

Alert.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    message: PropTypes.string,
    actionName: PropTypes.string,
    otherMessage: PropTypes.object,
    onClose: PropTypes.func,
}

export default Alert;