/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Modal } from 'reactstrap';
import StepsAddDepartment from 'containers/wizard/StepsAddDepartment';

const AddStudent = ({ toggleModal, modalOpen, tracking, nameOFTracking }) => {
  return (
    <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
      <StepsAddDepartment
        toggleModal={toggleModal}
        tracking={tracking}
        nameOFTracking={nameOFTracking}
      />
    </Modal>
  );
};

export default AddStudent;
