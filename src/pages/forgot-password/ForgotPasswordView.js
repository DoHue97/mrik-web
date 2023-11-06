import { Grid, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import ContainerCustom from '../../components/Container';
import validators from "../../utils/validators";
import { TextFieldCustom } from "../../components/FormElements";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { config_path } from "../../router/config.path";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordView(props){
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();

    return(
        <ContainerCustom showProcessing={props.showProcessing} message={props.message} hideHeader={true} hideSideBar={true}>
            <Grid item xs={12} container justifyContent={'center'}>
                <Grid item xs={12} sm={6} md={4} sx={{
                    background: theme.palette.background.paper,
                    margin: 5,
                    px: 4,
                    py: 2,
                    borderRadius: 2
                }}>
                    <Typography variant="h4">{t('forgot_password')}</Typography>
                    <Typography variant="body2">{t('forgot_password_desc')}</Typography>
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
                                            isValid={true}
                                            validate={validators.composeValidators(validators.required, validators.validEmail)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} container justifyContent={'flex-end'} mt={1}>
                                        <Button id='forgotPassword/bntLogin' onClick={() => navigate(config_path.login)} variant='text'>{t('btn_login')}</Button>
                                    </Grid>
                                    <Grid item xs={12} marginY={3}>
                                        <Button id='forgotPassword/btnSubmit' size="large" fullWidth variant='contained' onClick={handleSubmit} type='submit'>{t('btn_submit')}</Button>
                                    </Grid>
                                </Grid>
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </ContainerCustom>
    )
}