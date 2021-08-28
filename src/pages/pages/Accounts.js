import React, { Component } from "react";

import { connect } from "react-redux";

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
import {
  fetchAccounts,
  fetchChildAccounts,
} from "../../redux/actions/scaleActions";

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

class Accounts extends Component {
  componentDidMount() {
    this.props.fetchAccounts();
  }

  handleAccountClick = (accountId) => {
    this.props.fetchChildAccounts(accountId);
  };

  render() {
    let accounts = this.props.accounts ? this.props.accounts : [];

    return (
      <React.Fragment>
        <Helmet title="Accounts" />
        <Grid justify="space-between" container spacing={4}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Accounts
            </Typography>
          </Grid>
        </Grid>
        <Divider my={6} />
        <Grid container spacing={4}>
          {accounts.map((account, index) => (
            <Grid key={index} item xs={6} sm={3}>
              <AccountPaper
                onClick={() => this.handleAccountClick(account.account_id)}
              >
                <Grid container>
                  <Grid item xs={"auto"}>
                    <AccountIcon />
                  </Grid>
                  <Grid item xs={8}>
                    <AccountCard variant="body1">
                      <AccountTitle variant="div">{account.name}</AccountTitle>
                      <AccountCount variant="div">
                        {account.child_account}
                      </AccountCount>
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
}

const mapStateToProps = (state) => {
  return {
    accounts: state.scaleReducer.accounts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccounts: () => dispatch(fetchAccounts()),
    fetchChildAccounts: (accountId) => dispatch(fetchChildAccounts(accountId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
