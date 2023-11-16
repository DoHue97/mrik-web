import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ContainerCustom from "../components/Container";

export default function AccessDenied(props) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <ContainerCustom>
            <Box
                sx={{
                    maxWidth: 480,
                    mx: 'auto',
                    display: 'flex',
                    minHeight: '60vh',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Sorry, You don't have permission 
                </Typography>
            </Box>
        </ContainerCustom>
    )
}