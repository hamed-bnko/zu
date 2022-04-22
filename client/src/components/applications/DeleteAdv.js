/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteAdvsItem } from 'redux/actions';
import { useDispatch } from 'react-redux';
import IntlMessages from 'helpers/IntlMessages';

const DeleteNews = ({ item, toggleModal, modalOpen }) => {
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(deleteAdvsItem(item._id));
    toggleModal();
  };
  return (
    <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader className="text-center">
        <IntlMessages id="madel.delete-news" />
      </ModalHeader>
      <ModalBody> هل متآكد من حذف الاعلان {item.title}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="button.cancel" />
        </Button>
        <Button color="danger" onClick={onSubmit}>
          <IntlMessages id="button.delete" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteNews;
