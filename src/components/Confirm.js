import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, Stack, DialogTitle, IconButton, Typography } from "@mui/material";
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
                    paddingX: 5,
                    paddingY: 3,
                }
            }}
        >
            <Stack direction={'row'} alignItems='center'>
                <Stack flex={1}>
                    {title && <DialogTitle sx={{padding: 1, marginRight: 3}}>{title}</DialogTitle>}
                </Stack>
                <Stack>
                    <IconButton sx={{
                        backgroundColor: 'unset',
                    }} onClick={() => onClose()}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Stack>            
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