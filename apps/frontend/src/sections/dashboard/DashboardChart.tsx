
"use client";

/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

import dynamic from "next/dynamic";
import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { RiArrowDownSFill, RiArrowRightWideFill, RiArrowUpSFill } from "react-icons/ri";
import { column } from "stylis";
import { blue } from "@mui/material/colors"; // Import Material UI blue color

// Dynamically import ReactApexChart to disable SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define types for the props used in ApexChart
interface ApexChartProps {
  type: "area" | "donut";
  series: any[];
  options: any;
}

// ApexChart component for rendering different chart types
const ApexChart: React.FC<ApexChartProps> = ({ type, series, options }) => <ReactApexChart options={options} series={series} type={type} width={280} />;

interface Item {
  type: "Critical" | "High" | "Medium" | "Low";
  previousWeek: number;
  value: number;
}

export const DashboardChart: React.FC = () => {
  const items: Item[] = [
    {
      type: "Critical",
      previousWeek: 12,
      value: 40,
    },
    {
      type: "High",
      previousWeek: 18,
      value: 52,
    },
    {
      type: "Medium",
      previousWeek: 24,
      value: 18,
    },
    {
      type: "Low",
      previousWeek: 8,
      value: 10,
    },
  ];

  const pieChartData = {
    series: [40, 25, 20, 10, 5], // Data for pie chart
    options: {
      chart: {
        width: 80,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: true, // Enable data labels
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          colors: ["#fff"],
        },
        formatter: (val: number) => `${Math.round(val)}%`, // Show percentage values
      },
      fill: {
        type: "gradient",
      },
      legend: {
        show: false, // Hide the default legend
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  // Categories for display as labels on the right side
  const categories = [
    { name: "Business Logic" },
    { name: "Access Control" },
    { name: "HTTP Headers" },
    { name: "XSS" },
    { name: "Others" },
  ];





  

  return (
    <Container>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Paper
              style={{
                display: "flex",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                flexDirection: "column",
                height: "100%",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                sx={{ display: "flex", gap: "5px", justifyItems: "", padding: "10px" }}
              >
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    color:
                      item.type === "Critical"
                        ? "error.main"
                        : item.type === "Low"
                          ? "success.main"
                          : item.type === "Medium" || "High"
                            ? "warning.main"
                            : "text.primary",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.type}
                </Typography>{" "}
                Vulnerabilities
              </Typography>
              <Typography
                variant="body2"
                color={item.previousWeek >= 0 ? "success.main" : "error.main"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {item.previousWeek >= 0 ? (
                  <RiArrowUpSFill fontSize="small" style={{ marginRight: 4 }} />
                ) : (
                  <RiArrowDownSFill fontSize="small" style={{ marginRight: 4 }} />
                )}
                {Math.abs(item.previousWeek)}% from previous week
              </Typography>

              <Container component="section">
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="h3"
                      color={item.type === "Critical"
                        ? "error.main"
                        : item.type === "Low"
                          ? "success.main"
                          : item.type === "Medium" || "High"
                            ? "warning.main"
                            : "text.primary"
                      }
                    >
                      {item.value}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ overflow: "hidden" }}>
                    <Paper>
                      {/* Add ApexChart here for the line chart */}
                      <ApexChart
                        type="area"
                        series={[{ name: "series1", data: [31, 40, 28, 59] }]}
                        options={{
                          chart: {
                            height: 350,
                            type: "area",
                            toolbar: { show: false },
                            zoom: { enabled: true },
                          },
                          dataLabels: { enabled: false },
                          stroke: { curve: "smooth", width: 2 },
                          xaxis: {
                            categories: [
                              "2018-09-19T00:00:00.000Z",
                              "2018-09-19T01:30:00.000Z",
                              "2018-09-19T02:30:00.000Z",
                              "2018-09-19T03:30:00.000Z",
                            ],
                            labels: { show: false },
                          },
                          yaxis: { labels: { show: false } },
                          tooltip: { enabled: false },
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pie Chart Section */}
      <Grid container spacing={1} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} md={5} >
          <Paper elevation={3} style={{ display: "flex",height: "260px" , flexDirection: "column", padding: "10px", textAlign: "center" }}>
            {/* Add Pie Chart here */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", justifyItems: "center" }}>


              <Typography fontSize="bold" variant="h6" component="h3">

                Finding Categories
              </Typography>

              <Button sx={{ color: blue[500] }} > View All Categories <RiArrowRightWideFill fontSize="small" /></Button>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <ApexChart
                type="donut"
                series={pieChartData.series}
                options={pieChartData.options}

              />
              <ul>

                {categories.map((category, index) => (
                  <li key={index} style={{ whiteSpace: "nowrap", marginLeft: "-20px", textAlign: "start", fontWeight: "bold", fontSize: "12px" }}>
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: "10px",height: "260px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h6" component="h6" gutterBottom >
                Total Targeted Assets
              </Typography>
              <Button
                size="small"
                style={{
                  color: blue[500]
                }}
                endIcon={<RiArrowRightWideFill />}
              >
                View All
              </Button>
            </div>
            <div>
              {[
                { label: "Web Application Assets", value: 8 },
                { label: "API Endpoint Assets", value: 6 },
                { label: "External Networks IPs Assets", value: 4 },
                { label: "Internal Networks IPs Assets", value: 1 },
              ].map((asset, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: index !== 3 ? "1px solid #eee" : "none",
                  }}
                >
                  <Typography variant="body1">{asset.label}</Typography>
                  <Typography variant="h6" sx={{fontSize: "10px"}} color={blue[500]}>
                    {asset.value}
                  </Typography>
                </div>
              ))}
            </div>

          </Paper>
        </Grid>
        {/* Overall Risks */}

<Grid item xs={12} md={3}>
  <Paper
    elevation={3}
    style={{
      padding: "16px",
      textAlign: "center",
      height: "260px" 
    }}
  >
    <Typography variant="h6" gutterBottom>
      Overall Risks
    </Typography>

    {/* Radial Bar Chart */}
    <div style={{ marginTop: "20px" }}>
      <ReactApexChart
        options={{
          chart: {
            height: 300,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              hollow: {
                size: "60%",
              },
              track: {
                background: "#e7e7e7",
                strokeWidth: "100%",
              },
              dataLabels: {
                name: {
                  show: true,
                  offsetY: 20,
                  color: "#888",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
                value: {
                  show: true,
                  fontSize: "32px",
                  fontWeight: "bold",
                  offsetY: -10,
                  formatter (val) {
                    return val.toFixed(0);
                  },
                },
              },
            },
          },
          fill: {
            colors: ["#FBC02D"], // Yellow color to match your screenshot
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["High"], // Label below the value
        }}
        series={[3]} // Example value: 75%
        type="radialBar"
        height={300}
      />
    </div>
  </Paper>
</Grid>

      </Grid>
    </Container>
  );
};
