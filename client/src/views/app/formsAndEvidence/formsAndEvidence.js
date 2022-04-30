/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
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

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import {
  getFilesList,
  getAdvsListWithOrder,
  getAdvsListSearch,
  selectedAdvsItemsChange,
} from 'redux/actions';

import AddFileModal from 'containers/applications/addFileModal';
import SurveyApplicationMenu from 'containers/applications/SurveyApplicationMenu';
import IconCard from 'components/cards/FileCard';

const SurveyApp = ({
  match,
  intl,
  filesItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getFilesListAction,
  getAdvsListWithOrderAction,
  getAdvsListSearchAction,
  selectedAdvsItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.authUser);

  useEffect(() => {
    console.log('first');

    document.body.classList.add('right-menu');
    currentUser &&
    (currentUser.roles.includes('1') || currentUser.roles.includes('2'))
      ? getFilesListAction('university')
      : getFilesListAction(currentUser.tracking);

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getFilesList]);

  const handleChangeSelectAll = () => {
    if (loading) {
      if (selectedItems.length >= filesItems.length) {
        selectedAdvsItemsChangeAction([]);
      } else {
        selectedAdvsItemsChangeAction(filesItems.map((x) => x.id));
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
              <IntlMessages id="menu.forms-and-evidence" />
            </h1>

            {loading && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button mr-1"
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="add.forms-evidence" />
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
                      checked={selectedItems.length >= filesItems.length}
                      onClick={() => handleChangeSelectAll()}
                      onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < filesItems.length
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
                    <DropdownItem>
                      <IntlMessages id="survey.delete" />
                    </DropdownItem>
                    <DropdownItem>
                      <IntlMessages id="survey.another-action" />
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
                          onClick={() => getAdvsListWithOrderAction(o.column)}
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
                        getAdvsListSearchAction(e.target.value);
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
              <Row className="icon-cards-row mb-2">
                {loading ? (
                  filesItems.map((item, index) => {
                    return (
                      <Colxx xxs="6" sm="4" key={`icon_card_${index}`}>
                        <IconCard
                          {...item}
                          icon="simple-icon-docs"
                          className="mb-4"
                        />
                      </Colxx>
                    );
                  })
                ) : (
                  <div className="loading" />
                )}
              </Row>
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      {loading && <SurveyApplicationMenu />}

      <AddFileModal
        // eslint-disable-next-line no-underscore-dangle
        itemId="university"
        itemName="جامعة الزاوية"
        type={[
          { label: 'نموذج', value: 'form', key: '1' },
          { label: 'دليل', value: 'evidence', key: '2' },
        ]}
        formTitle="اضافة دليل او نموذج"
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
    </>
  );
};
const mapStateToProps = ({ filesListApp }) => {
  const {
    filesItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = filesListApp;

  return {
    filesItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getFilesListAction: getFilesList,
    getAdvsListWithOrderAction: getAdvsListWithOrder,
    getAdvsListSearchAction: getAdvsListSearch,
    selectedAdvsItemsChangeAction: selectedAdvsItemsChange,
  })(SurveyApp)
);
