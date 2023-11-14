import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Modal from '../../components/Modal';

export default function AddEditUserView(props){
    const { t } = useTranslation();
    const { mode, user } = props;

    return(
        <Modal isOpen={props.isOpen} onClose={props.onClose} title={mode == 'edit' ? t('edit_user') : t('add_user')}>
            <Grid item xs={12}>
                <Typography>AddEditUserView</Typography>
            </Grid>
        </Modal>
    )
}