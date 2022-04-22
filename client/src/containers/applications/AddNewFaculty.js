/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Modal } from 'reactstrap';
import StepsAddAdmin from 'containers/wizard/StepsAddFaculty';

const AddStudent = ({ toggleModal, modalOpen, categories }) => {
  return (
    <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
      <StepsAddAdmin toggleModal={toggleModal} categories={categories} />
    </Modal>
  );
};

export default AddStudent;
