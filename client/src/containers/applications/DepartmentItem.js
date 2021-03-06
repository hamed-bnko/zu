/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Card, Button, Collapse } from 'reactstrap';
// import DeleteSubjectFromStudent from './DeleteSubjectFromStudent';

const SurveyQuestionBuilder = ({
  // _id,
  order,
  description,
  title,
  Url,
  vision,
  message,
  objectives,
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
}) => {
  const [collapse, setCollapse] = useState(false);
  // const [madalDeleteSubjectFromStudent, setMadalDeleteSubjectFromStudent] =
  //   useState(false);

  return (
    <Card className={`question d-flex mb-4 `}>
      <div className="d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
            <span className="heading-number d-inline-block">{order + 1}</span>
            {title}
          </div>
        </div>
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
          <Button
            outline
            color="theme-3"
            className="icon-button ml-1 edit-button"
            // onClick={() => editClick()}
          >
            <i className="simple-icon-pencil" />
          </Button>

          <Button
            outline
            color="theme-3"
            className="icon-button ml-1 view-button no-border"
            // onClick={() => viewClick()}
          >
            <i className="simple-icon-eye" />
          </Button>

          <Button
            outline
            color="theme-3"
            className={`icon-button ml-1 rotate-icon-click ${
              collapse ? 'rotate' : ''
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <i className="simple-icon-arrow-down" />
          </Button>

          <Button
            outline
            color="theme-3"
            className="icon-button ml-1"
            // onClick={() => setMadalDeleteSubjectFromStudent(true)}
          >
            <i className="simple-icon-ban" />
          </Button>
        </div>
      </div>

      <Collapse isOpen={collapse}>
        <div className="card-body pt-0">
          <div className="view-mode">?????? ???????????? : {Url}</div>
          <div className="view-mode"> ???????? ?????????????? : {studySystem}</div>
          <div className="view-mode"> ?????????? ???????????? : {graduationProject}</div>
          <div className="view-mode">????????????</div>
          <p>{vision}</p>
          <div className="view-mode">??????????????</div>
          <p>{message}</p>
          <div className="view-mode">??????????????</div>
          <p dangerouslySetInnerHTML={{ __html: objectives }} />
          <div className="view-mode">???? ??????????</div>
          <p>{description}</p>
          <div className="view-mode"> ?????? ???????????? : {students}</div>
          <div className="view-mode"> ?????? ???????????????? : {subjects}</div>
          <div className="view-mode"> ?????? ???????????????? : {alumni}</div>
          <div className="view-mode"> ?????? ???????????????? : {members}</div>
          <div className="view-mode"> ?????? ?????????????? : {rooms}</div>
          <div className="view-mode"> ?????? ?????????? ?????????????? : {studyYears}</div>
          <div className="view-mode"> ?????????????? : {address}</div>
          <div className="view-mode"> ???????????? : {phone}</div>
          <div className="view-mode"> ???????????? 2 : {mobile}</div>
          <div className="view-mode"> ???????????? ???????????????????? : {email}</div>
          <div className="view-mode"> ???????????? : {webLink}</div>
          <div className="view-mode"> ?????????? ?????? : {facebook}</div>
          <div className="view-mode"> linkedin : {linkedin}</div>
          <div className="view-mode"> twitter : {twitter}</div>
          <div className="view-mode"> youtube : {youtube}</div>
          <div className="view-mode"> instagram : {instagram}</div>
        </div>
      </Collapse>
      {/* <DeleteSubjectFromStudent
        subjectname={subjectname}
        subjectId={_id}
        student={student}
        madalDeleteSubjectFromStudent={madalDeleteSubjectFromStudent}
        toggleModal={() =>
          setMadalDeleteSubjectFromStudent(!madalDeleteSubjectFromStudent)
        }
      /> */}
    </Card>
  );
};
export default SurveyQuestionBuilder;
