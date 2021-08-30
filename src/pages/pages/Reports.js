import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import LineChart from "./LineChart";

import {
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import moment from "moment";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

const TableCell = styled(MuiTableCell)`
  padding: 10px 10px;
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

function filterDayLocation(dailyData, currentDay, location) {
  return dailyData
    .filter(
      (data) => data.report_date === currentDay && data.location === location
    )
    .map((data) => data.total_weight);
}
function filterLocation(avgData, location) {
  let data = avgData.find((data) => data.location === location).average_weight;
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function EnhancedTable() {
  let days = [...new Array(7)].map((i, index) =>
    moment()
      .subtract(7 - index + 1, "days")
      .format("YYYY-MM-DD")
  );
  let dailyData = resData.daily_data;
  let day28Avg = resData.day_28_avg;
  let day7Avg = resData.day_7_avg;
  let locations = dailyData.map((data) => data.location);
  locations = [...new Set(locations)];
  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={11}>
                  Total Waste By Area
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CustomTableRow hover tabIndex={-1}>
                <TableCell align="left">Area</TableCell>
                <TableCell align="left">28 Day Avg</TableCell>
                <TableCell align="left">7 Day Avg</TableCell>
                {days.map((day) => (
                  <TableCell key={day} align="left">
                    {moment(day).format("DD-MM-YY")}
                  </TableCell>
                ))}
              </CustomTableRow>
              {locations.map((location) => (
                <CustomTableRow hover tabIndex={-1} key={location}>
                  <TableCell align="left">{location}</TableCell>
                  <TableCell align="left">
                    {filterLocation(day28Avg, location)} Kg
                  </TableCell>
                  <TableCell align="left">
                    {filterLocation(day7Avg, location)} Kg
                  </TableCell>
                  {days.map((day) =>
                    filterDayLocation(dailyData, day, location).map(
                      (data, index) => (
                        <TableCell key={index} align="left">
                          {data} Kg
                        </TableCell>
                      )
                    )
                  )}
                </CustomTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

function Report() {
  return (
    <React.Fragment>
      <Helmet title="Report" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Report
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <LineChart />
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Report;
