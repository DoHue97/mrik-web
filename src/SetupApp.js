import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import Routers from "./router/Routers";
import theme from './theme';
import { cache } from './utils/cache';
import { connection, portal_config } from "./portal.config";
import { getData, initLanguage, logOut, saveDataIntoAsyncStore } from "./utils/common";
import services from './wsclients'
import { useNavigate } from "react-router-dom";

export default function SetupApp(props) {
    const [isReady, setIsReady] = useState(true);
    const [message, setMessage] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        setupApplication();
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

    const setupApplication = async () => {
        initLanguage();
        await services.setupChannel({
            storeKVFn: async (key, value) => {
                saveDataIntoAsyncStore(key, value);
            },
            getKVFn: async (key) => {
                return getData(key);
            },
            sessionInvalidCallback: () => {
                logOut(true, navigate);
            },
            apiKey: connection.apiKey,
            host: connection.server,
        })
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