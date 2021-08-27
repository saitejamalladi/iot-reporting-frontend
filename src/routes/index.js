/* eslint-disable import/first */
import React from "react";
import async from "../components/Async";

import { Users as UsersIcon } from "react-feather";

// Guards
import AuthGuard from "../components/AuthGuard";

// Auth components
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import SignUpSuperAdmin from "../pages/auth/SignUpSuperAdmin";
import SignUpGlobalAdmin from "../pages/auth/SignUpGlobalAdmin";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Account components
import Accounts from "../pages/pages/Accounts";
import {
  AccountCircle as AccountCircleIcon,
  AspectRatio as AspectRatioIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
} from "@material-ui/icons";

// User components
import AddUser from "../pages/pages/AddUser";
import Users from "../pages/pages/Users";

// Report components
import Report from "../pages/pages/Reports";

// Device components
import Devices from "../pages/pages/Devices";

// Scales components
import Scales from "../pages/pages/Scales";

// Profile components
const Profile = async(() => import("../pages/pages/Profile"));
import ChangePassword from "../pages/pages/ChangePassword";

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <UsersIcon />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/sign-up/super-admin",
      name: "Sign Up->Super Admin",
      component: SignUpSuperAdmin,
    },
    {
      path: "/auth/sign-up/global-admin",
      name: "Sign Up->Global Admin",
      component: SignUpGlobalAdmin,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const profileRoutes = {
  id: "Profile",
  path: "/profile",
  icon: <PeopleIcon />,
  children: [
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      guard: AuthGuard,
    },
    {
      path: "/change-password",
      name: "Change Password",
      component: ChangePassword,
      guard: AuthGuard,
    },
  ],
  component: null,
  guard: AuthGuard,
  permittedRoles: [
    "Super Admin",
    "Global Admin",
    "Country Admin",
    "Sector Admin",
    "Site Admin",
    "General Manager",
    "User",
    "Public",
  ],
};

const accountRoutes = {
  id: "Accounts",
  path: "/",
  icon: <AccountCircleIcon />,
  component: Accounts,
  children: null,
  guard: AuthGuard,
};

const viewUserRoutes = {
  id: "Users",
  path: "/users",
  icon: <PeopleIcon />,
  component: Users,
  children: null,
  permittedRoles: [
    "Super Admin",
    "Global Admin",
    "Country Admin",
    "Sector Admin",
    "Site Admin",
    "General Manager",
    "User",
    "Public",
  ],
};

const addUserRoutes = {
  id: "Add User",
  path: "/add-user",
  icon: <PeopleIcon />,
  component: AddUser,
  children: null,
  permittedRoles: [
    "Super Admin",
    "Global Admin",
    "Country Admin",
    "Sector Admin",
    "Site Admin",
    "General Manager",
  ],
};

const scaleRoutes = {
  id: "Scales",
  path: "/scales",
  icon: <AspectRatioIcon />,
  component: Scales,
  children: null,
  permittedRoles: [
    "Super Admin",
    "Global Admin",
    "Country Admin",
    "Sector Admin",
    "Site Admin",
    "Public",
  ],
};

const deviceRoutes = {
  id: "Devices",
  path: "/devices",
  icon: <AspectRatioIcon />,
  component: Devices,
  children: null,
  permittedRoles: [
    "Super Admin",
    "Global Admin",
    "Country Admin",
    "Sector Admin",
    "Site Admin",
    "Public",
  ],
};

const reportRoutes = {
  id: "Report",
  path: "/report",
  icon: <AssessmentIcon />,
  component: Report,
  children: null,
  permittedRoles: [
    "Super Admin",
    "Global Admin",
    "Country Admin",
    "Sector Admin",
    "Site Admin",
    "Public",
  ],
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  accountRoutes,
  addUserRoutes,
  viewUserRoutes,
  deviceRoutes,
  scaleRoutes,
  reportRoutes,
  profileRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  accountRoutes,
  viewUserRoutes,
  deviceRoutes,
  scaleRoutes,
  reportRoutes,
];
