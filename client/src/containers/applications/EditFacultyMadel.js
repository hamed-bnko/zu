/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Modal } from 'reactstrap';
import StepsUpdateFaculty from 'containers/wizard/StepsEditFaculty';

const AddStudent = ({ toggleModal, modalOpen, faculty }) => {
  return (
    <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
      <StepsUpdateFaculty toggleModal={toggleModal} faculty={faculty} />
    </Modal>
  );
};

export default AddStudent;
