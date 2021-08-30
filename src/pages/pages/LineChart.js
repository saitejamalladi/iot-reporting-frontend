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
import { useSelector } from "react-redux";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 250px;
`;

function getDynamicColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
function LineChart({ theme }) {
  const scaleReducer = useSelector((state) => state.scaleReducer);
  const reportData = scaleReducer.reportData;
  const data = (canvas) => {
    let days = [...new Array(7)].map((i, index) =>
      moment()
        .subtract(7 - index - 1, "days")
        .format("YYYY-MM-DD")
    );
    let dailyData = reportData ? reportData.daily_data : [];
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
        data: days.map((day) => {
          let currentData = dailyData.find(
            (data) => data.location === location && data.report_date === day
          );
          return currentData ? currentData.total_weight : 0;
        }),
      };
    });
    return {
      labels: days.map((day) => moment(day).format("DD-MM-YYYY")),
      datasets: tempData,
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
