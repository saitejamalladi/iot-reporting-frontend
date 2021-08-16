import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  Typography,
} from "@material-ui/core";

import { People as PeopleIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

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

let accounts = [
  {
    title: "Global Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "Country Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "Sector Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "Public Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "State Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "Site Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "General Manager",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "User Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "Scales Account",
    count: Math.floor(11 * Math.random()),
  },
  {
    title: "Sensors Account",
    count: Math.floor(11 * Math.random()),
  },
];

function AccountList() {
  return (
    <React.Fragment>
      <Helmet title="Accounts" />
      <Grid justify="space-between" container spacing={24}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Accounts
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={4}>
        {accounts.map((account, index) => (
          <Grid item xs={6} sm={3}>
            <AccountPaper key={index}>
              <Grid container>
                <Grid item xs={"auto"}>
                  <AccountIcon />
                </Grid>
                <Grid item xs={8}>
                  <AccountCard>
                    <AccountTitle>{account.title}</AccountTitle>
                    <AccountCount>{account.count}</AccountCount>
                  </AccountCard>
                </Grid>
              </Grid>
            </AccountPaper>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default AccountList;
