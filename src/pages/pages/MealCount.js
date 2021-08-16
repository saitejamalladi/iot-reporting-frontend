import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  CardContent,
  Grid,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

function EmptyCard() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="body2" gutterBottom>
          Coming Soon...
        </Typography>
      </CardContent>
    </Card>
  );
}

function MealCount() {
  return (
    <React.Fragment>
      <Helmet title="Meal Count" />
      <Typography variant="h3" gutterBottom display="inline">
        Meal Count
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EmptyCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default MealCount;
