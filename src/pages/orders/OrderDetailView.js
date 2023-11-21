import React from "react";
import ContainerCustom from "../../components/Container";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { config_path } from "../../router/config.path";

export default function OrderDetailView(props){
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
    return(
        <ContainerCustom showProcessing={props.showProcessing} message={props.message} showBreadCrumbs breadcrumbs={breadcrumbs}>

        </ContainerCustom>
    )
}