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
import { Add as AddIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Alert = styled(MuiAlert)(spacing);

const Grid = styled(MuiGrid)(spacing);

const initialValues = {
  roleName: "",
};

const validationSchema = Yup.object().shape({
  roleName: Yup.string().required("Required"),
});

function RoleForm() {
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
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
                    Role added successfully!
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
                <Grid container spacing={4}>
                  <Grid item md={6}>
                    <TextField
                      name="roleName"
                      label="Role Name"
                      value={values.roleName}
                      error={Boolean(touched.roleName && errors.roleName)}
                      fullWidth
                      helperText={touched.roleName && errors.roleName}
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
                      Save changes
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

function AddRole() {
  const history = useHistory();
  const handleViewUser = (event) => {
    event.preventDefault();
    history.push("/users");
  };
  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Grid justify="space-between" container spacing={24}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Add Role
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleViewUser}
            >
              <AddIcon />
              View Roles
            </Button>
          </div>
        </Grid>
      </Grid>
      <Divider my={6} />
      <RoleForm />
    </React.Fragment>
  );
}

export default AddRole;
