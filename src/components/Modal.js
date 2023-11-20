import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseIcon } from "./Icons";
import Alert from "./Alert";

function Modal(props) {
    const { isOpen, onClose, title, children, maxWidth, enableCloseButton, message } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth={maxWidth ? true : false}
            maxWidth={maxWidth ? maxWidth : 'sm'}
            sx={{
                '.MuiDialog-paper': {
                    minWidth: 400,
                }
            }}
        >
            {enableCloseButton && <IconButton sx={{
                position: 'absolute',
                right: 5,
                top: 0,
                backgroundColor: 'unset'
            }} onClick={() => onClose()}>
                <CloseIcon />
            </IconButton>}
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {children}
            </DialogContent>
            {message && message.show && <Alert
                isOpen={message.show}
                message={message.content}
                otherMessage={message.otherMessage ? message.otherMessage : null}
                onClose={message.callBackFn}
            />}
        </Dialog>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    maxWidth: PropTypes.string,
    enableCloseButton: PropTypes.bool,
    message: PropTypes.object,
}

export default Modal;