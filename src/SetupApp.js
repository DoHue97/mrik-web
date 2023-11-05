import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import Routers from "./router/Routers";
import theme from './theme';
import { cache } from './utils/cache';
import { portal_config } from "./portal.config";
import { initLanguage } from "./utils/common";

export default function SetupApp(props) {
    const [isReady, setIsReady] = useState(true);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        loadCurrency()
        loadLanguages()
    }, [])

    const loadLanguages = () => {
        initLanguage();
        let listLanguages = portal_config.default_list_languages;
        cache.setLanguages(listLanguages);
    }

    const loadCurrency = () => {
        cache.setCurrency(portal_config.default_currency);
        cache.setCurrencyCode(portal_config.default_currency_code);
    }

    if (isReady) {
        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme()}>
                    <CssBaseline />
                    <Routers />
                </ThemeProvider>
            </StyledEngineProvider>
        )
    } else {
        return (
            <StyledEngineProvider injectFirst>
                <div style={{ display: 'flex', backgroundColor: 'white', justifyContent: 'center', textAlign: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <p>Loading...</p>
                </div>
            </StyledEngineProvider>
        )
    }
}