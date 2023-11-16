import React from "react";
import ContainerCustom from '../../components/Container';
import { Typography } from "@mui/material";

export default function RequestWithDrawalView(props){

    return(
        <ContainerCustom message={props.message} showProcessing={props.showProcessing}>
            <Typography>RequestWithDrawalView</Typography>
        </ContainerCustom>
    )
}