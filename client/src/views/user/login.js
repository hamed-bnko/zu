import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import { loginUser } from 'redux/actions';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';

import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const Login = ({ history }) => {
  const { error, isAuthenticated } = useSelector((state) => state.authUser);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'حدث خطأ', 5000, null, null, '');
    }
  }, [error]);

  const validatePassword = () => {
    let validerror;
    if (!password) {
      validerror = 'Please enter your password';
    } else if (password.length < 4) {
      validerror = 'Value must be longer than 3 characters';
    }
    return validerror;
  };

  const validateEmail = () => {
    let validerror;
    if (!email) {
      validerror = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      validerror = 'Invalid email address';
    }
    return validerror;
  };
  const onUserLogin = () => {
    if (email === '' && password === '') {
      console.log('first');
    } else {
      dispatch(loginUser({ email, password }, history));
    }
  };

  const initialValues = { email, password };
  if (isAuthenticated) {
    return <Redirect to="/app" />;
  }

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className=" position-relative image-side ">
            <p className=" text-center text-white h2 "> الدراسة والامتجانات</p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white text-center">
              <img src="/assets/img/logoE.png" alt="" width="200" />
            </NavLink>{' '}
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>
            <Formik initialValues={initialValues}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      validate={validatePassword}
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      onClick={onUserLogin}
                      type="button"
                      color="primary"
                      // className={`btn-shadow btn-multiple-state ${
                      //   loading ? 'show-spinner' : ''
                      // }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps)(Login);
