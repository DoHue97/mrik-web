import { Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { TextAreaCustom, TextFieldCustom, SelectCustom } from "../../components/FormElements";
import Modal from "../../components/Modal";
import validators from "../../utils/validators";

export default function RequestWithDrawalUpdateView(props) {
    const { t } = useTranslation();
    const { transaction } = props;
    const states = [
        {
            value: 'APPROVE',
            label: t('approve'),
        },
        {
            value: 'REJECT',
            label: t('reject'),
        },
        {
            value: 'TRANSFER',
            label: t('transfer'),
        },
    ]
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} message={props.message} title={t('btn_update')} enableCloseButton>
                <Form
                    onSubmit={props.onSubmit}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12}>
                                <Grid item xs={12} my={1}>
                                    <Field
                                        name="state"
                                        label={t('state')}
                                        component={SelectCustom}
                                        placeholder={''}
                                        isValid={true}
                                        isEdit={true}
                                        validate={validators.composeValidators(validators.required)}
                                        selectData={states}
                                    />
                                </Grid>
                                <Grid item xs={12} my={1}>
                                    <Field
                                        name="note"
                                        label={t('note')}
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