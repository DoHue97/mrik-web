import React from "react";
import Container from '../../components/Container';
import { Grid, Typography, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import { TextAreaCustom, TextFieldCustom } from "../../components/FormElements";
import validators from "../../utils/validators";
import { useTranslation } from "react-i18next";

export default function NewOfferView(props) {
    const { t } = useTranslation();

    return (
        <Container message={props.message} showProcessing={props.showProcessing}>
            <Typography>NewOfferView</Typography>
            <Grid item xs={12}>
                <Form
                    onSubmit={props.onSubmit}
                    render={({ handleSubmit }) => {
                        return(
                            <Grid item xs={12}>
                                <Grid item xs={12} marginY={2}>
                                    <Field
                                        name="name"
                                        label={t('offer_name')}
                                        component={TextFieldCustom}
                                        placeholder={t('enter_offer_name')}
                                        isEdit={true}
                                        isValid={true}
                                        validate={validators.composeValidators(validators.required)}
                                    />
                                </Grid>
                                <Grid item xs={12} marginY={2}>
                                    <Field
                                        name="description"
                                        label={t('offer_description')}
                                        component={TextAreaCustom}
                                        isEdit={true}
                                        rows={2}
                                        validate={validators.composeValidators(validators.required)}
                                    />
                                </Grid>
                                <Grid item xs={12} marginY={2}>
                                    <Field
                                        name="content"
                                        label={t('offer_content')}
                                        component={TextAreaCustom}
                                        isEdit={true}
                                        rows={2}
                                        validate={validators.composeValidators(validators.required)}
                                    />
                                </Grid>
                                <Grid item xs={12} marginY={3}>
                                    <Button id='newOffer/btnSubmit' size="large" fullWidth variant='contained' onClick={handleSubmit} type='submit'>{t('btn_submit')}</Button>
                                </Grid>
                            </Grid>
                        )
                    }}
                />
            </Grid>
        </Container>
    )
}