import { Grid, Typography, Button, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Modal from '../../components/Modal';
import { Form, Field } from "react-final-form";
import validators from "../../utils/validators";
import { TextFieldCustom } from "../../components/FormElements";

export default function AddEditUserView(props) {
    const { t } = useTranslation();
    const { mode, user, onSubmit } = props;
    const theme = useTheme();

    console.log("AAA AddEditUserView props: ", props)
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} enableCloseButton title={mode == 'edit' ? t('edit_user') : t('add_user')} message={props.message}>
            <Grid item xs={12}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12} container justifyContent={'center'}>
                                <Grid item xs={12} marginY={1}>
                                    <Field
                                        name="first_name"
                                        label={t('first_name')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_first_name')}
                                        isEdit={true}
                                        isValid={true}
                                        validate={validators.composeValidators(validators.required)}
                                        defaultValue={user && user.first_name ? user.first_name : null}
                                    />
                                </Grid>
                                <Grid item xs={12} marginY={1}>
                                    <Field
                                        name="last_name"
                                        label={t('last_name')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_last_name')}
                                        isEdit={true}
                                        isValid={true}
                                        validate={validators.composeValidators(validators.required)}
                                        defaultValue={user && user.last_name ? user.last_name : null}
                                    />
                                </Grid>
                                <Grid item xs={12} marginY={1}>
                                    <Field
                                        name="email"
                                        label={t('email')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_email')}
                                        isEdit={true}
                                        isValid={true}
                                        validate={validators.composeValidators(validators.required, validators.validEmail)}
                                        defaultValue={user && user.email ? user.email : null}
                                    />
                                </Grid>
                                <Grid item xs={12} marginY={3}>
                                    <Button id='addEditUser/btnSubmit' size="large" fullWidth variant='contained' onClick={handleSubmit} type='submit'>{t('btn_submit')}</Button>
                                </Grid>
                            </Grid>
                        )
                    }}
                />
            </Grid>
        </Modal>
    )
}