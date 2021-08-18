import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
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

function createData(
  id,
  network_id,
  scales_id,
  scales_name,
  scales_code,
  created_date
) {
  return { id, network_id, scales_id, scales_name, scales_code, created_date };
}

const rows = [
  createData("1", "edot1", "81927491", "edotscale1", "892", "2020-01-02"),
  createData("2", "edot2", "81927492", "edotscale2", "890", "2020-01-04"),
  createData("3", "edot3", "81927493", "edotscale3", "891", "2020-01-04"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", alignment: "right", label: "Id" },
  { id: "network_id", alignment: "left", label: "Network Id" },
  { id: "scales_id", alignment: "left", label: "Scales Id" },
  { id: "scales_name", alignment: "left", label: "Scales Name" },
  { id: "scales_code", alignment: "left", label: "Scales Code" },
  { id: "created_date", alignment: "left", label: "Created Date" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <CustomTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                    >
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="left">{row.network_id}</TableCell>
                      <TableCell align="left">{row.scales_id}</TableCell>
                      <TableCell align="left">{row.scales_name}</TableCell>
                      <TableCell align="left">{row.scales_code}</TableCell>
                      <TableCell align="left">{row.created_date}</TableCell>
                    </CustomTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function ScalesList() {
  return (
    <React.Fragment>
      <Helmet title="Scales" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            View Scales
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ScalesList;
