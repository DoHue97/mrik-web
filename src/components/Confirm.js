import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { CloseIcon } from "./Icons";

function Confirm(props) {
    const { isOpen, onClose, title, message, otherMessage, actionTitle, closeTitle, onAction, maxWidth } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={maxWidth ? maxWidth : 'sm'}
            PaperProps={{
                sx: {
                    paddingX: 2,
                    paddingY: 2,
                }
            }}
        >
            <IconButton sx={{
                position: 'absolute',
                right: 5,
                top: 0,
                backgroundColor: 'unset',
                zIndex: 10,
            }} onClick={() => onClose()}>
                <CloseIcon />
            </IconButton>
            {title && <DialogTitle sx={{padding: 1, marginRight: 3}}>{title}</DialogTitle>}
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
    maxWidth: PropTypes.string,
}

export default Confirm;