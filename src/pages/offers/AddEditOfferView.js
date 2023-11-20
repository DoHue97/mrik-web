import React from "react";
import Container from '../../components/Container';
import { Grid, Typography, Button } from "@mui/material";
import { Form, Field } from "react-final-form";
import { TextAreaCustom, TextFieldCustom } from "../../components/FormElements";
import validators from "../../utils/validators";
import { useTranslation } from "react-i18next";
import CheckEditor from "../../components/CheckEditor";
import { config_path } from "../../router/config.path";

export default function AddEditOfferView(props) {
    const { t } = useTranslation();
    const { offer, mode } = props;

    let breadcrumbs = [
        {
            name: t('offers'),
            link: config_path.offers,
        },
        {
            name: (mode == 'edit' || (offer && offer.name)) ? offer.name : t('add_offer'),
            // link:(mode == 'edit' || (offer && offer.name)) ? config_path.offer_edit : config_path.offer_add,
        }
    ]
    return (
        <Container message={props.message} showProcessing={props.showProcessing} showBreadCrumbs={true} breadcrumbs={breadcrumbs}>
            <Grid item xs={12}>
                <Form
                    onSubmit={props.onSubmit}
                    initialValues={{...offer}}
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
                                    {/* <Field
                                        name="content"
                                        label={t('offer_content')}
                                        component={TextAreaCustom}
                                        isEdit={true}
                                        rows={2}
                                        validate={validators.composeValidators(validators.required)}
                                    /> */}
                                    <Typography mb={1} variant="body2">{t('offer_content')}</Typography>
                                    <CheckEditor id="offer_content" onChange={(data) => props.setContent(data)} />
                                </Grid>
                                <Grid item xs={12} marginY={3}>
                                    <center><Button id='newOffer/btnSubmit' size="medium" variant='contained' onClick={handleSubmit} type='submit'>{t('btn_submit')}</Button></center>
                                </Grid>
                            </Grid>
                        )
                    }}
                />
            </Grid>
        </Container>
    )
}