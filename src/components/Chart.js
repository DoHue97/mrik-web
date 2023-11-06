import React from 'react';
import ApexChart from 'react-apexcharts';
import PropTypes from "prop-types";
import { alpha, styled } from '@mui/material/styles';
import { Card, CardHeader, Box, useTheme } from '@mui/material';
import merge from 'lodash/merge';

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

function Chart(props) {
    const { title, subheader, series, options, type, cardSx } = props;
    const theme = useTheme();
    console.log("AAA Chart theme: ", theme)

    const Chart = styled(ApexChart)(({ theme }) => ({
        '& .apexcharts-canvas': {
            // Tooltip
            '& .apexcharts-tooltip': {
                backgroundColor: alpha(theme.palette.background.default, 0.8),
                backdropFilter: 'blur(6px)',
                boxShadow: theme.palette.background.default,
                color: theme.palette.text.primary,
                boxShadow: theme.customShadows.dropdown,
                borderRadius: theme.shape.borderRadius * 1.25,
                '&.apexcharts-theme-light': {
                    borderColor: 'transparent',
                    backgroundColor: theme.palette.background.default,
                },
            },
            '& .apexcharts-xaxistooltip': {
                backgroundColor: theme.palette.background.default,
                borderColor: 'transparent',
                color: theme.palette.text.primary,
                boxShadow: theme.customShadows.dropdown,
                borderRadius: theme.shape.borderRadius * 1.25,
                '&:before': {
                    borderBottomColor: alpha(theme.palette.grey[500], 0.24),
                },
                '&:after': {
                    borderBottomColor: alpha(theme.palette.background.default, 0.8),
                },
            },
            '& .apexcharts-tooltip-title': {
                textAlign: 'center',
                fontWeight: theme.typography.fontWeightBold,
                backgroundColor: alpha(theme.palette.grey[500], 0.08),
                backdropFilter: 'blur(6px)',
                color: theme.palette.text[theme.palette.mode === 'light' ? 'secondary' : 'primary'],
            },
            // LEGEND
            '& .apexcharts-legend': {
                padding: 0,
            },
            '& .apexcharts-legend-series': {
                display: 'inline-flex !important',
                alignItems: 'center',
            },
            '& .apexcharts-legend-marker': {
                marginRight: 8,
            },
            '& .apexcharts-legend-text': {
                lineHeight: '18px',
                textTransform: 'capitalize',
            },
        },
    }));

    const PieChart = styled(Chart)(({ theme }) => ({
        height: CHART_HEIGHT,
        '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
            height: `100% !important`,
        },
        '& .apexcharts-legend': {
            height: LEGEND_HEIGHT,
            borderTop: `dashed 1px ${theme.palette.divider}`,
            top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
        },
    }));


    const LABEL_TOTAL = {
        show: true,
        label: 'Total',
        color: theme.palette.text.secondary,
        fontSize: theme.typography.subtitle2.fontSize,
        fontWeight: theme.typography.subtitle2.fontWeight,
        lineHeight: theme.typography.subtitle2.lineHeight,
    };

    const LABEL_VALUE = {
        offsetY: 8,
        color: theme.palette.text.primary,
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.h3.fontWeight,
        lineHeight: theme.typography.h3.lineHeight,
    };

    const baseOptions = {
        // Colors
        colors: [
            theme.palette.primary.main,
            theme.palette.warning.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.success.main,
            theme.palette.warning.dark,
            theme.palette.success.darker,
            theme.palette.info.dark,
            theme.palette.info.darker,
        ],
        // Chart
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            // animations: { enabled: false },
            foreColor: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
        },
        // States
        states: {
            hover: {
                filter: {
                    type: 'lighten',
                    value: 0.04,
                },
            },
            active: {
                filter: {
                    type: 'darken',
                    value: 0.88,
                },
            },
        },
        // Fill
        fill: {
            opacity: 1,
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 100],
            },
        },
        // Datalabels
        dataLabels: {
            enabled: false,
        },
        // Stroke
        stroke: {
            width: 3,
            curve: 'smooth',
            lineCap: 'round',
        },
        // Grid
        grid: {
            strokeDashArray: 3,
            borderColor: theme.palette.divider,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        // Xaxis
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        // Markers
        markers: {
            size: 0,
            strokeColors: theme.palette.background.paper,
        },
        // Tooltip
        tooltip: {
            theme: false,
            x: {
                show: true,
            },
        },
        // Legend
        legend: {
            show: true,
            fontSize: 13,
            position: 'top',
            horizontalAlign: 'right',
            markers: {
                radius: 12,
            },
            fontWeight: 500,
            itemMargin: {
                horizontal: 8,
            },
            labels: {
                colors: theme.palette.text.primary,
            },
        },
        // plotOptions
        plotOptions: {
            // Bar
            bar: {
                borderRadius: 3,
                columnWidth: '28%',
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
            },

            // Pie + Donut
            pie: {
                donut: {
                    labels: {
                        show: true,
                        value: LABEL_VALUE,
                        total: LABEL_TOTAL,
                    },
                },
            },

            // Radialbar
            radialBar: {
                track: {
                    strokeWidth: '100%',
                    background: alpha(theme.palette.grey[500], 0.16),
                },
                dataLabels: {
                    value: LABEL_VALUE,
                    total: LABEL_TOTAL,
                },
            },

            // Radar
            radar: {
                polygons: {
                    fill: { colors: ['transparent'] },
                    strokeColors: theme.palette.divider,
                    connectorColors: theme.palette.divider,
                },
            },

            // polarArea
            polarArea: {
                rings: {
                    strokeColor: theme.palette.divider,
                },
                spokes: {
                    connectorColors: theme.palette.divider,
                },
            },
        },
        // Responsive
        responsive: [
            {
                // sm
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    plotOptions: { bar: { columnWidth: '40%' } },
                },
            },
            {
                // md
                breakpoint: theme.breakpoints.values.md,
                options: {
                    plotOptions: { bar: { columnWidth: '32%' } },
                },
            },
        ],
    };

    return (
        <>
            <Card sx={cardSx}>
                <CardHeader title={title} subheader={subheader} />
                {type == 'pie' ?
                    <PieChart
                        dir="ltr"
                        type={"pie"}
                        series={series}
                        options={merge(baseOptions, options)}
                        width="100%"
                        height={280}
                    />
                    : <Box sx={{ p: 3, pb: 1 }}>
                        <Chart
                            dir="ltr"
                            type={type ? type : "line"}
                            series={series}
                            options={merge(baseOptions, options)}
                            width="100%"
                            height={364}
                        />
                    </Box>
                }
            </Card>
        </>
    )
}

Chart.propTypes = {
    labels: PropTypes.array,
    colors: PropTypes.array,
    series: PropTypes.array,
    options: PropTypes.object,
    type: PropTypes.string,
    cardSx: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Chart;