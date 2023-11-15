import React from "react";
import Modal from "../../components/Modal";
import { Grid, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Form, Field } from "react-final-form";
import validators from "../../utils/validators";
import { SelectCustom } from "../../components/FormElements";
import { roleTypes } from "../../fakeData";
import { mappingRoleTypes } from "../../utils/utils";

export default function RolesView(props) {
    const { t } = useTranslation();
    const { user } = props;
    console.log("AAA RolesView props: ", props)
    if(roleTypes && roleTypes.length > 0){
        roleTypes.forEach(item => {
            item.label = mappingRoleTypes(item.value, t);
        });
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} message={props.message} maxWidth={'sm'} enableCloseButton title={user && user.name ? t('btn_roles') + " - " + user.name : t('btn_roles')}>
            <Grid item xs={12}>
                <Typography variant="subtitle2">{t('email')}: {user && user.email ? user.email : null}</Typography>
                <Form
                    onSubmit={props.onSubmit}
                    render={({ handleSubmit }) => {
                        return (
                            <Grid item xs={12} container justifyContent={'center'}>
                                <Grid item xs={12} marginY={1}>
                                    <Field
                                        name="role_type"
                                        label={t('role_type')}
                                        component={SelectCustom}
                                        placeholder={" "}
                                        isEdit={true}
                                        isValid={true}
                                        selectData={roleTypes}
                                        onCustomChange={(e) => props.onChangeRoleType(e.target.value)}
                                        validate={validators.composeValidators(validators.required)}
                                        valueSelect={user && user.role_type ? user.role_type : props.roleType}
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

