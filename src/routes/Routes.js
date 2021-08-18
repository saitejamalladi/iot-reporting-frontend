import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboardLayoutRoutes, authLayoutRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import { useSelector } from "react-redux";

const childRoutes = (Layout, routes, userRole) => {
  return routes.map(
    (
      { component: Component, guard, children, path, permittedRoles },
      index
    ) => {
      if (!permittedRoles || permittedRoles.includes(userRole)) {
        const Guard = guard || React.Fragment;

        return children ? (
          children.map((element, index) => {
            const Guard = element.guard || React.Fragment;
            const ElementComponent = element.component || React.Fragment;

            return (
              <Route
                key={index}
                path={element.path}
                exact
                render={(props) => (
                  <Layout>
                    <Guard>
                      <ElementComponent {...props} />
                    </Guard>
                  </Layout>
                )}
              />
            );
          })
        ) : Component ? (
          <Route
            key={index}
            path={path}
            exact
            render={(props) => (
              <Layout>
                <Guard>
                  <Component {...props} />
                </Guard>
              </Layout>
            )}
          />
        ) : null;
      }
      return null;
    }
  );
};

const Routes = () => {
  const auth = useSelector((state) => state.authReducer);
  let role = auth.user ? auth.user.role : "";
  return (
    <Router>
      <Switch>
        {childRoutes(DashboardLayout, dashboardLayoutRoutes, role)}
        {childRoutes(AuthLayout, authLayoutRoutes, role)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
