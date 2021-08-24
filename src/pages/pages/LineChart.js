import React from "react";
import styled, { withTheme } from "styled-components/macro";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { fade } from "@material-ui/core/styles/colorManipulator";

import { Line } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 250px;
`;

function LineChart({ theme }) {
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    return {
      labels: [
        "18th Aug",
        "19th Aug",
        "20th Aug",
        "21st Aug",
        "22nd Aug",
        "23rd Aug",
        "24th Aug",
      ],
      datasets: [
        {
          label: "Kitchen",
          fill: true,
          backgroundColor: gradient,
          borderColor: "#90EE90",
          data: [0.09, 0.1, 0.08, 0.14, 0.07, 0.46, 0.49],
        },
        {
          label: "Main Floor",
          fill: true,
          backgroundColor: gradient,
          borderColor: "#ADD8E6",
          data: [0.11, 1.41, 0.73, 2.03, 0.98, 4.83, 1.12],
        },
        {
          label: "Canteen",
          fill: true,
          backgroundColor: gradient,
          borderColor: "#FF7722",
          data: [0.06, 0.53, 0.34, 0.8, 0.43, 0.53, 3.41],
        },
        {
          label: "28 Day Avg",
          fill: true,
          backgroundColor: "transparent",
          borderColor: theme.palette.grey[500],
          borderDash: [4, 4],
          data: [1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6],
        },
        {
          label: "28 Day Avg",
          fill: true,
          backgroundColor: "transparent",
          borderColor: theme.palette.grey[500],
          borderDash: [4, 4],
          data: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.0)",
          },
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500,
            fontColor: theme.palette.text.secondary,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0.0375)",
            fontColor: "#fff",
          },
        },
      ],
    },
  };

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Total Waste By Area"
      />
      <CardContent>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}
export default withTheme(LineChart);
