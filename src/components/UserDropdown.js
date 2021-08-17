import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  Typography,
} from "@material-ui/core";

import { signOut } from "../redux/actions/authActions";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
  
  &:hover {
    border-radius: 3px;
  },
`;

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
    await dispatch(signOut());
    history.push("/auth/sign-in");
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <ProfileName>Sai Teja</ProfileName>
          <ProfileRole>Super Admin</ProfileRole>
        </IconButton>
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
