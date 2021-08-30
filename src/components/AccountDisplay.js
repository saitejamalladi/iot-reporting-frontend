import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { Tooltip, Typography } from "@material-ui/core";

const AccountName = styled(Typography)`
  color: orange;
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  margin-left: ${(props) => props.theme.spacing(2)}px;
  padding-left: ${(props) => props.theme.spacing(2)}px;
`;

function AccountDisplay() {
  const scale = useSelector((state) => state.scaleReducer);
  let selectedAccount = scale.selectedAccount ? scale.selectedAccount.name : "";

  return (
    <React.Fragment>
      <Tooltip title="Account name">
        <AccountName variant={"h4"}>{selectedAccount}</AccountName>
      </Tooltip>
    </React.Fragment>
  );
}

export default AccountDisplay;
