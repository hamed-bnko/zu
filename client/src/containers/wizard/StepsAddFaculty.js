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

import { addFacultiesItem } from 'redux/actions';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { Wizard, Steps, Step } from 'react-albus';
import { Colxx } from 'components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import TopNavigation from 'components/wizard/TopNavigation';
import CustomSelectInput from '../../components/common/CustomSelectInput';

const LastStepEnd = ({ intl, toggleModal }) => {
  const dispatch = useDispatch();
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [topWrongDisabled, setTopWrongDisabled] = useState(false);

  const [formData, setFormData] = useState({
    facultyTitle: '',
    facultycategory: '',
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
  });
  const [Image, setImage] = useState('');

  const { categories } = useSelector((state) => state.facultiesListApp);
  const {
    facultyTitle,
    facultycategory,
    description,
    vision,
    message,
    objectives,
    SObjectives,
    keywords,
    subjects,
    students,
    rooms,
    alumni,
    members,
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
    videoLink,
    Url,
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
    if (steps.length - 2 <= steps.indexOf(step)) {
      const payload = new FormData();
      for (let i = 0; i < Image.length; i += 1) {
        payload.append('facultyImage', Image[i]);
      }
      payload.append('facultyTitle', facultyTitle);
      payload.append('facultycategory', facultycategory.value);
      payload.append('description', description);
      payload.append('vision', vision);
      payload.append('message', message);
      payload.append('objectives', objectives);
      payload.append('SObjectives', SObjectives);
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

      if (Image && facultyTitle && description && keywords && Url) {
        setBottomNavHidden(true);
        setTopNavDisabled(true);
        console.log(formData);
        dispatch(addFacultiesItem(payload));
        setFormData({
          facultyTitle: '',
          facultycategory: '',
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
          Url: '',
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
          <IntlMessages id="faculty.add-new" />
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
              name={messages['faculty.step-name-1']}
              desc={messages['faculty.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="facultyTitle"
                            value={facultyTitle}
                            onChange={onChange}
                            required
                          />
                          <span>
                            <IntlMessages id="faculty.title" />
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
                            <IntlMessages id="faculty.keywords" />
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
                            <IntlMessages id="faculty.description" />
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
              name={messages['faculty.step-name-2']}
              desc={messages['faculty.step-desc-2']}
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
                            <IntlMessages id="faculty.url" />
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
                            <IntlMessages id="faculty.vision" />
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
                            <IntlMessages id="faculty.message" />
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
                            <IntlMessages id="faculty.videoLink" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          <IntlMessages id="faculty.category" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          options={categories.map((x, i) => {
                            return { label: x, value: x, key: i };
                          })}
                          value={facultycategory}
                          onChange={(val) =>
                            setFormData({ ...formData, facultycategory: val })
                          }
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label  mb-4">
                        <CardTitle>
                          <IntlMessages id="faculty.objectives" />
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
              name={messages['faculty.step-name-3']}
              desc={messages['faculty.step-desc-3']}
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
                            <IntlMessages id="faculty.students" />
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
                            <IntlMessages id="faculty.alumni" />
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
                            <IntlMessages id="faculty.members" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="rooms"
                            value={rooms}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="faculty.rooms" />
                          </span>
                        </Label>
                      </FormGroup>
                    </Colxx>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label className="form-group has-float-label">
                          <Input
                            type="text"
                            name="subjects"
                            value={subjects}
                            onChange={onChange}
                          />
                          <span>
                            <IntlMessages id="faculty.subjects" />
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
              name={messages['faculty.step-name-4']}
              desc={messages['faculty.step-desc-4']}
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
                            <IntlMessages id="faculty.address" />
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
                            <IntlMessages id="faculty.phone" />
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
                            <IntlMessages id="faculty.mobile" />
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
                            <IntlMessages id="faculty.email" />
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
                            <IntlMessages id="faculty.webLink" />
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
              name={messages['faculty.step-name-5']}
              desc={messages['faculty.step-desc-5']}
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
                            <IntlMessages id="faculty.facebook" />
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
                            <IntlMessages id="faculty.linkedin" />
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
                            <IntlMessages id="faculty.twitter" />
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
                            <IntlMessages id="faculty.instagram" />
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
                            <IntlMessages id="faculty.youtube" />
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
              name={messages['faculty.step-name-6']}
              desc={messages['faculty.step-desc-6']}
            >
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup row>
                    <Colxx sm={12}>
                      <Label className="mt-4">
                        <IntlMessages id="faculty.image" />
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
