import { outlinedInputClasses } from '@mui/material';
import { alpha, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

export const commonFont = {
    regular: 'PublicSans-Regular',
    medium: 'PublicSans-Medium',
    black: 'PublicSans-Black',
    bold: 'PublicSans-Bold',
    italic: 'PublicSans-Italic',
    light: 'PublicSans-Light',
    boldCondensed: 'PublicSans-SemiBold',
}

//#region Colors
const grey = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
};

const primary = {
    lighter: '#7EDD8C',
    light: '#4ED061',
    main: '#1d6d29',
    dark: '#15511E',
    darker: '#104118',
    contrastText: '#FFFFFF',
};

const secondary = {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
};

const info = {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
};

const success = {
    lighter: '#C8FAD6',
    light: '#5BE49B',
    main: '#00A76F',
    dark: '#007867',
    darker: '#004B50',
    contrastText: '#FFFFFF',
};

const warning = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: grey[800],
};

const error = {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
};

const common = {
    black: '#000000',
    white: '#FFFFFF',
};

const action = {
    hover: alpha(grey[500], 0.08),
    selected: alpha(grey[500], 0.16),
    disabled: alpha(grey[500], 0.8),
    disabledBackground: alpha(grey[500], 0.24),
    focus: alpha(grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
};

const base = {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    grey,
    common,
    divider: alpha(grey[500], 0.2),
    action,
};
//#endregion

//#region Typography
export function remToPx(value) {
    return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
    return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
}
//#endregion

export const theme = () => {
    const transparent1 = alpha(grey[500], 0.2);
    const transparent2 = alpha(grey[500], 0.14);
    const transparent3 = alpha(grey[500], 0.12);
    const transparent = alpha(grey[500], 0.16);

    var theme = createTheme({
        palette: {
            ...base,
            mode: 'light',
            text: {
                primary: grey[800],
                secondary: grey[600],
                disabled: grey[500],
            },
            background: {
                paper: '#FFFFFF',
                default: grey[100],
                neutral: grey[200],
            },
            action: {
                ...base.action,
                active: grey[600],
            },
        },
        typography: {
            fontFamily: commonFont.regular,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightSemiBold: 600,
            fontWeightBold: 700,
            h1: {
                fontWeight: 800,
                lineHeight: 80 / 64,
                fontSize: pxToRem(40),
                ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
            },
            h2: {
                fontWeight: 800,
                lineHeight: 64 / 48,
                fontSize: pxToRem(32),
                ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
            },
            h3: {
                fontWeight: 700,
                lineHeight: 1.5,
                fontSize: pxToRem(24),
                ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
            },
            h4: {
                fontWeight: 700,
                lineHeight: 1.5,
                fontSize: pxToRem(20),
                ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
            },
            h5: {
                fontWeight: 700,
                lineHeight: 1.5,
                fontSize: pxToRem(18),
                ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
            },
            h6: {
                fontWeight: 700,
                lineHeight: 28 / 18,
                fontSize: pxToRem(17),
                ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
            },
            subtitle1: {
                fontWeight: 600,
                lineHeight: 1.5,
                fontSize: pxToRem(16),
            },
            subtitle2: {
                fontWeight: 600,
                lineHeight: 22 / 14,
                fontSize: pxToRem(14),
            },
            body1: {
                lineHeight: 1.5,
                fontSize: pxToRem(16),
            },
            body2: {
                lineHeight: 22 / 14,
                fontSize: pxToRem(14),
            },
            caption: {
                lineHeight: 1.5,
                fontSize: pxToRem(12),
            },
            overline: {
                fontWeight: 700,
                lineHeight: 1.5,
                fontSize: pxToRem(12),
                textTransform: 'uppercase',
            },
            button: {
                fontWeight: 700,
                lineHeight: 24 / 14,
                fontSize: pxToRem(14),
                textTransform: 'unset',
            },
        },
        shadows: [
            'none',
            `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
            `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
            `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
            `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
            `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
            `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
            `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
            `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
            `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
            `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
            `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
            `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
            `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
            `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
            `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
            `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
            `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
            `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
            `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
            `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
            `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
            `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
            `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
            `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`,
        ],
        customShadows: {
            z1: `0 1px 2px 0 ${transparent}`,
            z4: `0 4px 8px 0 ${transparent}`,
            z8: `0 8px 16px 0 ${transparent}`,
            z12: `0 12px 24px -4px ${transparent}`,
            z16: `0 16px 32px -4px ${transparent}`,
            z20: `0 20px 40px -4px ${transparent}`,
            z24: `0 24px 48px 0 ${transparent}`,
            //
            card: `0 0 2px 0 ${alpha(grey[500], 0.08)}, 0 12px 24px -4px ${alpha(grey[500], 0.08)}`,
            dropdown: `0 0 2px 0 ${alpha(grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(grey[500], 0.24)}`,
            dialog: `-40px 40px 80px -8px ${alpha(common.black, 0.24)}`,
            //
            primary: `0 8px 16px 0 ${alpha(primary.main, 0.24)}`,
            info: `0 8px 16px 0 ${alpha(info.main, 0.24)}`,
            secondary: `0 8px 16px 0 ${alpha(secondary.main, 0.24)}`,
            success: `0 8px 16px 0 ${alpha(success.main, 0.24)}`,
            warning: `0 8px 16px 0 ${alpha(warning.main, 0.24)}`,
            error: `0 8px 16px 0 ${alpha(error.main, 0.24)}`,
        },
        shape: { borderRadius: 8 },
    });

    const overrides = (theme) => {
        return {
            MuiCssBaseline: {
                styleOverrides: {
                    '*': {
                        boxSizing: 'border-box',
                    },
                    html: {
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        height: '100%',
                        WebkitOverflowScrolling: 'touch',
                    },
                    body: {
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        height: '100%',
                    },
                    '#root': {
                        width: '100%',
                        height: '100%',
                    },
                    input: {
                        '&[type=number]': {
                            MozAppearance: 'textfield',
                            '&::-webkit-outer-spin-button': {
                                margin: 0,
                                WebkitAppearance: 'none',
                            },
                            '&::-webkit-inner-spin-button': {
                                margin: 0,
                                WebkitAppearance: 'none',
                            },
                        },
                    },
                    img: {
                        maxWidth: '100%',
                        display: 'inline-block',
                        verticalAlign: 'bottom',
                    },
                },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backgroundColor: alpha(theme.palette.grey[900], 0.8),
                    },
                    invisible: {
                        background: 'transparent',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    containedInherit: {
                        color: theme.palette.common.white,
                        backgroundColor: theme.palette.grey[800],
                        '&:hover': {
                            color: theme.palette.common.white,
                            backgroundColor: theme.palette.grey[800],
                        },
                    },
                    sizeLarge: {
                        minHeight: 48,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: theme.customShadows.card,
                        borderRadius: Number(theme.shape.borderRadius) * 2,
                        position: 'relative',
                        zIndex: 0, // Fix Safari overflow: hidden with border radius
                    },
                },
            },
            MuiCardHeader: {
                defaultProps: {
                    titleTypographyProps: { variant: 'h6' },
                    subheaderTypographyProps: { variant: 'body2' },
                },
                styleOverrides: {
                    root: {
                        padding: theme.spacing(3, 3, 0),
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: alpha(theme.palette.grey[500], 0.24),
                        },
                    },
                },
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 0,
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        color: theme.palette.text.secondary,
                        backgroundColor: theme.palette.background.neutral,
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: theme.palette.grey[800],
                    },
                    arrow: {
                        color: theme.palette.grey[800],
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    paragraph: {
                        marginBottom: theme.spacing(2),
                    },
                    gutterBottom: {
                        marginBottom: theme.spacing(1),
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        ...theme.typography.body2,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        width: '100%',
                        fontFamily: commonFont.regular,                       
                        '& .MuiOutlinedInput-input': {
                            paddingTop: 12,
                            paddingBottom: 12,
                            fontFamily: commonFont.medium,
                        }
                    },
                },
            },
        }
    }

    theme.components = overrides(theme)

    console.log("AAAA theme: ", theme)
    return theme
}

export default theme;