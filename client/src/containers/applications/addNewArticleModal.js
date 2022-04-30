/* eslint-disable import/no-unresolved */
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
  CardTitle,
} from 'reactstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';
import { addArticlesItem } from 'redux/actions';

const AddFileModal = ({ itemId, itemName, modalOpen, toggleModal }) => {
  const dispatch = useDispatch();
  const [Details, setDetails] = useState('');
  const [Image, setImage] = useState('');
  const [Adjective, setAdjective] = useState('');
  const [name, setName] = useState('');
  const [Title, setTitle] = useState('');
  const [Publish, setPublish] = useState('');

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  const addfile = () => {
    const payload = new FormData();
    payload.append('image', Image);
    payload.append('adjective', Adjective);
    payload.append('name', name);
    payload.append('pleaceOfPublish', Publish);
    payload.append('title', Title);
    payload.append('details', Details);
    payload.append('tracking', itemId);
    payload.append('nameOFTracking', itemName);
    if (Image === '' || Details === '' || name === '') {
      NotificationManager.error(
        'كل الحقول مطلوبة',
        'يجب ملء الحقول المطلوبة',
        6000,
        null,
        null,
        'filled'
      );
    } else {
      dispatch(addArticlesItem(payload));
      setDetails('');
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
        <IntlMessages id="articles.add-new" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="articles.image" />
        </Label>
        <Input
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <Label className="mt-4">
          <IntlMessages id="articles.name" />
        </Label>
        <Input
          type="text"
          defaultValue={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Label className="mt-4">
          <IntlMessages id="articles.adjective" />
        </Label>
        <Input
          type="text"
          defaultValue={Adjective}
          onChange={(event) => setAdjective(event.target.value)}
        />
        <Label className="mt-4">
          <IntlMessages id="articles.placeOfPublish" />
        </Label>
        <Input
          type="text"
          defaultValue={Publish}
          onChange={(event) => setPublish(event.target.value)}
        />
        <Label className="mt-4">
          <IntlMessages id="articles.title" />
        </Label>
        <Input
          type="text"
          defaultValue={Title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <CardTitle>
          <IntlMessages id="articles.details" />
        </CardTitle>
        <ReactQuill
          theme="snow"
          value={Details}
          onChange={(val) => setDetails(val)}
          modules={quillModules}
          formats={quillFormats}
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
