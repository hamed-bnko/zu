import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';
const Admins = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './adminsList')
);
const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const NewsPages = React.lazy(() =>
  import(/* webpackChunkName: "menu" */ './news')
);

const AdvsPages = React.lazy(() =>
  import(/* webpackChunkName: "menu" */ './advs')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const FacultiesPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './faculties/facultiesList')
);

const FacultyPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './faculties/faculty-detail')
);

const App = ({ match }) => {
  const { isAuthenticated } = useSelector((state) => state.authUser);

  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {!isAuthenticated && <Redirect to="/user/login" />}
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/admins`}
              render={(props) => <Admins {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/news`}
              render={(props) => <NewsPages {...props} />}
            />
            <Route
              path={`${match.url}/advs`}
              render={(props) => <AdvsPages {...props} />}
            />
            <Route
              path={`${match.url}/faculties/:url`}
              render={(props) => <FacultyPage {...props} />}
            />
            <Route
              path={`${match.url}/faculties`}
              render={(props) => <FacultiesPage {...props} />}
            />
            <Route
              path={`${match.url}/faculty`}
              render={(props) => <FacultyPage {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
