/* eslint-disable import/first */
import React from "react";
import async from "../components/Async";

import { Monitor, Users as UsersIcon } from "react-feather";

// Guards
import AuthGuard from "../components/AuthGuard";

// Auth components
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Account components
import Accounts from "../pages/pages/Accounts";
import {
  AccountCircle as AccountCircleIcon,
  AssignmentInd as AssignmentIndIcon,
  AspectRatio as AspectRatioIcon,
  CastConnected as CastConnectedIcon,
  Fastfood as FastfoodIcon,
  People as PeopleIcon,
} from "@material-ui/icons";

// User components
import Users from "../pages/pages/Users";

// Sensor components
import Sensors from "../pages/pages/Sensors";

// Role components
import Roles from "../pages/pages/Roles";

// Scales components
import Scales from "../pages/pages/Scales";

// Meal Count components
import MealCount from "../pages/pages/MealCount";

// Pages components
const Profile = async(() => import("../pages/pages/Profile"));

// Landing
import Landing from "../pages/presentation/Landing";

// Protected routes
import ProtectedPage from "../pages/protected/ProtectedPage";

// This route is only visible while signed in
const protectedPageRoutes = {
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
  guard: AuthGuard,
};

const landingRoutes = {
  id: "Landing Page",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: Landing,
  children: null,
};

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
  component: Profile,
  children: null,
};

const accountRoutes = {
  id: "Accounts",
  path: "/accounts",
  icon: <AccountCircleIcon />,
  component: Accounts,
  children: null,
};

const userRoutes = {
  id: "Users",
  path: "/users",
  icon: <PeopleIcon />,
  component: Users,
  children: null,
};

// const permissionRoutes = {
//   id: "Permissions",
//   path: "/permissions",
//   icon: <People />,
//   component: Accounts,
//   children: null,
// };

const roleRoutes = {
  id: "Roles",
  path: "/roles",
  icon: <AssignmentIndIcon />,
  component: Roles,
  children: null,
};

const scaleRoutes = {
  id: "Scales",
  path: "/scales",
  icon: <AspectRatioIcon />,
  component: Scales,
  children: null,
};

const sensorRoutes = {
  id: "Sensors",
  path: "/sensors",
  icon: <CastConnectedIcon />,
  component: Sensors,
  children: null,
};

const mealCountRoutes = {
  id: "Meal Count",
  path: "/meal-count",
  icon: <FastfoodIcon />,
  component: MealCount,
  children: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  accountRoutes,
  userRoutes,
  roleRoutes,
  scaleRoutes,
  sensorRoutes,
  mealCountRoutes,
  profileRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  accountRoutes,
  userRoutes,
  roleRoutes,
  scaleRoutes,
  sensorRoutes,
  mealCountRoutes,
];
