import { Box, alpha, useTheme } from "@mui/material";
import React from "react";

export default function PublicPage(props) {
    const { children } = props;
    const theme = useTheme();

    return (
        <Box sx={{
            height: 1,
        }}>
            {children}

        </Box>
    )
}