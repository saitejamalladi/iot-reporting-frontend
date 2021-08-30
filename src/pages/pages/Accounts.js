import React, { Component } from "react";

import { connect } from "react-redux";

import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Paper as MuiPaper,
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid as MuiGrid,
  TextField,
  Typography,
} from "@material-ui/core";

import { Add as AddIcon, People as PeopleIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import {
  fetchAccounts,
  fetchChildAccounts,
} from "../../redux/actions/scaleActions";
import { NavLink, withRouter } from "react-router-dom";

import { Alert as MuiAlert } from "@material-ui/lab";

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../redux/actions/scaleActions";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const AccountIcon = styled(PeopleIcon)`
  margin: ${(props) => props.theme.spacing(2)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-radius: 3px;
  color: ${(props) => props.theme.palette.common.black};
  background-color: #d01313;
  fill: ${(props) => props.theme.palette.common.white};
  width: 50px;
  height: 50px;
  vertical-align: middle;
  display: inline;
`;
const AccountPaper = styled(Paper)`
  cursor: pointer;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.13);
  transition: 0.15s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const AccountCard = styled(Typography)`
  margin: ${(props) => props.theme.spacing(2)}px;
`;
const AccountTitle = styled(Typography)`
  margin: ${(props) => props.theme.spacing(2)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const AccountCount = styled(Typography)`
  margin: ${(props) => props.theme.spacing(2)}px;
`;
const NoAccounts = () => (
  <Typography variant="subtitle1" color="textPrimary">
    No Accounts. Click Add account to add one.
  </Typography>
);

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const Grid = styled(MuiGrid)(spacing);

const initialValues = {
  name: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

function AccountForm() {
  const dispatch = useDispatch();
  const scale = useSelector((state) => state.scaleReducer);
  let selectedAccount = scale.selectedAccount;
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      let accountForm = {
        name: values.name,
        parent_account: selectedAccount.account_id,
      };
      await dispatch(addAccount(accountForm));
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Grid container direction={"column"} spacing={6}>
              <Grid item xs={12} sm={6}>
                {status && status.sent && (
                  <Alert severity="success" my={3}>
                    Account added successfully!
                  </Alert>
                )}
              </Grid>
            </Grid>

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid container direction={"column"} spacing={4}>
                  <Grid item md={6}>
                    <TextField
                      name="name"
                      label="Account Name"
                      aria-readonly={true}
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      my={2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      mt={3}
                    >
                      Add Account
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

class Accounts extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.fetchAccounts();
  }

  handleViewAccount = (account) => {
    this.props.fetchChildAccounts(account);
  };

  handleClickOpen = (selectedAccount) => {
    if (selectedAccount) {
      this.setState({ open: true });
    } else {
      alert("Select the account first");
    }
  };
  handleClose = (selectedAccount) => {
    this.setState({ open: false });
    this.props.fetchChildAccounts(selectedAccount);
  };
  render() {
    let accounts = this.props.accounts ? this.props.accounts : [];
    let selectedAccount = this.props.selectedAccount;
    let selectedAccountName = selectedAccount ? selectedAccount.name : "";
    return (
      <React.Fragment>
        <Helmet title="Accounts" />
        <Grid justify="space-between" container spacing={4}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Accounts
            </Typography>
          </Grid>
          <Grid item>
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => this.handleClickOpen(selectedAccount)}
              >
                <AddIcon />
                Add Account
              </Button>
            </div>
          </Grid>
        </Grid>
        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            Account
          </Link>
          <Typography>{selectedAccountName}</Typography>
        </Breadcrumbs>
        <Divider my={6} />
        <Grid container spacing={4}>
          {accounts.map((account, index) => (
            <Grid key={index} item xs={6} sm={3}>
              <AccountPaper onClick={() => this.handleViewAccount(account)}>
                <Grid container>
                  <Grid item xs={"auto"}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={8}>
                    <AccountCard>
                      <AccountTitle>{account.name}</AccountTitle>
                      <AccountCount>{account.child_account}</AccountCount>
                    </AccountCard>
                  </Grid>
                </Grid>
              </AccountPaper>
            </Grid>
          ))}
          {accounts.length <= 0 && <NoAccounts />}
        </Grid>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={this.state.open}
          onClose={() => this.handleClose(selectedAccount)}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Add Account</DialogTitle>
          <DialogContent>
            <AccountForm />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose(selectedAccount)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.scaleReducer.accounts,
    selectedAccount: state.scaleReducer.selectedAccount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccounts: () => dispatch(fetchAccounts()),
    fetchChildAccounts: (account) => dispatch(fetchChildAccounts(account)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Accounts));
