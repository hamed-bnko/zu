/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  Card,
  CardBody,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput,
} from 'reactstrap';
import {
  getFacultiesList,
  getSurveyListWithOrder,
  getSurveyListSearch,
  selectedFacultiesItemsChange,
} from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import FacultiesListItem from 'components/applications/FacultiesListItem';
import AddNewFacultyModal from 'containers/applications/AddNewFaculty';
import DownloadSubjects from 'containers/applications/DownloadSubjects';

import SurveyApplicationMenu from 'containers/applications/SurveyApplicationMenu';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const SurveyApp = ({
  match,
  intl,
  facultiesItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  departments,
  getSurveyListAction,
  getSurveyListWithOrderAction,
  getSurveyListSearchAction,
  selectedFacultiesItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [modalDownloadOpen, setModalDownloadOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('right-menu');
    getSurveyListAction();

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getSurveyListAction]);

  const handleCheckChange = (event, id) => {
    if (lastChecked == null) {
      setLastChecked(id);
    }

    let selectedList = Object.assign([], selectedItems);
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    selectedFacultiesItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = facultiesItems;
      const start = getIndex(id, items, 'id');
      const end = getIndex(lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedFacultiesItemsChangeAction(selectedList);
    }
  };

  const handleChangeSelectAll = () => {
    if (loading) {
      if (selectedItems.length >= facultiesItems.length) {
        selectedFacultiesItemsChangeAction([]);
      } else {
        selectedFacultiesItemsChangeAction(facultiesItems.map((x) => x.id));
      }
    }
  };

  const { messages } = intl;

  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.faculties" />
            </h1>

            {loading && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button mr-1"
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="faculty.add-new" />
                </Button>
                <ButtonDropdown
                  isOpen={dropdownSplitOpen}
                  toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
                >
                  <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      departments={departments}
                      checked={selectedItems.length >= facultiesItems.length}
                      onClick={() => handleChangeSelectAll()}
                      onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < facultiesItems.length
                              ? 'indeterminate'
                              : ''
                          }`}
                        />
                      }
                    />
                  </div>
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split btn-lg"
                  />
                  <DropdownMenu right>
                    <DropdownItem onClick={() => setModalDownloadOpen(true)}>
                      <IntlMessages id="subject.download-file" />
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            )}

            <Breadcrumb match={match} />
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => {
                setDisplayOptionsIsOpen(!displayOptionsIsOpen);
              }}
            >
              <IntlMessages id="survey.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>

            <Collapse
              id="displayOptions"
              className="d-md-block mb-2"
              isOpen={displayOptionsIsOpen}
            >
              <div className="d-block d-md-inline-block">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="survey.orderby" />
                    {orderColumn ? orderColumn.label : ''}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderColumns.map((o, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => getSurveyListWithOrderAction(o.column)}
                        >
                          {o.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages['menu.search']}
                    defaultValue={searchKeyword}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        getSurveyListSearchAction(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            <Colxx xxs="12">
              <Card className="card d-flex flex-row mb-3">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-20 w-xs-100  mb-1 mt-1">
                      <i className={`${'simple-icon-check heading-icon'}`} />
                      <span className="align-middle w-40 d-inline-block">
                        الصورة
                      </span>
                    </div>
                    <p className="mb-1 text-muted text-small w-30 w-xs-100">
                      الكلية
                    </p>
                    <p className="mb-1 text-muted text-small w-20 w-xs-100">
                      النوع
                    </p>

                    <div className="w-10 w-xs-100">عدد الطلبة</div>
                    <div className="w-10 w-xs-100">عدد المقررات</div>
                    <div className="w-10 w-xs-100">عدد القاعات</div>
                    <div className="w-10 w-xs-100">عدد الخريجين</div>
                    <p className="mb-1 text-muted text-small w-10 w-xs-100">
                      url
                    </p>
                    <div className="w-10 w-xs-100">غير دلك</div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>

            {facultiesItems ? (
              facultiesItems.map((item, index) => {
                return (
                  <FacultiesListItem
                    key={`todo_item_${index}`}
                    item={item}
                    departments={departments}
                    handleCheckChange={handleCheckChange}
                    isSelected={
                      loading ? selectedItems.includes(item.id) : false
                    }
                  />
                );
              })
            ) : (
              <div className="loading" />
            )}
          </Row>
        </Colxx>
      </Row>

      {loading && <SurveyApplicationMenu />}
      <AddNewFacultyModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
      <DownloadSubjects
        toggleModal={() => setModalDownloadOpen(!modalDownloadOpen)}
        modalDownloadOpen={modalDownloadOpen}
        items={facultiesItems}
      />
    </>
  );
};
const mapStateToProps = ({ facultiesListApp }) => {
  const {
    facultiesItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = facultiesListApp;

  return {
    facultiesItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyListAction: getFacultiesList,
    getSurveyListWithOrderAction: getSurveyListWithOrder,
    getSurveyListSearchAction: getSurveyListSearch,
    selectedFacultiesItemsChangeAction: selectedFacultiesItemsChange,
  })(SurveyApp)
);
