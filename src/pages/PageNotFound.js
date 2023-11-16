import { Box, Typography, Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config_path } from "../router/config.path";

export default function PageNotFound(props) {
    const navigate = useNavigate();

    return (
        <Box>
            <Container>
                <Box
                    sx={{
                        py: 5,
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Sorry, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                        sure to check your spelling.
                    </Typography>

                    <Box
                        component="img"
                        src="/assets/illustrations/illustration_404.svg"
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />

                    <Button onClick={() => navigate(config_path.home)} size="large" variant="contained">
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}