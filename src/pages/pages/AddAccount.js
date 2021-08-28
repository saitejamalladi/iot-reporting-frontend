import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import "../../vendor/roundedBarCharts";

import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid as MuiGrid,
  TextField,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Alert as MuiAlert } from "@material-ui/lab";

import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAccount } from "../../redux/actions/scaleActions";

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

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
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      dispatch(addAccount());
      await timeOut(1500);
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

function AddAccount({ match }) {
  const history = useHistory();
  const handleViewAccount = (event) => {
    event.preventDefault();
    history.push("/");
  };
  console.log(match.params.id);
  return (
    <React.Fragment>
      <Helmet title="Accounts" />
      <Grid justify="space-between" container spacing={4}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Add Account
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleViewAccount}
            >
              View Accounts
            </Button>
          </div>
        </Grid>
      </Grid>
      <Divider my={6} />
      <AccountForm />
    </React.Fragment>
  );
}

export default AddAccount;
