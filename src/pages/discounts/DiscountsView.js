import { Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "../../components/Container";

export default function DiscountsView(props){

    return(
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Typography>DiscountsView</Typography>
        </ContainerCustom>
    )
}