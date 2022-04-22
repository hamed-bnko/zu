import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const AdvsPage = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './advsList')
);
// const ContentDefault = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-content" */ './content')
// );

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
      <Route
        path={`${match.url}`}
        render={(props) => <AdvsPage {...props} />}
      />
      {/* <Route
        path={`${match.url}/content`}
        render={(props) => <ContentDefault {...props} />}
      /> */}

      {/* 
      <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/content`}
        component={ContentDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/ecommerce`}
        component={EcommerceDefault}
        roles={[UserRole.Editor]}
      />
      <ProtectedRoute
        path={`${match.url}/analytics`}
        component={AnalyticsDefault}
        roles={[UserRole.Editor]}
      />
      */}

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
