import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import SetupApp from './SetupApp';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from "react-i18next";
import i18n from './translations/i18n';
import { BrowserRouter as Router } from 'react-router-dom';
import 'simplebar-react/dist/simplebar.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Router basename={''}>
                <SetupApp />
            </Router>
        </I18nextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
