import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Tooltip, Menu, MenuItem, Typography } from "@material-ui/core";

import { signOut } from "../redux/actions/authActions";
import { AUTH_TOKEN } from "../constants";

const ProfileName = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color.black};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  margin-right: ${(props) => props.theme.spacing(2)}px;
  padding-right: ${(props) => props.theme.spacing(2)}px;
  border-right: 1px solid ${(props) => props.theme.palette.divider};
`;

const ProfileRole = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color.black};
  font-size: 0.7rem;
`;

function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const scale = useSelector((state) => state.scaleReducer);
  let user = auth.user ? auth.user : {};
  let selectedAccount = scale.selectedAccount;

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleProfile = async () => {
    closeMenu();
    history.push("/profile");
  };
  const handleChangePassword = async () => {
    closeMenu();
    history.push("/change-password");
  };
  const handleSignOut = async () => {
    localStorage.removeItem(AUTH_TOKEN);
    await dispatch(signOut());
    history.push("/auth/sign-in");
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <Button
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <ProfileName>{selectedAccount}</ProfileName>
          <ProfileName>{user.name}</ProfileName>
          <ProfileRole>{user.role}</ProfileRole>
        </Button>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
