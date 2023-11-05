import { Box, useTheme } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { HEADER, SPACING, NAV } from "../portal.config";
import Header from "./Header";
import Alert from './Alert';
import Loading from './Loading';
import SideBar from "./SideBar";

function ContainerCustom(props) {
    const { children, other, sx, message, showSideBar, showLoading, showHeader } = props;
    const theme = useTheme();

    return (
        <>
            {showHeader && <Header />}
            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                {showSideBar && <SideBar />}
                <Box component={"main"}
                    sx={{
                        flexGrow: 1,
                        minHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        py: `${HEADER.H_MOBILE + SPACING}px`,
                        [theme.breakpoints.up('lg')]: {
                            px: 2,
                            py: `${HEADER.H_DESKTOP + SPACING}px`,
                            width: `calc(100% - ${NAV.WIDTH}px)`,
                        },
                        ...sx,
                    }}
                    {...other}
                >
                    {children}
                </Box>
            </Box>
            {message && message.show && <Alert
                isOpen={message.show}
                message={message.content}
                otherMessage={message.otherMessage ? message.otherMessage : null}
                onClose={message.callBackFn}
            />}
            {showLoading && <Loading showLoading={showLoading} />}
        </>
    )
}

ContainerCustom.propsTypes = {
    message: PropTypes.object,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
    showProcessing: PropTypes.bool,
    showSideBar: PropTypes.bool,
}

export default ContainerCustom;
