/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAdminItem } from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';

import { Colxx } from '../common/CustomBootstrap';
import { adminRoot } from '../../constants/defaultValues';

const SurveyListItem = ({ item }) => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Colxx xxs="12">
      <Card className="card d-flex flex-row mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to={`${adminRoot}/students/${item._id}`}
              className="list-item-heading mb-0 truncate w-25 w-xs-100  mb-1 mt-1"
            >
              <i
                className={`${
                  item.sex === 'male'
                    ? 'simple-icon-user-female'
                    : 'simple-icon-user'
                } m-2`}
              />
              <span className="align-middle text-middle  w-25 d-inline-block">
                {item.name}
              </span>
            </NavLink>
            <p className="mb-1 text-muted text-small w-20 w-xs-100">
              {item.email}
            </p>
            <p className="mb-1 text-muted text-small w-20 w-xs-100">
              {item.roles === '1'
                ? 'مسؤول اول'
                : item.roles === '2'
                ? 'مشرف اعلامي'
                : item.roles === '3'
                ? `مشرف ${item.nameOFTracking ? item.nameOFTracking : 'كلية'}`
                : item.roles === '4'
                ? 'مشرف مكتب او مركز'
                : 'غير دلك'}
            </p>
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <Dropdown
              isOpen={dropdownBasicOpen}
              toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
              size="xs"
            >
              <DropdownToggle color="info" outline>
                <IntlMessages id="dropdowns.dropdown" />
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem
                  onClick={() => dispatch(deleteAdminItem(item._id))}
                >
                  <IntlMessages id="dropdowns.delete" />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(SurveyListItem);
