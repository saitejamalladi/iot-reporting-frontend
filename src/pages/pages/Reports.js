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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

function EnhancedTable() {
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
                <TableCell align="right">Area</TableCell>
                <TableCell align="left">Bench Mark</TableCell>
                <TableCell align="left">28 Day Avg</TableCell>
                <TableCell align="left">7 Day Avg</TableCell>
                <TableCell align="left">18th Aug 21</TableCell>
                <TableCell align="left">19th Aug 21</TableCell>
                <TableCell align="left">20th Aug 21</TableCell>
                <TableCell align="left">21st Aug 21</TableCell>
                <TableCell align="left">22nd Aug 21</TableCell>
                <TableCell align="left">23rd Aug 21</TableCell>
                <TableCell align="left">24th Aug 21</TableCell>
              </CustomTableRow>
              <CustomTableRow hover tabIndex={-1}>
                <TableCell align="right">Kitchen</TableCell>
                <TableCell align="left">0.03 Kg</TableCell>
                <TableCell align="left">0.20 Kg</TableCell>
                <TableCell align="left">0.20 Kg</TableCell>
                <TableCell align="left">0.09 Kg</TableCell>
                <TableCell align="left">0.10 Kg</TableCell>
                <TableCell align="left">0.08 Kg</TableCell>
                <TableCell align="left">0.14 Kg</TableCell>
                <TableCell align="left">0.07 Kg</TableCell>
                <TableCell align="left">0.46 Kg</TableCell>
                <TableCell align="left">0.49 Kg</TableCell>
              </CustomTableRow>
              <CustomTableRow hover tabIndex={-1}>
                <TableCell align="right">Main Floor</TableCell>
                <TableCell align="left">0.09 Kg</TableCell>
                <TableCell align="left">1.60 Kg</TableCell>
                <TableCell align="left">1.60 Kg</TableCell>
                <TableCell align="left">0.11 Kg</TableCell>
                <TableCell align="left">1.41 Kg</TableCell>
                <TableCell align="left">0.73 Kg</TableCell>
                <TableCell align="left">2.03 Kg</TableCell>
                <TableCell align="left">0.98 Kg</TableCell>
                <TableCell align="left">4.83 Kg</TableCell>
                <TableCell align="left">1.12 Kg</TableCell>
              </CustomTableRow>
              <CustomTableRow hover tabIndex={-1}>
                <TableCell align="right">Canteen</TableCell>
                <TableCell align="left">0.09 Kg</TableCell>
                <TableCell align="left">0.87 Kg</TableCell>
                <TableCell align="left">0.87 Kg</TableCell>
                <TableCell align="left">0.06 Kg</TableCell>
                <TableCell align="left">0.53 Kg</TableCell>
                <TableCell align="left">0.34 Kg</TableCell>
                <TableCell align="left">0.80 Kg</TableCell>
                <TableCell align="left">0.43 Kg</TableCell>
                <TableCell align="left">0.53 Kg</TableCell>
                <TableCell align="left">3.41 Kg</TableCell>
              </CustomTableRow>
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
