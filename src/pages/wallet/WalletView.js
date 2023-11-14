import { Grid, Typography } from "@mui/material"
import React from "react"
import ContainerCustom from "../../components/Container"

export default function WalletView(props){

    return(
        <ContainerCustom message={props.message} showProcessing={props.showProcessing}>
            <Grid item xs={12}>
                <Typography>WalletView</Typography>
            </Grid>
        </ContainerCustom>
    )
}