import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseIcon } from "./Icons";

function Modal(props) {
    const { isOpen, onClose, title, children, maxWidth, enableCloseButton } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth={maxWidth ? true : false}
            maxWidth={maxWidth ? maxWidth : 'sm'}
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
        </Dialog>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    maxWidth: PropTypes.string,
    enableCloseButton: PropTypes.bool,
}

export default Modal;