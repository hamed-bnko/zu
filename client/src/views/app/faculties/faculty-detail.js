/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  Row,
  Nav,
  NavItem,
  Button,
  TabContent,
  TabPane,
  Card,
  Collapse,
} from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';

import { getFacultyDetail, getDepartmentsList } from 'redux/actions';
import FacultyDetailCard from 'components/applications/FacultyDetailCard';

import DepartmentItem from 'containers/applications/DepartmentItem';
import AddDepartment from 'containers/applications/AddNewDepartment';
import AddSpeechModal from 'containers/applications/addSpeechModal';
import {
  getSpeechList,
  deleteSpeechItem,
} from '../../../redux/speechList/actions';

const FacultyDetailApp = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  // const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [madalAddDepartment, setMadalAddDepartment] = useState(false);
  const [showingIndex, setShowIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(madalAddDepartment);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authUser);

  useEffect(() => {
    document.body.classList.add('right-menu');
    dispatch(
      getFacultyDetail(
        currentUser.roles === '3' ? currentUser.tracking : match.params.url
      )
    );
    dispatch(
      getDepartmentsList(
        currentUser.roles === '3' ? currentUser.tracking : match.params.url
      )
    );
    dispatch(
      getSpeechList(
        currentUser.roles === '3' ? currentUser.tracking : match.params.url
      )
    );
    return () => {
      document.body.classList.remove('right-menu');
    };
  }, []);

  const { faculty, loading } = useSelector((state) => state.facultyDetailsApp);
  const { departmentsItems } = useSelector((state) => state.departmentListApp);
  const { SpeechItems } = useSelector((state) => state.speechListApp);

  return (
    <>
      <Row className="survey-app">
        <Colxx xxs="12">
          <h1>
            <i className="simple-icon-refresh heading-icon" />{' '}
            <span className="align-middle d-inline-block pt-1">
              {faculty && faculty.facultyTitle}
            </span>
          </h1>
          <div className="text-zero top-right-button-container">
            {/* <ButtonDropdown
              className="top-right-button top-right-button-single"
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <Button outline className="flex-grow-1" size="lg" color="primary">
                النماذج
              </Button>
              <DropdownToggle
                size="lg"
                className="dropdown-toggle-split btn-lg"
                caret
                outline
                color="primary"
              />
              <DropdownMenu left>
                <DropdownItem>
                  <a
                    href="/uploads/subjects/attendance.pdf"
                    outline
                    color="primary"
                    className="mb-5"
                    target="_blank"
                  >
                    <i className="simple-icon-user-following btn-group-icon m-2" />{' '}
                    <IntlMessages id="subject.att" />
                  </a>
                </DropdownItem>
                <DropdownItem>
                  <a
                    href="/uploads/subjects/exam.pdf"
                    outline
                    color="primary"
                    className="mb-5"
                    target="_blank"
                  >
                    <i className="simple-icon-user-following btn-group-icon m-2" />{' '}
                    <IntlMessages id="subject.exam" />
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown> */}
          </div>

          <Breadcrumb match={match} />

          {loading ? (
            <>
              <Nav tabs className="separator-tabs ml-0 mb-5">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === 'details',
                      'nav-link': true,
                    })}
                    location={{}}
                    to="#"
                    onClick={() => setActiveTab('details')}
                  >
                    بيانات الكلية
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    location={{}}
                    to="#"
                    className={classnames({
                      active: activeTab === 'results',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('results')}
                  >
                    نتائج الطالب
                  </NavLink>
                </NavItem> */}
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="details">
                  <Row>
                    <FacultyDetailCard faculty={faculty} />

                    <Colxx xxs="12" lg="8">
                      <ul className="list-unstyled mb-4">
                        {departmentsItems &&
                          departmentsItems.map((item, index) => (
                            <li data-id={item._id} key={item._id}>
                              <DepartmentItem
                                order={index}
                                {...item}
                                expanded={!item.title && true}
                              />
                            </li>
                          ))}
                      </ul>

                      <div className="text-center">
                        <Button
                          outline
                          color="primary"
                          className="mt-3"
                          onClick={() => setMadalAddDepartment(true)}
                        >
                          <i className="simple-icon-plus btn-group-icon" />{' '}
                          إضافة قسم للكلية
                        </Button>
                      </div>
                      <div className="mt-4">
                        <ul className="list-unstyled mb-4">
                          {SpeechItems &&
                            SpeechItems.map((item, index) => (
                              <Card
                                className="d-flex mb-3"
                                key={`faqItem_${index}`}
                              >
                                <div className="d-flex flex-grow-1 min-width-zero">
                                  <Button
                                    color="link"
                                    className="card-body  btn-empty btn-link list-item-heading text-right text-one"
                                    onClick={() => setShowIndex(index)}
                                    aria-expanded={showingIndex === index}
                                  >
                                    {item.name} - ({item.adjective})
                                  </Button>
                                  <Button
                                    color="link"
                                    className="card-body  btn-empty btn-link list-item-heading text-left text-one"
                                    onClick={() =>
                                      dispatch(deleteSpeechItem(item._id))
                                    }
                                  >
                                    x
                                  </Button>
                                </div>
                                <Collapse isOpen={showingIndex === index}>
                                  <div
                                    className="card-body accordion-content pt-0"
                                    dangerouslySetInnerHTML={{
                                      __html: item.details,
                                    }}
                                  />
                                </Collapse>
                              </Card>
                            ))}
                        </ul>

                        <div className="text-center">
                          <Button
                            outline
                            color="primary"
                            className="mt-3"
                            onClick={() => setModalOpen(true)}
                          >
                            <i className="simple-icon-plus btn-group-icon" />{' '}
                            إضافة كلمة
                          </Button>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                </TabPane>

                {/* <TabPane tabId="results">
                  <Row>
                    <Results />
                    <SurveyCharts />
                  </Row>
                </TabPane> */}
              </TabContent>
            </>
          ) : (
            <div className="loading" />
          )}
        </Colxx>
      </Row>
      <AddSpeechModal
        // eslint-disable-next-line no-underscore-dangle
        itemId={faculty && faculty.Url}
        itemName={faculty && faculty.facultyTitle}
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />

      <AddDepartment
        tracking={faculty && faculty.Url}
        nameOFTracking={faculty && faculty.facultyTitle}
        modalOpen={madalAddDepartment}
        toggleModal={() => setMadalAddDepartment(!madalAddDepartment)}
      />
    </>
  );
};

export default FacultyDetailApp;
