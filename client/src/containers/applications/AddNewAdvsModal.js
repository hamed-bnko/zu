/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';

import ReactQuill from 'react-quill';
import { NotificationManager } from 'components/common/react-notifications';

import IntlMessages from 'helpers/IntlMessages';
import { addAdvsItem } from 'redux/actions';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const initialState = {
  title: '',
  description: '',
};

const AddNewSurveyModal = ({ modalOpen, toggleModal, addSurveyItemAction }) => {
  const [state, setState] = useState(initialState);
  const [Image, setImage] = useState('');
  const { title, description } = state;
  const { currentUser } = useSelector((stat) => stat.authUser);

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
  const addNetItem = () => {
    const payload = new FormData();
    for (let i = 0; i < Image.length; i += 1) {
      payload.append('advImage', Image[i]);
    }
    payload.append('title', title);
    payload.append('description', description);
    if (currentUser && currentUser.tracking) {
      payload.append('tracking', currentUser.tracking);
      payload.append('nameOFTracking', currentUser.nameOFTracking);
    }
    if (Image === '' || title === '' || description === '') {
      NotificationManager.error(
        'كل الحقول مطلوبة',
        'يجب ملء الحقول المطلوبة',
        6000,
        null,
        null,
        'filled'
      );
    } else {
      addSurveyItemAction(payload);
      setState(initialState);
      NotificationManager.success(
        'تمت اضافة الخبر  بجامعة الزاوية',
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
        <IntlMessages id="advs.add-new" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="form.image" />
        </Label>
        <Input
          multiple
          type="file"
          onChange={(event) => setImage(event.target.files)}
        />
        <Label className="mt-4">
          <IntlMessages id="input.title" />
        </Label>
        <Input
          type="text"
          defaultValue={title}
          onChange={(event) =>
            setState({ ...state, title: event.target.value })
          }
        />
        <br />

        <CardTitle>
          <IntlMessages id="input.discription" />
        </CardTitle>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={(val) => setState({ ...state, description: val })}
          modules={quillModules}
          formats={quillFormats}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="button.cancel" />
        </Button>
        <Button color="primary" onClick={() => addNetItem()}>
          <IntlMessages id="button.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ newsListApp }) => {
  const { labels, categories } = newsListApp;
  return {
    labels,
    categories,
  };
};
export default connect(mapStateToProps, {
  addSurveyItemAction: addAdvsItem,
})(AddNewSurveyModal);
