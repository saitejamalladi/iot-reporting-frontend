/* eslint-disable import/first */
import React from "react";

import async from "../components/Async";

import { Layout, Monitor, Sliders, Users } from "react-feather";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Guards
import AuthGuard from "../components/AuthGuard";

// Auth components
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

// Account components
import {
  AccountCircle,
  Assessment,
  AssignmentInd,
  AspectRatio,
  CastConnected,
  Fastfood,
  People,
} from "@material-ui/icons";

// Pages components
import Orders from "../pages/pages/Orders";
import Accounts from "../pages/pages/Accounts";
import Settings from "../pages/pages/Settings";
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
  icon: <Users />,
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

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
    },
  ],
  component: null,
};

const accountRoutes = {
  id: "Accounts",
  path: "/orders",
  icon: <AccountCircle />,
  component: Accounts,
  children: null,
};

const userRoutes = {
  id: "Users",
  path: "/users",
  icon: <People />,
  component: Orders,
  children: null,
};

const roleRoutes = {
  id: "Roles",
  path: "/roles",
  icon: <AssignmentInd />,
  component: Orders,
  children: null,
};

const reportRoutes = {
  id: "Reports",
  path: "/reports",
  icon: <Assessment />,
  component: Orders,
  children: null,
};

const scaleRoutes = {
  id: "Scales",
  path: "/scales",
  icon: <AspectRatio />,
  component: Orders,
  children: null,
};

const sensorRoutes = {
  id: "Sensors",
  path: "/sensors",
  icon: <CastConnected />,
  component: Orders,
  children: null,
};

const mealCountRoutes = {
  id: "Meal Count",
  path: "/meal-count",
  icon: <Fastfood />,
  component: Orders,
  children: null,
};

const publicRoutes = {
  id: "Public",
  path: "/public",
  icon: <Sliders />,
  header: "Public",
  containsHome: true,
  children: [
    {
      path: "/public/scales",
      name: "Scales",
      component: Default,
    },
    {
      path: "/public/sensors",
      name: "Sensors",
      component: Analytics,
    },
    {
      path: "/public/meal-count",
      name: "Meal Count",
      component: SaaS,
    },
    {
      path: "/public/site",
      name: "Site",
      component: Default,
    },
  ],
  component: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  accountRoutes,
  userRoutes,
  roleRoutes,
  reportRoutes,
  scaleRoutes,
  sensorRoutes,
  mealCountRoutes,
  pagesRoutes,
  publicRoutes,
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
  reportRoutes,
  scaleRoutes,
  sensorRoutes,
  mealCountRoutes,
  pagesRoutes,
  publicRoutes,
];
