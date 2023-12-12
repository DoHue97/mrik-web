import { Box, useTheme } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { HEADER, SPACING, NAV } from "../portal.config";
import Header from "./Header";
import Alert from './Alert';
import Loading from './Loading';
import SideBar from "./SideBar";
import MenuBreadcrumbs from "./Breadcrumbs";
import Confirm from "./Confirm";

function ContainerCustom(props) {
    const { children, other, sx, message, hideSideBar, showLoading, hideHeader, showBreadCrumbs, breadcrumbs, confirm } = props;
    const theme = useTheme();

    return (
        <>
            {!hideHeader && <Header />}
            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                {!hideSideBar && <SideBar />}
                <Box component={"main"}
                    sx={{
                        flexGrow: 1,
                        minHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        py: `${HEADER.H_MOBILE + SPACING}px`,
                        px: 4,
                        [theme.breakpoints.up('lg')]: {
                            py: `${HEADER.H_DESKTOP + SPACING}px`,
                            width: `calc(100% - ${NAV.WIDTH}px)`,
                        },
                        [theme.breakpoints.down('md')]: {
                            px: 2,
                        },
                        ...sx,
                    }}
                    {...other}
                >
                    {showBreadCrumbs && <MenuBreadcrumbs items={breadcrumbs}/>}
                    {children}
                </Box>
            </Box>
            {message && message.show && <Alert
                isOpen={message.show}
                message={message.content}
                otherMessage={message.otherMessage ? message.otherMessage : null}
                onClose={message.callBackFn}
            />}
            {confirm && confirm.show && <Confirm
                isOpen={confirm.show}
                onClose={confirm.onClose}
                message={confirm.message}
                title={confirm.title}
                actionTitle={confirm.actionTitle}
                closeTitle={confirm.closeTitle}
                otherMessage={confirm.otherMessage}
                onAction={confirm.onAction}
            />}
            {showLoading && <Loading showLoading={showLoading} />}
        </>
    )
}

ContainerCustom.propTypes = {
    message: PropTypes.object,
    hideHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
    showProcessing: PropTypes.bool,
    hideSideBar: PropTypes.bool,
    showBreadCrumbs: PropTypes.bool,
    breadcrumbs: PropTypes.array,
    confirm: PropTypes.object,
}

export default ContainerCustom;
