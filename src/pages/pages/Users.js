import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Box,
  Button,
  Divider as MuiDivider,
  Grid,
  IconButton,
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

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import { useHistory } from "react-router-dom";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

function createData(id, full_name, email_id, user_name, role, created_date) {
  return { id, full_name, email_id, user_name, role, created_date };
}

const rows = [
  createData(
    "1",
    "Emile Alston",
    "emile.alston@email.com",
    "emile.alston",
    "user",
    "2020-01-02"
  ),
  createData(
    "2",
    "Vince Firth",
    "vince.firth@email.com",
    "vince.firth",
    "admin",
    "2020-01-04"
  ),
  createData(
    "3",
    "Ty Coker",
    "ty.coker@email.com",
    "ty.coker",
    "user",
    "2020-01-04"
  ),
  createData(
    "4",
    "Scotty Fanning",
    "scotty.fanning@email.com",
    "scotty.fanning",
    "user",
    "2020-01-08"
  ),
  createData(
    "5",
    "Francisco Jiggetts",
    "francisco.jiggetts@email.com",
    "francisco.jiggetts",
    "admin",
    "2020-01-09"
  ),
  createData(
    "6",
    "Gabriel Blizzard",
    "gabriel.blizzard@email.com",
    "gabriel.blizzard",
    "admin",
    "2020-01-14"
  ),
  createData(
    "7",
    "Harley Trivedi",
    "harley.trivedi@email.com",
    "harley.trivedi",
    "user",
    "2020-01-16"
  ),
  createData(
    "8",
    "Margarito Manigault",
    "margarito.manigault@email.com",
    "margarito.manigault",
    "user",
    "2020-01-22"
  ),
  createData(
    "9",
    "Rex Euell",
    "rex.euell@email.com",
    "rex.euell",
    "user",
    "2020-01-22"
  ),
  createData(
    "10",
    "Long Macias",
    "long.macias@email.com",
    "long.macias",
    "user",
    "2020-01-23"
  ),
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
  { id: "full_name", alignment: "left", label: "Full Name" },
  { id: "email_id", alignment: "left", label: "Email Id" },
  { id: "username", alignment: "left", label: "User Name" },
  { id: "role", alignment: "left", label: "Role" },
  { id: "created_date", alignment: "left", label: "Created Date" },
  { id: "actions", alignment: "left", label: "Actions" },
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
                      <TableCell align="left">{row.full_name}</TableCell>
                      <TableCell align="left">{row.email_id}</TableCell>
                      <TableCell align="left">{row.user_name}</TableCell>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="left">{row.created_date}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
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
function UserList() {
  const history = useHistory();
  const handleAddUser = (event) => {
    event.preventDefault();
    history.push("/add-user");
  };
  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Users
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleAddUser}
            >
              <AddIcon />
              Add user
            </Button>
          </div>
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

export default UserList;
