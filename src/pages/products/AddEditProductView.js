import React from 'react';
import Container from '../../components/Container';
import { Button, Grid, Typography } from '@mui/material';
import { Field, Form } from 'react-final-form';
import { TextAreaCustom, TextFieldCustom } from '../../components/FormElements';
import { useTranslation } from 'react-i18next';
import CheckEditor from '../../components/CheckEditor';
import validators from '../../utils/validators';

export default function AddEditProductView(props) {
    const { t } = useTranslation();
    const { product } = props;
    console.log("AAAA AddEditProductView props: ", props)

    return (
        <Container showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12}>
                <Form
                    onSubmit={props.onSubmit}
                    initialValues={{ ...product }}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12}>
                                <Grid item xs={12} marginY={2} container spacing={1}>
                                    <Grid item xs={12} sm={4}>
                                        <Field
                                            name="code"
                                            label={t('product_code')}
                                            component={TextFieldCustom}
                                            placeholder={t('enter_product_code')}
                                            isEdit={true}
                                            isValid={true}
                                            validate={validators.composeValidators(validators.required)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Field
                                            name="name"
                                            label={t('product_name')}
                                            component={TextFieldCustom}
                                            placeholder={t('enter_product_name')}
                                            isEdit={true}
                                            isValid={true}
                                            validate={validators.composeValidators(validators.required)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} my={1}>
                                    <Field
                                        name="description"
                                        label={t('product_description')}
                                        component={TextAreaCustom}
                                        isEdit={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography mb={1} variant="body2">{t('product_content')}</Typography>
                                    <CheckEditor id="product_content" onChange={(data) => props.setContent(data)} />
                                </Grid>
                                <Grid item xs={12} my={2} container justifyContent={'center'}>
                                    <Button variant='contained' onClick={handleSubmit} >{t('btn_submit')}</Button>
                                </Grid>
                            </Grid>
                        )
                    }}
                />
            </Grid>
        </Container>
    )
}