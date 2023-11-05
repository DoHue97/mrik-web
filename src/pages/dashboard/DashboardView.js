import { Grid, Stack, Typography, Box, Card, Container } from "@mui/material";
import React from "react";
import ContainerCustom from '../../components/Container';
import { useTranslation } from "react-i18next";
import { fShortenNumber } from "../../utils/utils";
import Chart from "../../components/Chart";
import ChartLine from "./ChartLine";
import PieChart from "./PieChart";

export default function DashboardView(props) {
    const { t } = useTranslation();



    return (
        <ContainerCustom message={props.message} showSideBar={true} showHeader={true} showProcessing={props.showProcessing}>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>{t('welcome')}</Typography>
                <Grid item container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Weekly Sales"
                            total={714000}
                            color="success"
                            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="New Users"
                            total={1352831}
                            color="info"
                            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Item Orders"
                            total={1723315}
                            color="warning"
                            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Bug Reports"
                            total={234}
                            color="error"
                            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <ChartLine />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <PieChart />
                    </Grid>
                </Grid>
            </Container>
        </ContainerCustom>
    )
}

function AppWidgetSummary(props) {
    const { title, total, color, icon, sx, other } = props;
    return (
        <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
                px: 3,
                py: 5,
                borderRadius: 2,
                ...sx,
            }}
            {...other}
        >
            {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}
            <Stack spacing={0.5}>
                <Typography variant="h4">{fShortenNumber(total)}</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                    {title}
                </Typography>
            </Stack>
        </Card>
    )
}