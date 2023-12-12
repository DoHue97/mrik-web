import { Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "../../components/Container";

export default function InventoryAddView(props){

    return(
        <ContainerCustom showProcessing={props.showProcessing} message={props.message} confirm={props.confirm}>
            <Typography>InventoryAddView</Typography>
        </ContainerCustom>
    )
}