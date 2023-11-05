import { Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from 'react-final-form'
import { TextFieldCustom } from "../../components/FormElements";
import { EyeIcon, EyeOffIcon } from "../../components/Icons";
import validators from "../../utils/validators";
import { config_path } from "../../router/config.path";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginView(props) {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Grid item xs={12} container justifyContent={'center'}>
            <Grid item xs={12} sm={6} md={4} sx={{
                background: theme.palette.background.paper,
                margin: 5,
                px: 4,
                py: 2,
                borderRadius: 2
            }}>
                <Typography variant="h4">{t('sign_in_desc')}</Typography>
                <Form
                    onSubmit={props.onSubmit}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12} container justifyContent={'center'}>
                                <Grid item xs={12} marginY={2}>
                                    <Field
                                        name="email"
                                        label={t('email')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_email')}
                                        isEdit={true}
                                        validate={validators.composeValidators(validators.required, validators.validEmail)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="password"
                                        label={t('password')}
                                        component={TextFieldCustom}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={t('enter_password')}
                                        isEdit={true}
                                        endAdornment={<Grid item paddingTop={1} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                        </Grid>}
                                        validate={validators.required}
                                    />
                                </Grid>
                                <Grid item xs={12} container justifyContent={'flex-end'} mt={1}>
                                    <Button id='loginEmail/bntForgotPassword' onClick={() => navigate(config_path.forgot_password)} variant='text'>{t('forgot_password')}</Button>
                                </Grid>
                                <Grid item xs={12} marginY={3}>
                                    <Button id='loginEmail/btnSubmit' size="large" fullWidth variant='contained' onClick={handleSubmit} type='submit'>{t('btn_submit')}</Button>
                                </Grid>
                            </Grid>
                        )
                    }}
                />
            </Grid>
        </Grid>
    )
}