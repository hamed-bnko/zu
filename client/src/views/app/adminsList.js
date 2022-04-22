/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Collapse,
} from 'reactstrap';
import {
  getAdminsList,
  getAdminsListWithOrder,
  getAdminsListSearch,
  selectedAdminsItemsChange,
} from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import AdminsListItems from 'components/applications/AdminsListItems';
import AddAdmins from 'containers/applications/AddAdmin';
// import DownloadStudents from 'containers/applications/DownloadStudents';

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
  adminsItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getAdminsListAction,
  getAdminsListWithOrderAction,
  getAdminsListSearchAction,
  selectedAdminsItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalDownloadOpen, setModalDownloadOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  useEffect(() => {
    document.body.classList.add('right-menu');
    getAdminsListAction();
    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getAdminsListAction]);

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
    selectedAdminsItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = adminsItems;
      const start = getIndex(id, items, 'id');
      const end = getIndex(lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedAdminsItemsChangeAction(selectedList);
    }
  };

  const { messages } = intl;
  return (
    <>
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.admins-list" />
            </h1>
            {loading && (
              <div className="text-zero top-right-button-container">
                <div className="text-zero top-right-button-container">
                  <ButtonDropdown
                    className="top-right-button top-right-button-single"
                    isOpen={dropdownSplitOpen}
                    toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
                  >
                    <Button
                      outline
                      className="flex-grow-1"
                      size="lg"
                      color="primary"
                      onClick={() => setModalOpen(true)}
                    >
                      <IntlMessages id="admin.add-new" />
                    </Button>
                    <DropdownToggle
                      size="lg"
                      className="dropdown-toggle-split btn-lg"
                      caret
                      outline
                      color="primary"
                    />
                    <DropdownMenu right>
                      {/* <DropdownItem onClick={() => setModalDownloadOpen(true)}>
                        <IntlMessages id="students.download-file" />
                      </DropdownItem> */}
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
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
                          onClick={() => getAdminsListWithOrderAction(o.column)}
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
                        getAdminsListSearchAction(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
          <Row>
            {loading ? (
              adminsItems.map((item, index) => {
                return (
                  <AdminsListItems
                    key={`todo_item_${index}`}
                    item={item}
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
      <AddAdmins
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
      {/* <DownloadStudents
        toggleModal={() => setModalDownloadOpen(!modalDownloadOpen)}
        modalDownloadOpen={modalDownloadOpen}
        items={adminsItems}
      /> */}
    </>
  );
};
const mapStateToProps = ({ adminsListApp }) => {
  const {
    adminsItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = adminsListApp;

  return {
    adminsItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getAdminsListAction: getAdminsList,
    getAdminsListWithOrderAction: getAdminsListWithOrder,
    getAdminsListSearchAction: getAdminsListSearch,
    selectedAdminsItemsChangeAction: selectedAdminsItemsChange,
  })(SurveyApp)
);
