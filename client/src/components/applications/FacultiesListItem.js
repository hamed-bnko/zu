/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Card, CardBody, Badge, CustomInput, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import EditFacultyModal from 'containers/applications/EditFacultyMadel';

import { Colxx } from '../common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';

const SurveyListItem = ({ item, handleCheckChange, isSelected }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Colxx xxs="12">
      <Card className="card d-flex flex-row mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to={`${adminRoot}/faculties/${item.Url}`}
              className="d-flex"
            >
              <img
                alt={item.facultyTitle}
                src={item.image}
                className="list-thumbnail responsive border-0 card-img-left"
                width="80"
              />
            </NavLink>
            <NavLink
              to={`${adminRoot}/faculties/${item.Url}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1  ml-2 mt-1"
            >
              <span className="align-middle w-40 d-inline-block">
                {' '}
                {item.facultyTitle}
              </span>
            </NavLink>

            <p className="mb-1 text-muted text-small w-20 w-xs-100">
              {item.facultycategory}
            </p>

            <div className="w-10 w-xs-100">
              <Badge color={item.labelColor} pill>
                {item.students}
              </Badge>
            </div>
            <div className="w-10 w-xs-100">
              <Badge color="success" pill>
                {item.subjects}
              </Badge>
            </div>
            <div className="w-10 w-xs-100">
              <Badge color="success" pill>
                {item.rooms}
              </Badge>
            </div>
            <div className="w-10 w-xs-100">
              <Badge color="success" pill>
                {item.alumni}
              </Badge>
            </div>
            <p className="mb-1 text-muted text-small w-20 w-xs-100">
              {item.Url}
            </p>
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <Button
              outline
              color="theme-3"
              className="icon-button ml-1 edit-button"
              onClick={() => setModalOpen(true)}
            >
              <i className="simple-icon-pencil" />
            </Button>
          </div>

          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item._id}`}
              checked={isSelected}
              onChange={(event) => handleCheckChange(event, item._id)}
              label=""
            />
          </div>
        </div>
      </Card>
      <EditFacultyModal
        faculty={item}
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
    </Colxx>
  );
};

export default React.memo(SurveyListItem);
