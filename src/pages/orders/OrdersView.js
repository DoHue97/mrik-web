import { Grid, Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "../../components/Container";

export default function OrdersView(props){

    return(
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12}>
                <Typography>OrdersView</Typography>
            </Grid>
        </ContainerCustom>
    )
}