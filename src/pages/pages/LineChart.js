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
import moment from "moment";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 250px;
`;

let resData = {
  daily_data: [
    {
      location: "Canteen",
      report_date: "2021-08-21",
      total_weight: 0.69,
    },
    {
      location: "kitchen",
      report_date: "2021-08-21",
      total_weight: 0.48,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-21",
      total_weight: 0.21,
    },
    {
      location: "kitchen",
      report_date: "2021-08-22",
      total_weight: 0.29,
    },
    {
      location: "Canteen",
      report_date: "2021-08-22",
      total_weight: 1.53,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-22",
      total_weight: 0.23,
    },
    {
      location: "Canteen",
      report_date: "2021-08-23",
      total_weight: 0.85,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-23",
      total_weight: 0.21,
    },
    {
      location: "kitchen",
      report_date: "2021-08-23",
      total_weight: 0.27,
    },
    {
      location: "kitchen",
      report_date: "2021-08-24",
      total_weight: 0.13,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-24",
      total_weight: 0.42,
    },
    {
      location: "Canteen",
      report_date: "2021-08-24",
      total_weight: 0.32,
    },
    {
      location: "Canteen",
      report_date: "2021-08-25",
      total_weight: 1.44,
    },
    {
      location: "kitchen",
      report_date: "2021-08-25",
      total_weight: 0.02,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-25",
      total_weight: 0.35,
    },
    {
      location: "Canteen",
      report_date: "2021-08-26",
      total_weight: 0.93,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-26",
      total_weight: 0.3,
    },
    {
      location: "kitchen",
      report_date: "2021-08-26",
      total_weight: 0.14,
    },
    {
      location: "Canteen",
      report_date: "2021-08-27",
      total_weight: 0.93,
    },
    {
      location: "Main Floor",
      report_date: "2021-08-27",
      total_weight: 0.08,
    },
    {
      location: "kitchen",
      report_date: "2021-08-27",
      total_weight: 0.23,
    },
  ],
  day_28_avg: [
    {
      location: "Canteen",
      average_weight: 0.088263889,
    },
    {
      location: "kitchen",
      average_weight: 0.081904762,
    },
    {
      location: "Main Floor",
      average_weight: 0.08032967,
    },
  ],
  day_7_avg: [
    {
      location: "Canteen",
      average_weight: 0.083625,
    },
    {
      location: "kitchen",
      average_weight: 0.074285714,
    },
    {
      location: "Main Floor",
      average_weight: 0.081818182,
    },
  ],
};

function getDynamicColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
function LineChart({ theme }) {
  const data = (canvas) => {
    let days = [...new Array(7)].map((i, index) =>
      moment()
        .subtract(7 - index, "days")
        .format("YYYY-MM-DD")
    );
    let dailyData = resData.daily_data;
    let locations = dailyData.map((data) => data.location);
    locations = [...new Set(locations)];
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    let tempData = locations.map((location) => {
      return {
        label: location,
        fill: true,
        backgroundColor: gradient,
        borderColor: getDynamicColor(),
        data: days.map(
          (day) =>
            dailyData.find(
              (data) => data.location === location && data.report_date === day
            ).total_weight
        ),
      };
    });
    return {
      labels: days.map((day) => moment(day).format("DD-MM-YYYY")),
      datasets: [
        ...tempData,
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
