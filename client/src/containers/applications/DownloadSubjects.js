/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CSVLink } from 'react-csv';

import { Colxx } from 'components/common/CustomBootstrap';

import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import IntlMessages from 'helpers/IntlMessages';

const ToDepartment = ({ toggleModal, modalDownloadOpen, items }) => {
  // const headers = [{ label: ' اسم الباحث الاول', key: 'author' }];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const selectData = [
    { label: 'المقرر', value: 'subjectname', key: 'subjectname' },
    { label: 'رمز المقرر', value: 'subjectCode', key: 'subjectCode' },
    { label: 'عدد الوحدات', value: 'unit', key: 'unit' },
    { label: 'العدد الكلي لساعات', value: 'Hours', key: 'Hours' },
    {
      label: 'عدد ساعات العملي',
      value: 'practicalHours',
      key: 'practicalHours',
    },
    {
      label: 'عدد ساعات النطري',
      value: 'theoreticalHours',
      key: 'theoreticalHours',
    },
    {
      label: 'عدد ساعات التمارين',
      value: 'exercisesHours',
      key: 'exercisesHours',
    },

    { label: 'عدد المحاضرات', value: 'totalLectures', key: 'totalLectures' },
    { label: 'القسم', value: 'departmentName', key: 'departmentName' },
    { label: 'رمز القسم', value: 'department', key: 'department' },
    { label: 'السنة او الفصل', value: 'year', key: 'year' },
    { label: 'الاسبقية', value: 'precedence', key: 'precedence' },
  ];

  // const selectData = [
  //   { label: 'الرقم', value: 'ids', key: 'ids' },
  //   { label: 'الصفة', value: 'Adjective', key: 'Adjective' },
  //   { label: 'رقم الطالب', value: 'sid', key: 'sid' },
  //   { label: 'الاسم', value: 'name', key: 'name' },
  //   { label: 'الاسم باللغة الانجليزية', value: 'enname', key: 'enname' },
  //   { label: 'رقم الهاتف', value: 'phone', key: 'phone' },
  //   { label: 'البريد الالكتروني', value: 'email', key: 'email' },
  //   { label: 'الكلية', value: 'faculty', key: 'faculty' },
  //   { label: 'القسم', value: 'department', key: 'department' },
  //   { label: 'تاريخ تقديم الطلب', value: 'dateadded', key: 'dateadded' },
  //   { label: 'تم انجاز الطلب', value: 'done', key: 'done' },
  // ];

  return (
    <Modal size="lg" isOpen={modalDownloadOpen} toggle={toggleModal}>
      <ModalHeader className="text-center">
        <IntlMessages id="madel.upload-students" />
      </ModalHeader>
      <ModalBody>
        <Colxx xxs="12">
          <label>
            <IntlMessages id="form-components.students-upload" />
          </label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            isMulti
            name="form-field-name"
            value={selectedOptions}
            onChange={setSelectedOptions}
            options={selectData}
          />
        </Colxx>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          <IntlMessages id="button.cancel" />
        </Button>

        <CSVLink
          className="btn btn-dark"
          data={items}
          headers={selectedOptions}
          filename="المقررات.csv"
        >
          تحميل بيانات في ملف اكسيل
        </CSVLink>
      </ModalFooter>
    </Modal>
  );
};

export default ToDepartment;
