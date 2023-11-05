import React from "react";
import Chart from "../../components/Chart";
import { fNumber } from "../../utils/utils";
import { useTheme } from "@mui/material";

export default function PieChart(props) {
    const theme = useTheme();
    let series = [
        { label: 'America', value: 4344 },
        { label: 'Asia', value: 5435 },
        { label: 'Europe', value: 1443 },
        { label: 'Africa', value: 4443 },
    ]
    let chartSeries = series.map((i) => i.value);
  
    let chartOptions = {
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        labels: series.map((i) => i.label),
        stroke: {
            colors: [theme.palette.background.paper],
        },
        legend: {
            floating: true,
            position: 'bottom',
            horizontalAlign: 'center',
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (value) => fNumber(value),
                title: {
                    formatter: (seriesName) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: false,
                    },
                },
            },
        },
    }

    return (
        <Chart
            title="Current Visits"
            options={chartOptions}
            series={chartSeries}
            type={'pie'}
            cardSx={{
                height: '100%'
            }}
        />
    )
}