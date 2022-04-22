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
    { label: 'الرقم الوطني', value: 'nid', key: 'nid' },
    { label: 'رقم القيد', value: 'sid', key: 'sid' },
    { label: 'اسم الطالب', value: 'name', key: 'name' },
    { label: 'اسم الاب', value: 'fatherName', key: 'fatherName' },
    { label: 'اسم الجد', value: 'grandfather', key: 'grandfather' },
    { label: 'اللقب', value: 'surename', key: 'surename' },
    { label: 'القسم', value: 'departmentName', key: 'departmentName' },
    { label: 'الفصل الدراسي', value: 'year', key: 'year' },
    { label: 'البريد الالكتروني', value: 'email', key: 'email' },
    { label: 'رقم الهاتف', value: 'phone', key: 'phone' },

    { label: 'اسم الام', value: 'matherName', key: 'matherName' },
    { label: 'الحالة الاجتماعية', value: 'socialStatus', key: 'socialStatus' },
    { label: 'رقم جواز السفر ', value: 'passport', key: 'passport' },
    { label: 'تاريخ الميلاد', value: 'brthday', key: 'brthday' },
    { label: 'مكان الميلاد', value: 'placeOfBirth', key: 'placeOfBirth' },

    { label: 'عنوان السكن', value: 'adress', key: 'adress' },
    { label: 'المؤهل العلمي', value: 'qualification', key: 'qualification' },
    {
      label: 'تخصص المؤهل العلمي',
      value: 'specialization',
      key: 'specialization',
    },
    {
      label: 'تاريخ الحصول عليه',
      value: 'dateOfObtaining',
      key: 'dateOfObtaining',
    },
    { label: 'مكان الحصول عليه', value: 'school', key: 'school' },
    {
      label: 'نسبة النجاح',
      value: 'qualificationPercentage',
      key: 'qualificationPercentage',
    },
    {
      label: 'التقدير',
      value: 'qualificationGrade',
      key: 'qualificationGrade',
    },
    {
      label: 'رقم اقرب الاقارب',
      value: 'closestRelativesPhone',
      key: 'closestRelativesPhone',
    },
    {
      label: 'اسم اقرب الاقارب',
      value: 'closestRelatives',
      key: 'closestRelatives',
    },
  ];

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
          filename="الطلبة.csv"
        >
          تحميل بيانات في ملف اكسيل
        </CSVLink>
      </ModalFooter>
    </Modal>
  );
};

export default ToDepartment;
