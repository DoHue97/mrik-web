import React from "react";
import ContainerCustom from '../../components/Container'
import { Grid, Typography } from "@mui/material";

export default function ProductsView(props){
    
    return(        
        <ContainerCustom showProcessing={props.showProcessing} message={props.message}>
            <Grid item xs={12}>
                <Typography>Products View</Typography>
            </Grid>
        </ContainerCustom>
    )
}