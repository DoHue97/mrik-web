import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";

function Confirm(props) {
    const { isOpen, onClose, title, message, otherMessage, actionTitle, closeTitle, onAction } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <Typography>{message}</Typography>
                {otherMessage}
            </DialogContent>
            <DialogActions>
                <Button fullWidth id="confirm/btnCancel" variant="outlined" onClick={onClose}>{closeTitle ? closeTitle : 'Cancel'}</Button>
                <Button fullWidth id="confirm/btnOK" variant="contained" onClick={onAction}>{actionTitle ? actionTitle : 'OK'}</Button>
            </DialogActions>
        </Dialog>
    )
}

Confirm.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    message: PropTypes.string,
    actionTitle: PropTypes.string,
    otherMessage: PropTypes.object,
    closeTitle: PropTypes.string,
    onAction: PropTypes.func,
    onClose: PropTypes.func,
}

export default Confirm;