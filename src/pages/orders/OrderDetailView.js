import React from "react";
import ContainerCustom from "../../components/Container";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { config_path } from "../../router/config.path";
import { Grid, Stack, Typography } from "@mui/material";

export default function OrderDetailView(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { order } = props;

    let breadcrumbs = [
        {
            name: t('orders'),
            link: config_path.orders,
        },
        {
            name: order && order.number ? order.number : undefined
        }
    ]
    return (
        <ContainerCustom showProcessing={props.showProcessing} message={props.message} showBreadCrumbs breadcrumbs={breadcrumbs}>
            <Grid item xs={12}>
                {order && <Grid item xs={12}>
                    <Stack direction={'row'} alignItems='center' spacing={2}>
                        <Stack>
                            <Typography variant="body2">{t('number')}: </Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="body2">{order.number}</Typography>
                        </Stack>
                    </Stack>
                </Grid>}
            </Grid>
        </ContainerCustom>
    )
}