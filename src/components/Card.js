import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Button, Card, Grid, Typography, useTheme } from "@mui/material";

function CardComponent(props) {
    const { palette } = useTheme();
    const { children, header, bg, noBorder, marginTop, marginBottom, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, enableBgImage } = props;    
    return (
        <Card sx={{
            border: noBorder ? 'none' : undefined,
            marginTop: marginTop ? marginTop : undefined,
            marginBottom: marginBottom ? marginBottom : undefined,
            paddingX: paddingX ? paddingX : undefined,
            paddingY: paddingY ? paddingY : undefined,
            paddingTop: paddingTop ? paddingTop : undefined,
            paddingBottom: paddingBottom ? paddingBottom : undefined,
            paddingLeft: paddingLeft ? paddingLeft : undefined,
            paddingRight: paddingRight ? paddingRight : undefined,
            backgroundColor: bg ? bg : undefined,
            backgroundImage: enableBgImage ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))' : 'none',
        }}>
            {header && <Grid item xs={12} container alignItems={'center'} marginBottom={1}>
                {header.title ? <Grid item xs={9}>
                    <Typography textTransform={header.textTransform ? header.textTransform: 'uppercase'} variant={'caption'}>{header.title}</Typography>
                    {header.subTitle && <Typography variant="subtitle2">{header.subTitle}</Typography>}
                </Grid> : undefined}
                {header.action ? <Grid container item xs={3} justifyContent={'flex-end'}>{header.action}</Grid> : undefined}
            </Grid>}
            {children}
        </Card>
    )
}

CardComponent.propTypes = {
    icon: PropTypes.object,
    noBorder: PropTypes.bool,
    marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    header: PropTypes.shape({
        title: PropTypes.string,
        action: PropTypes.element,
        textTransform: PropTypes.string,
        subTitle: PropTypes.string,
    }),
    bg: PropTypes.string,
    enableBgImage: PropTypes.bool,
}

export default CardComponent;