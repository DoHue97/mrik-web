import React, { useState } from 'react';
import Container from '../../components/Container';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Field, Form } from 'react-final-form';
import { TextAreaCustom, TextFieldCustom } from '../../components/FormElements';
import { useTranslation } from 'react-i18next';
import CheckEditor from '../../components/CheckEditor';
import validators from '../../utils/validators';
import { alpha } from '@material-ui/core';
import UploadFile from '../../components/UploadFile';
import Modal from '../../components/Modal';
import { DeleteIcon } from '../../components/Icons';
import { config_path } from '../../router/config.path';

export default function AddEditProductView(props) {
    const { t } = useTranslation();
    const theme = useTheme();
    const [showUploadFile, setShowUploadFile] = useState(false);
    const { product, file, mode } = props;
    console.log("AAAA AddEditProductView props: ", props)

    let breadcrumbs = [
        {
            name: t('products'),
            link: config_path.products,
        },
        {
            name: (mode == 'edit' || (product && product.name)) ? product.name : t('add_offer'),
        }
    ]
    return (
        <Container showProcessing={props.showProcessing} message={props.message} showBreadCrumbs={true} breadcrumbs={breadcrumbs}>
            <Grid item xs={12}>
                <Form
                    onSubmit={props.onSubmit}
                    initialValues={{ ...product }}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12}>
                                <Grid item xs={12} marginY={2} container alignItems={'center'} spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <Grid item xs={12} my={1}>
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
                                        <Grid item xs={12} my={1}>
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
                                        <Grid item xs={12} my={1}>
                                            <Field
                                                name="description"
                                                label={t('product_description')}
                                                component={TextAreaCustom}
                                                isEdit={true}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Box width={'100%'} position={'relative'} border={'1px solid'}
                                            borderColor={alpha(theme.palette.grey[500], 0.24)}
                                            borderRadius={2} sx={{ cursor: 'pointer'}} maxHeight={300} overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'center'}
                                        >
                                            <img src={file && file.uri ? file.uri : '/assets/images/no-image.jpg'} alt='No image' style={{ borderRadius: 16 }} onClick={() => setShowUploadFile(true)} />
                                            {file && file.uri && <Box position={'absolute'} right={0} top={0} onClick={() => props.setFile(null)}>
                                                <Box sx={{ cursor: 'pointer' }} display={'flex'} my={0.5} mx={0.5} justifyContent={'center'} alignItems='center'
                                                    width={32} height={32} borderRadius={1}
                                                    border={'1px solid'}
                                                    borderColor={alpha(theme.palette.grey[500], 0.24)}
                                                    backgroundColor={theme.palette.background.paper}
                                                >
                                                    <DeleteIcon />
                                                </Box>
                                            </Box>}
                                        </Box>
                                    </Grid>
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
            {showUploadFile && <UploadFile
                isOpen={showUploadFile}
                onClose={() => setShowUploadFile(false)}
                onUploadFile={props.onUploadFile}
            />}
        </Container>
    )
}