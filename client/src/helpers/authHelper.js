import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from 'constants/defaultValues';
import { useSelector } from 'react-redux';
// import { getCurrentUser } from './Utils';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const { currentUser } = useSelector((state) => state.authUser);

  const setComponent = (props) => {
    if (isAuthGuardActive) {
      // const currentUser = getCurrentUser();
      if (currentUser) {
        if (roles) {
          if (roles.includes(currentUser.roles)) {
            return <Component {...props} />;
          }
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
