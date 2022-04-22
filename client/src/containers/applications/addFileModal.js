/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';

import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';
import { addFileItem } from 'redux/actions';

const AddFileModal = ({ itemId, itemName, modalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [Image, setImage] = useState('');

  const addfile = () => {
    const payload = new FormData();
    payload.append('file', Image);
    payload.append('title', title);
    payload.append('tracking', itemId);
    payload.append('nameOFTracking', itemName);
    if (Image === '' || title === '') {
      NotificationManager.error(
        'كل الحقول مطلوبة',
        'يجب ملء الحقول المطلوبة',
        6000,
        null,
        null,
        'filled'
      );
    } else {
      dispatch(addFileItem(payload));
      setTitle('');
      NotificationManager.success(
        'تمت اضافة الملف',
        'تمت العملية بنجاح',
        6000,
        null,
        null,
        ''
      );
      toggleModal();
    }

    toggleModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="file.add-new" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="form.file" />
        </Label>
        <Input
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <Label className="mt-4">
          <IntlMessages id="input.title" />
        </Label>
        <Input
          type="text"
          defaultValue={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="button.cancel" />
        </Button>
        <Button color="primary" onClick={() => addfile()}>
          <IntlMessages id="button.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddFileModal;
