import { Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { TextAreaCustom, TextFieldCustom } from "../../components/FormElements";
import Modal from "../../components/Modal";
import validators from "../../utils/validators";

export default function PriceAddEditView(props) {
    const { t } = useTranslation();
    const { price, mode } = props;

    let title = mode == 'edit' && price ? t('btn_edit') + " - " + price.code : t('btn_add')
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} message={props.message} title={title} enableCloseButton>
                <Form
                    onSubmit={props.onSubmit}
                    initialValues={{ ...price }}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12}>
                                <Grid item xs={12} my={1}>
                                    <Field
                                        name="code"
                                        label={t('price_code')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_price_code')}
                                        isEdit={mode == 'add'}
                                        isValid={true}
                                        validate={validators.composeValidators(validators.required, validators.mustBeNumberRequired)}
                                    />
                                </Grid>
                                <Grid item xs={12} my={1}>
                                    <Field
                                        name="value"
                                        label={t('price')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_price')}
                                        isEdit={true}
                                        isValid={true}
                                        validate={validators.composeValidators(validators.required, validators.mustBeNumberRequired)}
                                    />
                                </Grid>
                                <Grid item xs={12} my={1}>
                                    <Field
                                        name="description"
                                        label={t('price_desc')}
                                        component={TextAreaCustom}
                                        isEdit={true}
                                    />
                                </Grid>
                                <Grid item xs={12} mt={4} container justifyContent={'center'}>
                                    <Button fullWidth variant='contained' onClick={handleSubmit} >{t('btn_save')}</Button>
                                </Grid>
                            </Grid>
                        )
                    }}
                />
            </Modal>
        </>
    )
}