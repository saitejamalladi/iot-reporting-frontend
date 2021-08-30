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
import { useDispatch, useSelector } from "react-redux";
import { fetchReport } from "../../redux/actions/scaleActions";

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

function filterDayLocation(dailyData, currentDay, location) {
  let currentDayWeight = dailyData.find(
    (data) => data.report_date === currentDay && data.location === location
  );
  let data = currentDayWeight ? currentDayWeight.total_weight : 0;
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}
function filterLocation(avgData, location) {
  let data = avgData.find((data) => data.location === location).average_weight;
  return Number(data).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function EnhancedTable() {
  const scaleReducer = useSelector((state) => state.scaleReducer);
  const reportData = scaleReducer.reportData;

  let days = [...new Array(7)].map((i, index) =>
    moment()
      .subtract(7 - index - 1, "days")
      .format("YYYY-MM-DD")
  );
  let dailyData = reportData ? reportData.daily_data : [];
  let day28Avg = reportData ? reportData.day_28_avg : [];
  let day7Avg = reportData ? reportData.day_7_avg : [];
  let locations = dailyData.map((data) => data.location);
  locations = [...new Set(locations)];
  if (dailyData.length > 0) {
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
                    {days.map((day, index) => (
                      <TableCell key={index} align="left">
                        {filterDayLocation(dailyData, day, location)} Kg
                      </TableCell>
                    ))}
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  } else {
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
                <CustomTableRow hover tabIndex={-1}>
                  <TableCell align="center" colspan={10}>
                    Insufficient data
                  </TableCell>
                </CustomTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

function Report() {
  const dispatch = useDispatch();
  dispatch(fetchReport());
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
