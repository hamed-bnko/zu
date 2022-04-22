/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import React from 'react';
import { Card, CardBody, Badge } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';

const subjectDetailCard = ({ faculty }) => {
  return (
    faculty && (
      <Colxx xxs="12" lg="4" className="mb-4">
        <Card className="mb-4">
          <CardBody>
            <img
              src={faculty.image}
              alt={faculty.facultyTitle}
              style={{ width: '100%' }}
            />
            <p className="list-item-heading text-center mt-4">بيانات الكلية</p>

            <p className="   mt-2">عنوان الكلية : {faculty.facultyTitle}</p>
            <p className="text-muted text-small mb-2"> رمز الكلية</p>
            <p className="mb-3">{faculty.Url}</p>
            <p className="text-muted text-small mb-2"> نوع الكلية</p>
            <p className="mb-3">{faculty.facultycategory}</p>
            <div>
              <p className="d-sm-inline-block mb-1">
                عدد الطلبة :
                <Badge color="primary" pill>
                  {faculty.students}
                </Badge>
              </p>
              <p className="d-sm-inline-block m-3">
                عدد الخريجين :
                <Badge color="primary" pill>
                  {faculty.alumni}
                </Badge>
              </p>
              <p className="d-sm-inline-block m-3">
                عدد الاساتذة :
                <Badge color="primary" pill>
                  {faculty.members}
                </Badge>
              </p>
              <p className="d-sm-inline-block m-3">
                عدد المقررات :
                <Badge color="primary" pill>
                  {faculty.subjects}
                </Badge>
              </p>
              <p className="d-sm-inline-block m-3">
                عدد القاعات :
                <Badge color="primary" pill>
                  {faculty.rooms}
                </Badge>
              </p>
            </div>
            <p className="text-muted text-small mb-2">رؤية الكلية</p>
            <p className="mb-3 text-justify">{faculty.vision}</p>
            <p className="text-muted text-small mb-2"> رسالة الكلية</p>
            <p className="mb-3 text-justify">{faculty.message}</p>
            <p className="text-muted text-small mb-2"> اهداف الكلية</p>
            <p
              className="mb-3 text-justify"
              dangerouslySetInnerHTML={{ __html: faculty.objectives }}
            />
            <p className="text-muted text-small mb-2"> عن الكلية</p>
            <p className="mb-3 text-justify">{faculty.description}</p>
          </CardBody>
        </Card>
      </Colxx>
    )
  );
};

export default React.memo(subjectDetailCard);
