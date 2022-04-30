/* eslint-disable import/no-unresolved */
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
import ReactQuill from 'react-quill';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { addDepartmentItem } from 'redux/actions';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Wizard, Steps, Step } from 'react-albus';
import { Colxx } from 'components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import TopNavigation from 'components/wizard/TopNavigation';

const LastStepEnd = ({ intl, toggleModal, tracking, nameOFTracking }) => {
  const dispatch = useDispatch();
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [topWrongDisabled, setTopWrongDisabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vision: '',
    message: '',
    objectives: '',
    SObjectives: '',
    keywords: '',
    subjects: '',
    students: '',
    rooms: '',
    alumni: '',
    members: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    webLink: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    instagram: '',
    videoLink: '',
    Url: '',
    studySystem: '',
    studyProgram: '',
    graduationProject: '',
    studyYears: '',
  });
  const [Image, setImage] = useState('');

  const { categories, labels, project } = useSelector(
    (state) => state.departmentListApp
  );
  const {
    keywords,
    description,
    title,
    Url,
    vision,
    message,
    objectives,
    videoLink,
    studySystem,
    graduationProject,
    subjects,
    students,
    rooms,
    alumni,
    members,
    studyYears,
    address,
    phone,
    mobile,
    email,
    webLink,
    facebook,
    linkedin,
    twitter,
    youtube,
    instagram,
  } = formData;
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    const studyProgram = selectedOptions.map((p) => p.value);
    if (steps.length - 2 <= steps.indexOf(step)) {
      const payload = new FormData();
      for (let i = 0; i < Image.length; i += 1) {
        payload.append('departmentImage', Image[i]);
      }
      payload.append('title', title);
      payload.append('studySystem', studySystem.value);
      payload.append('studyProgram', studyProgram);
      payload.append('description', description);
      payload.append('vision', vision);
      payload.append('message', message);
      payload.append('objectives', objectives);
      payload.append('graduationProject', graduationProject.value);
      payload.append('studyYears', studyYears);
      payload.append('keywords', keywords);
      payload.append('subjects', subjects);
      payload.append('students', students);
      payload.append('rooms', rooms);
      payload.append('alumni', alumni);
      payload.append('members', members);
      payload.append('address', address);
      payload.append('phone', phone);
      payload.append('mobile', mobile);
      payload.append('email', email);
      payload.append('webLink', webLink);
      payload.append('facebook', facebook);
      payload.append('linkedin', linkedin);
      payload.append('twitter', twitter);
      payload.append('youtube', youtube);
      payload.append('instagram', instagram);
      payload.append('videoLink', videoLink);
      payload.append('Url', Url);
      payload.append('tracking', tracking);
      payload.append('nameOFTracking', nameOFTracking);

      if (Image && title && description && keywords && Url) {
        setBottomNavHidden(true);
        setTopNavDisabled(true);
        console.log(formData);
        dispatch(addDepartmentItem(payload));
        // setFormData({
        //   title: '',
        //   description: '',
        //   vision: '',
        //   message: '',
        //   objectives: '',
        //   SObjectives: '',
        //   keywords: '',
        //   subjects: '',
        //   students: '',
        //   rooms: '',
        //   alumni: '',
        //   Url: '',
        // });
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
          <IntlMessages id="department.add-new" />
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
              name={messages['department.step-name-1']}
              desc={messages['department.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                          />
                          <span>
                            <IntlMessages id="department.title" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="keywords"
                            value={keywords}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.keywords" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="description"
                            value={description}
                            onChange={onChange}
                            required
                          />
                          <span>
                            <IntlMessages id="department.description" />
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
              name={messages['department.step-name-2']}
              desc={messages['department.step-desc-2']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="Url"
                            value={Url}
                            onChange={onChange}
                            required
                          />
                          <span>
                            <IntlMessages id="department.url" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="vision"
                            value={vision}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.vision" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="message"
                            value={message}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.message" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="videoLink"
                            value={videoLink}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.videoLink" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          <IntlMessages id="department.studySystem" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          options={categories.map((x, i) => {
                            return { label: x, value: x, key: i };
                          })}
                          value={studySystem}
                          onChange={(val) =>
                            setFormData({ ...formData, studySystem: val })
                          }
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          <IntlMessages id="department.graduationProject" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          options={project.map((x, i) => {
                            return { label: x, value: x, key: i };
                          })}
                          value={graduationProject}
                          onChange={(val) =>
                            setFormData({ ...formData, graduationProject: val })
                          }
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="12">
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          <IntlMessages id="department.studyprogram" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="form-field-name"
                          value={selectedOptions}
                          onChange={setSelectedOptions}
                          options={labels}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label  mb-4">
                        <CardTitle>
                          <IntlMessages id="department.objectives" />
                        </CardTitle>
                        <ReactQuill
                          theme="snow"
                          value={objectives}
                          onChange={(val) =>
                            setFormData({ ...formData, objectives: val })
                          }
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step
              id="step3"
              name={messages['department.step-name-3']}
              desc={messages['department.step-desc-3']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="students"
                            value={students}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.students" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="alumni"
                            value={alumni}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.alumni" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="members"
                            value={members}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.members" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="studyYears"
                            value={studyYears}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.studyYears" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="rooms"
                            value={rooms}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.rooms" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="subjects"
                            value={subjects}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.subjects" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
              </div>
            </Step>

            <Step
              id="step4"
              name={messages['department.step-name-4']}
              desc={messages['department.step-desc-4']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={12}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="address"
                            value={address}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.address" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.phone" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="mobile"
                            value={mobile}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.mobile" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.email" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="webLink"
                            value={webLink}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.webLink" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step
              id="step5"
              name={messages['department.step-name-5']}
              desc={messages['department.step-desc-5']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="facebook"
                            value={facebook}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.facebook" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="linkedin"
                            value={linkedin}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.linkedin" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="twitter"
                            value={twitter}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.twitter" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="instagram"
                            value={instagram}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.instagram" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="youtube"
                            value={youtube}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="department.youtube" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step
              id="step6"
              name={messages['department.step-name-6']}
              desc={messages['department.step-desc-6']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={12}>
                      <Label className="mt-4">
                        <IntlMessages id="department.image" />
                      </Label>
                      <Input
                        multiple
                        type="file"
                        onChange={(event) => setImage(event.target.files)}
                      />
                    </Colxx>
                  </FormGroup>
                </Form>
              </div>
            </Step>

            <Step id="step7" hideTopNav>
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
