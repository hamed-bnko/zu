/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  CardTitle,
  Button,
} from 'reactstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addAdminItem } from 'redux/actions';

import { Wizard, Steps, Step } from 'react-albus';
import { Colxx } from 'components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import TopNavigation from 'components/wizard/TopNavigation';
import CustomSelectInput from '../../components/common/CustomSelectInput';

const LastStepEnd = ({ intl, toggleModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    faculty: '',
    dob: '',
    roles: '',
  });
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [topWrongDisabled, setTopWrongDisabled] = useState(false);

  const { allFacultiesItems } = useSelector((state) => state.facultiesListApp);
  const selectData = [
    {
      label: 'مسؤول اول',
      value: '1',
      key: 0,
    },
    {
      label: 'مشرف اعلامي',
      value: '2',
      key: 1,
    },
    {
      label: 'مشرف كلية',
      value: '3',
      key: 2,
    },
    {
      label: 'مشرف  مكتب او مركز',
      value: '4',
      key: 3,
    },
  ];

  const { name, email, password, password2, faculty, dob, roles } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(roles);
  };

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      if (name && email && password && roles && password === password2) {
        setBottomNavHidden(true);
        setTopNavDisabled(true);
        console.log(formData);
        dispatch(addAdminItem(formData));
        setFormData({
          name: '',
          email: '',
          password: '',
          password2: '',
          faculty: '',
          dob: '',
          roles: '',
        });
        setTopWrongDisabled(true);
      }
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;
  return (
    <Card>
      <CardBody
        className="wizard wizard-default text-center"
        style={{ direction: 'rtl' }}
      >
        <span className="logo-single  m-5" />
        <CardTitle className="mb-4">
          <IntlMessages id="admin.register" />
        </CardTitle>
        <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav={false}
            topNavClick={topNavClick}
          />
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc={messages['wizard.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                          />
                          <span>
                            <IntlMessages id="forms.admin-name" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            placeholder={messages['forms.brthday']}
                            type="date"
                            name="dob"
                            value={dob}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="forms.brthday" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                          />
                          <span>
                            <IntlMessages id="forms.email" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['admin.step-name-2']}
              desc={messages['admin.step-desc-2']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          <IntlMessages id="forms.roles" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          placeholder="اختر الصلاحيات..."
                          name="form-field-name"
                          value={roles}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              roles: e,
                            })
                          }
                          options={selectData.map((x) => {
                            return {
                              label: x.label,
                              value: x.value,
                              key: x.key,
                            };
                          })}
                        />
                      </FormGroup>
                    </Colxx>
                    {roles && roles.value === '3' && (
                      <Colxx sm={12}>
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            <IntlMessages id="forms.faculties" />
                          </Label>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={
                              allFacultiesItems &&
                              allFacultiesItems.map((x, i) => {
                                return {
                                  label: x.facultyTitle,
                                  value: x.Url,
                                  key: i,
                                };
                              })
                            }
                            value={faculty}
                            onChange={(val) =>
                              setFormData({ ...formData, faculty: val })
                            }
                          />
                        </FormGroup>
                      </Colxx>
                    )}
                  </FormGroup>
                </Form>
              </div>
            </Step>

            <Step
              id="step4"
              name={messages['wizard.step-name-4']}
              desc={messages['wizard.step-desc-4']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label className="form-group has-float-label">
                      <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                      <span>
                        <IntlMessages id="forms.password" />
                      </span>
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className="form-group has-float-label">
                      <Input
                        type="password"
                        name="password2"
                        placeholder={messages['forms.password2']}
                        value={password2}
                        onChange={onChange}
                      />
                      <span>
                        <IntlMessages id="forms.password2" />
                      </span>
                    </Label>
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step id="step5" hideTopNav>
              {topWrongDisabled ? (
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">
                    <IntlMessages id="wizard.content-thanks" />
                  </h2>
                  <p>
                    <IntlMessages id="wizard.registered" />
                  </p>
                  <Button color="secondary" outline onClick={toggleModal}>
                    <IntlMessages id="buttons.close" />
                  </Button>
                </div>
              ) : (
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">
                    <IntlMessages id="wizard.content-wrong" />
                  </h2>
                  <p>
                    <IntlMessages id="wizard.registered-wrong" />
                  </p>
                </div>
              )}
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className={`justify-content-center ${
              bottomNavHidden && 'invisible'
            }`}
            prevLabel={messages['wizard.prev']}
            nextLabel={messages['wizard.next']}
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default injectIntl(LastStepEnd);
