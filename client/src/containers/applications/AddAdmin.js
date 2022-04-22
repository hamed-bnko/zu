/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Modal } from 'reactstrap';
import StepsAddAdmin from 'containers/wizard/StepsAddAdmin';
import { useDispatch } from 'react-redux';
import { getFacultiesList } from 'redux/actions';

const AddStudent = ({ toggleModal, modalOpen }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFacultiesList());
  }, []);
  return (
    <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
      <StepsAddAdmin toggleModal={toggleModal} />
    </Modal>
  );
};

export default AddStudent;
