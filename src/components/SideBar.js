import { Avatar, Box, Drawer, Grid, Hidden, MenuItem, Stack, Typography, alpha } from "@mui/material";
import React, { useState } from "react";
import { NAV } from "../portal.config";
import ScrollBar from "./ScrollBar";
import { menu } from "../menu.config";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBar(props) {
    const { openSideBar, onCloseSideBar } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(openSideBar ? openSideBar : false);
    const { pathname } = useLocation();
    const account = {
        displayName: 'Jaydon Frankie',
        email: 'demo@minimals.cc',
        photoURL: '/assets/images/avatars/avatar_25.jpg',
    }

    const onCloseMenu = () => {
        setOpenMenu(false)
        if (onCloseSideBar) onCloseSideBar()
    }

    const renderAccount = () => {
        return (
            <Box
                sx={{
                    my: 3,
                    mx: 2.5,
                    py: 2,
                    px: 2.5,
                    display: 'flex',
                    borderRadius: 1.5,
                    alignItems: 'center',
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                }}
            >
                <Avatar src={account.photoURL} alt="photoURL" />

                <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">{account.displayName}</Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {account.role}
                    </Typography>
                </Box>
            </Box>
        )
    }

    const renderMenu = () => {
        const onClick = (item) => {
            navigate(item.route)
        }
        return (
            <Stack component={'nav'} spacing={0.5} sx={{ px: 2 }}>
                {menu.map((item, index) => {
                    let active = item.route == pathname;
                    if(item.route == '/dashboard' && pathname == '/'){
                        active = true;
                    }
                    return (
                        <MenuItem
                            key={index}
                            onClick={() => onClick(item)}
                            sx={{
                                minHeight: 44,
                                borderRadius: 0.75,
                                typography: 'body2',
                                color: 'text.secondary',
                                textTransform: 'capitalize',
                                fontWeight: 'fontWeightMedium',
                                ...(active && {
                                    color: 'primary.main',
                                    fontWeight: 'fontWeightSemiBold',
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                    '&:hover': {
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                                    },
                                }),
                            }}>
                            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                                {item.icon}
                            </Box>
                            <Box component={'span'}>{t(item.title)}</Box>
                        </MenuItem>
                    )
                })}
            </Stack>
        )
    }

    const renderContent = () => {
        return (
            <ScrollBar
                sx={{
                    height: 1,
                    '& .simplebar-content': {
                        // height: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <Grid item xs={12} container justifyContent={'center'} mt={3}>
                    <img src="/logo.png" alt="MRIK Logo" height={100} />
                </Grid>
                {renderAccount()}
                {renderMenu()}
                <Box sx={{ flexGrow: 1 }} />
            </ScrollBar>
        )
    }

    const checkRoles = async () => {
        console.log("AAAA CheckRoles menu: ", menu)
    }

    return (
        <Box sx={{
            flexShrink: { lg: 0 },
            width: { lg: NAV.WIDTH }
        }}
        >
            <Hidden lgDown>
                <Box
                    sx={{
                        height: 1,
                        position: 'fixed',
                        width: NAV.WIDTH,
                        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent()}
                </Box>
            </Hidden>
            <Hidden lgUp>
                <Drawer
                    open={openMenu}
                    onClose={onCloseMenu}
                    PaperProps={{
                        sx: {
                            width: NAV.WIDTH,
                        },
                    }}>
                    {renderContent()}
                </Drawer>
            </Hidden>
        </Box>
    )
}