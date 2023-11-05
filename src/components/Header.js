import { Avatar, AppBar, Badge, Box, Button, Divider, Hidden, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, MenuItem, Popover, Stack, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HEADER, NAV, portal_config } from "../portal.config";
import { CheckDoubleFillIcon, ClockIcon, MenuIcon, NotificationIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import { getLanguage } from '../utils/common';
import { cache } from "../utils/cache";
import { storeLanguageAsync } from "../utils/common";
import { alpha } from "@material-ui/core";
import ScrollBar from './ScrollBar';
import { fToNow } from "../utils/utils";
import { set, sub } from 'date-fns';
import SideBar from "./SideBar";
import { profile } from "../menu.config";

const NOTIFICATIONS = [
    {
        id: new Date().getTime(),
        title: 'Your order is placed',
        description: 'waiting for shipping',
        avatar: null,
        type: 'order_placed',
        createdAt: set(new Date(), { hours: 10, minutes: 30 }),
        isUnRead: true,
    },
    {
        id: new Date().getTime(),
        title: "Hue Do",
        description: 'answered to your comment on the Minimal',
        avatar: '/assets/images/avatars/avatar_2.jpg',
        type: 'friend_interactive',
        createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
        isUnRead: true,
    },
    {
        id: new Date().getTime(),
        title: 'You have new message',
        description: '5 unread messages',
        avatar: null,
        type: 'chat_message',
        createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
        isUnRead: false,
    },
    {
        id: new Date().getTime(),
        title: 'You have new mail',
        description: 'sent from Guido Padberg',
        avatar: null,
        type: 'mail',
        createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
        isUnRead: false,
    },
    {
        id: new Date().getTime(),
        title: 'Delivery processing',
        description: 'Your order is being shipped',
        avatar: null,
        type: 'order_shipped',
        createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
        isUnRead: false,
    },
];

function Header(props) {
    const { t } = useTranslation();
    const theme = useTheme();
    //sidebar menu
    const [openSideBar, setOpenSideBar] = useState(false);
    //language
    const languages = cache.getLanguages() ? cache.getLanguages() : portal_config.default_list_languages;
    const [openLanguages, setOpenLanguages] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
    const [language, setLanguage] = useState(languages[0]);
    //notification
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [openNotify, setOpenNotify] = useState(null);
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
    //menu profile
    const [openProfile, setOpenProfile] = useState(null);
    const account = {
        displayName: 'Jaydon Frankie',
        email: 'demo@minimals.cc',
        photoURL: '/assets/images/avatars/avatar_25.jpg',
    }

    useEffect(() => {
        initData();
    }, [])

    const initData = () => {
        let currentLang = languages.filter(x => x.value == currentLanguage);
        if (currentLang && currentLang.length > 0) {
            setLanguage(currentLang[0]);
            setCurrentLanguage(currentLang[0].value)
        }
    }
    //#region sidebar
    const handleOpenSideBar = () => {
        setOpenSideBar(true)
    }
    const handleCloseSideBar = () => {
        setOpenSideBar(false)
    }
    //#endregion

    //#region language
    const handleOpenLanguages = (event) => {
        setOpenLanguages(event.currentTarget)
    }

    const handleCloseLanguages = () => {
        setOpenLanguages(null)
    }

    const onChangeLanguage = (item) => {
        let currentLang = languages.filter(x => x.value == item.value);
        if (currentLang && currentLang.length > 0) {
            setLanguage(currentLang[0]);
            setCurrentLanguage(currentLang[0].value)
            storeLanguageAsync(currentLang[0].value)
        }
        handleCloseLanguages();
    }
    //#endregion

    //#region notifications
    const handleOpenNotify = (event) => {
        setOpenNotify(event.currentTarget)
    }

    const handleCloseNotify = () => {
        setOpenNotify(null)
    }
    //#endregion

    //#region menu profile
    const handleOpenProfile = (event) => {
        setOpenProfile(event.currentTarget)
    }
    const handleCloseProfile = () => {
        setOpenProfile(null)
    }
    //#endregion

    return (
        <>
            <AppBar sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                backgroundColor: alpha(theme.palette.background.default, 0.8),
                [theme.breakpoints.up('lg')]: {
                    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
                    height: HEADER.H_DESKTOP,
                },
            }}>
                <Toolbar
                    sx={{
                        height: 1,
                        px: { lg: 5 },
                    }}
                >
                    <>
                        <Hidden lgUp>
                            <IconButton onClick={() => handleOpenSideBar()}>
                                <MenuIcon />
                            </IconButton>
                            {openSideBar && <SideBar openSideBar={openSideBar} onCloseSideBar={handleCloseSideBar} />}
                        </Hidden>
                        <Box sx={{ flexGrow: 1 }} />
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            {/* Languages */}
                            <>
                                <IconButton onClick={handleOpenLanguages}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        ...(openLanguages && {
                                            bgcolor: 'action.selected',
                                        }),
                                    }}
                                >
                                    <img src={language.icon} alt={language.label} width={28} height={20} />
                                </IconButton>
                                <Popover open={!!openLanguages}
                                    anchorEl={openLanguages}
                                    onClose={handleCloseLanguages}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            p: 0,
                                            mt: 1,
                                            ml: 0.75,
                                            width: 180,
                                        },
                                    }}
                                >
                                    {languages && languages.length > 0 && languages.map((item, index) => {
                                        return (
                                            <MenuItem key={item.value} selected={language.value == item.value}
                                                onClick={() => onChangeLanguage(item)}
                                            >
                                                <img src={item.icon} alt={item.label} width={28} height={20} />
                                                <Typography ml={1}>{t(item.trans_label)}</Typography>
                                            </MenuItem>
                                        )
                                    })}
                                </Popover>
                            </>
                            {/* Notifications */}
                            <>
                                <IconButton color={openNotify ? 'primary' : 'default'} onClick={handleOpenNotify}>
                                    <Badge badgeContent={totalUnRead} color='error'>
                                        <NotificationIcon />
                                    </Badge>
                                </IconButton>
                                <Popover
                                    open={!!openNotify}
                                    anchorEl={openNotify}
                                    onClose={handleCloseNotify}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            mt: 1.5,
                                            ml: 0.75,
                                            width: 360,
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1">Notifications</Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                You have {totalUnRead} unread messages
                                            </Typography>
                                        </Box>

                                        {totalUnRead > 0 && (
                                            <Tooltip title=" Mark all as read">
                                                <IconButton color="primary">
                                                    <CheckDoubleFillIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Box>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    <ScrollBar sx={{ height: { xs: 340, sm: 'auto' } }}>
                                        <List
                                            disablePadding
                                            subheader={
                                                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                                    New
                                                </ListSubheader>
                                            }
                                        >
                                            {notifications.slice(0, 2).map((notification) => (
                                                <NotificationItem key={notification.id} notification={notification} />
                                            ))}
                                        </List>
                                        <List
                                            disablePadding
                                            subheader={
                                                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                                    Before that
                                                </ListSubheader>
                                            }
                                        >
                                            {notifications.slice(2, 5).map((notification) => (
                                                <NotificationItem key={notification.id} notification={notification} />
                                            ))}
                                        </List>
                                    </ScrollBar>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    <Box sx={{ p: 1 }}>
                                        <Button fullWidth disableRipple>
                                            View All
                                        </Button>
                                    </Box>
                                </Popover>
                            </>
                            {/* Menu Profile */}
                            <>
                                <IconButton
                                    onClick={handleOpenProfile}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        background: (theme) => alpha(theme.palette.grey[500], 0.08),
                                        ...(openProfile && {
                                            background: (theme) =>
                                                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                                        }),
                                    }}
                                >
                                    <Avatar
                                        src={account.photoURL}
                                        alt={account.displayName}
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            border: (theme) => `solid 2px ${theme.palette.background.default}`,
                                        }}
                                    >
                                        {account.displayName.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Popover
                                    open={!!openProfile}
                                    anchorEl={openProfile}
                                    onClose={handleCloseProfile}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            p: 0,
                                            mt: 1,
                                            ml: 0.75,
                                            width: 200,
                                            // top: '60px!important',
                                        },
                                    }}
                                >
                                    <Box sx={{ my: 1.5, px: 2 }}>
                                        <Typography variant="subtitle2" noWrap>
                                            {account.displayName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                            {account.email}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    {profile.map((option) => (
                                        <MenuItem key={option.id} onClick={handleCloseProfile}>
                                            {t(option.title)}
                                        </MenuItem>
                                    ))}
                                    <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
                                    <MenuItem
                                        disableRipple
                                        disableTouchRipple
                                        onClick={handleCloseProfile}
                                        sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                                    >
                                        {t('logout')}
                                    </MenuItem>
                                </Popover>
                            </>
                        </Stack>
                    </>
                </Toolbar>
            </AppBar>
        </>
    )
}

function NotificationItem({ notification }) {
    const { title } = notification;

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected',
                }),
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled',
                        }}
                    >
                        <ClockIcon sx={{ mr: 0.5, width: 16, height: 16 }} />
                        {fToNow(notification.createdAt)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

export default Header;