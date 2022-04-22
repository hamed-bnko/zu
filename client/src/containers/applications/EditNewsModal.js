/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { updateNewsItem } from 'redux/actions';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const AddNewSurveyModal = ({
  item,
  modalOpen,
  toggleModal,
  updateNewsItemAction,
}) => {
  const [state, setState] = useState({
    id: item._id,
    title: item.title,
    description: item.description,
  });
  const { title, description } = state;

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
    if (title === '' || description === '') {
      NotificationManager.error(
        'كل الحقول مطلوبة',
        'يجب ملء الحقول المطلوبة',
        6000,
        null,
        null,
        'filled'
      );
    } else {
      updateNewsItemAction(state);
      NotificationManager.success(
        'تمت التعديل علي الخبر  بجامعة الزاوية',
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
        <IntlMessages id="news.edit-title" />
      </ModalHeader>
      <ModalBody>
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
          <IntlMessages id="button.edit" />
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
  updateNewsItemAction: updateNewsItem,
})(AddNewSurveyModal);
