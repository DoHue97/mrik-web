import React from 'react'
import { useTheme } from "@mui/material"

export const GetIconColor = () =>  {
    const { palette } = useTheme();
    // console.log("AAAA GetIconColor palette: ", palette)
    return ({
        default: palette.grey[500],
        black: palette.common.black,
        primary: palette.primary.main,
        white: palette.common.white,
        error: palette.error.main,
    })
}