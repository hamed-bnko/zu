/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
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

import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';

import { addFacultiesItem } from 'redux/actions';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const AddNewSurveyModal = ({
  modalOpen,
  toggleModal,
  categories,
  addFacultiesItemAction,
  allSurveyItems,
}) => {
  const [formData, setFormData] = useState({
    facultyTitle: '',
    facultycategory: '',
    description: '',
    vision: '',
    message: '',
    objectives: '',
    SObjectives: '',
    keywords: '',
    subjects: '',
    students: '',
    rooms: '',
    alumni: '',
    Url: '',
  });
  const [Image, setImage] = useState('');

  const precedenceOptions = [];

  // eslint-disable-next-line no-unused-expressions
  allSurveyItems &&
    allSurveyItems.map((x) =>
      precedenceOptions.push({
        label: x.subjectname,
        value: x._id,
      })
    );

  const {
    facultyTitle,
    facultycategory,
    description,
    vision,
    message,
    objectives,
    SObjectives,
    keywords,
    subjects,
    students,
    rooms,
    alumni,
    Url,
  } = formData;
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
      payload.append('facultyImage', Image[i]);
    }
    payload.append('facultyTitle', facultyTitle);
    payload.append('facultycategory', facultycategory.value);
    payload.append('description', description);
    payload.append('vision', vision);
    payload.append('message', message);
    payload.append('objectives', objectives);
    payload.append('SObjectives', SObjectives);
    payload.append('keywords', keywords);
    payload.append('subjects', subjects);
    payload.append('students', students);
    payload.append('rooms', rooms);
    payload.append('alumni', alumni);
    payload.append('Url', Url);

    if (
      Image === '' ||
      facultyTitle === '' ||
      description === '' ||
      keywords === '' ||
      Url === ''
    ) {
      NotificationManager.error(
        'الصورة ، اسم الكلية ،  عن الكلية ،  الكلمات المفتاحية ، النوع    ',
        'يجب ملء الحقول المطلوبة',
        6000,
        null,
        null,
        'filled'
      );
    } else {
      addFacultiesItemAction(payload);
      setFormData({
        facultyTitle: '',
        facultycategory: '',
        description: '',
        vision: '',
        message: '',
        objectives: '',
        SObjectives: '',
        keywords: '',
        subjects: '',
        students: '',
        rooms: '',
        alumni: '',
        Url: '',
      });
      NotificationManager.success(
        'تمت اضافة موقع الكلية بجامعة الزاوية',
        'تمت العملية بنجاح',
        6000,
        null,
        null,
        ''
      );
      toggleModal();
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="faculty.add-new-title" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="faculty.image" />
        </Label>
        <Input
          multiple
          type="file"
          onChange={(event) => setImage(event.target.files)}
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.title" />
        </Label>
        <Input
          type="text"
          defaultValue={facultyTitle}
          onChange={(event) =>
            setFormData({ ...formData, facultyTitle: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.url" />
        </Label>
        <Input
          type="text"
          defaultValue={Url}
          onChange={(event) =>
            setFormData({ ...formData, Url: event.target.value })
          }
        />

        <Label className="mt-4">
          <IntlMessages id="faculty.description" />
        </Label>
        <Input
          type="text"
          defaultValue={description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.vision" />
        </Label>
        <Input
          type="text"
          defaultValue={vision}
          onChange={(event) =>
            setFormData({ ...formData, vision: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.message" />
        </Label>
        <Input
          type="text"
          defaultValue={message}
          onChange={(event) =>
            setFormData({ ...formData, message: event.target.value })
          }
        />
        <br />
        <CardTitle>
          <IntlMessages id="faculty.objectives" />
        </CardTitle>
        <ReactQuill
          theme="snow"
          value={objectives}
          onChange={(val) => setFormData({ ...formData, objectives: val })}
          modules={quillModules}
          formats={quillFormats}
        />
        <br />
        <Label className="mt-4">
          <IntlMessages id="faculty.category" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories.map((x, i) => {
            return { label: x, value: x, key: i };
          })}
          value={facultycategory}
          onChange={(val) => setFormData({ ...formData, facultycategory: val })}
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.keywords" />
        </Label>
        <Input
          type="text"
          defaultValue={keywords}
          onChange={(event) =>
            setFormData({ ...formData, keywords: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.subjects" />
        </Label>
        <Input
          type="text"
          defaultValue={subjects}
          onChange={(event) =>
            setFormData({ ...formData, subjects: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.students" />
        </Label>
        <Input
          type="text"
          defaultValue={students}
          onChange={(event) =>
            setFormData({ ...formData, students: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.rooms" />
        </Label>
        <Input
          type="text"
          defaultValue={rooms}
          onChange={(event) =>
            setFormData({ ...formData, rooms: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="faculty.alumni" />
        </Label>
        <Input
          type="text"
          defaultValue={alumni}
          onChange={(event) =>
            setFormData({ ...formData, alumni: event.target.value })
          }
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

const mapStateToProps = ({ facultiesListApp }) => {
  const { labels, categories, allSurveyItems } = facultiesListApp;
  return {
    labels,
    categories,
    allSurveyItems,
  };
};
export default connect(mapStateToProps, {
  addFacultiesItemAction: addFacultiesItem,
})(AddNewSurveyModal);
