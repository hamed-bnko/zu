/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useDispatch } from 'react-redux';
import { deleteFileItem } from '../../redux/filesList/actions';

const IconCard = ({
  className = 'mb-4',
  _id,
  icon,
  title,
  file,
  nameOFTracking,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`icon-row-item ${className}`}>
      <Card>
        <a href={file} target="_blank" rel="noreferrer">
          <CardBody className="text-center pb-0">
            <i className={icon} />
            <p className="card-text font-weight-semibold mb-0">
              <IntlMessages id={nameOFTracking} />
            </p>
            <p className="lead text-center mb-0">{title}</p>
          </CardBody>
        </a>
        <i
          style={{ fontSize: '1.3rem', color: 'red' }}
          className="simple-icon-trash pl-3"
          onClick={() => dispatch(deleteFileItem(_id))}
        />
      </Card>
    </div>
  );
};

export default React.memo(IconCard);
