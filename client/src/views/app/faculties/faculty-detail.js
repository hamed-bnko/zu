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
  // DropdownToggle,
  // ButtonDropdown,
  // DropdownItem,
  // DropdownMenu,
} from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';

import { getFacultyDetail, getDepartmentsList } from 'redux/actions';
import FacultyDetailCard from 'components/applications/FacultyDetailCard';

// import CoursesAdded from 'containers/applications/MarksBuilder';
import AddStudentsToSubject from 'containers/subjectsContainers/Madels/AddStudentsToSubject';

const FacultyDetailApp = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');
  // const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [madalAddStudentToSubject, setMadalAddStudentToSubject] =
    useState(false);

  console.log(madalAddStudentToSubject);

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
    return () => {
      document.body.classList.remove('right-menu');
    };
  }, []);

  const { faculty, loading } = useSelector((state) => state.facultyDetailsApp);
  const { departmentsItems } = useSelector((state) => state.departmentListApp);

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
                          departmentsItems.map((department) => (
                            <li key={department._id}>{department.title}</li>
                          ))}
                      </ul>

                      <div className="text-center">
                        <Button
                          outline
                          color="primary"
                          className="mt-3"
                          onClick={() => setMadalAddStudentToSubject(true)}
                        >
                          <i className="simple-icon-plus btn-group-icon" />{' '}
                          إضافة قسم للكلية
                        </Button>
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

      <AddStudentsToSubject
        madalAddStudentToSubject={madalAddStudentToSubject}
        toggleModal={() =>
          setMadalAddStudentToSubject(!madalAddStudentToSubject)
        }
      />
    </>
  );
};

export default FacultyDetailApp;
