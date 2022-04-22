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
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';

import { updateFacultiesItem } from 'redux/actions';

const EditFacultyModal = ({
  item,
  modalOpen,
  toggleModal,
  categories,
  updateSubjectAction,
  allSurveyItems,
}) => {
  const [formData, setFormData] = useState({
    id: item._id,
    facultyTitle: item.facultyTitle,
    facultycategory: item.facultycategory,
    description: item.description,
    keywords: item.keywords,
    subjects: item.subjects,
    students: item.students,
    rooms: item.rooms,
    alumni: item.alumni,
    Url: item.Url,
  });

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
    keywords,
    subjects,
    students,
    rooms,
    alumni,
    Url,
  } = formData;

  const addNetItem = () => {
    if (
      facultyTitle === '' ||
      description === '' ||
      keywords === '' ||
      Url === ''
    ) {
      console.log('all faild required');
    } else {
      updateSubjectAction(formData);
      NotificationManager.success(
        'تمت اضافة موقع الكلية بجامعة الزاوية',
        'تمت العملية بنجاح',
        6000,
        null,
        null,
        ''
      );
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
        <IntlMessages id="subject.edit-title" />
      </ModalHeader>
      <ModalBody>
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
          onChange={(val) =>
            setFormData({ ...formData, facultycategory: val.value })
          }
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
          <IntlMessages id="subject.cancel" />
        </Button>
        <Button color="primary" onClick={() => addNetItem()}>
          <IntlMessages id="subject.edit-submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ surveyListApp }) => {
  const { labels, categories, departments, allSurveyItems } = surveyListApp;
  return {
    departments,
    labels,
    categories,
    allSurveyItems,
  };
};
export default connect(mapStateToProps, {
  updateSubjectAction: updateFacultiesItem,
})(EditFacultyModal);
