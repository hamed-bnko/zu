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
  getNewsList,
  getNewsListByTracking,
  getNewsListWithOrder,
  getNewsListSearch,
  selectedNewsItemsChange,
} from 'redux/actions';

import NewsListItem from 'components/applications/NewsListItem';
import AddNewsModal from 'containers/applications/AddNewsModal';
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
  newsItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getNewsListAction,
  getNewsListByTrackingAction,
  getNewsListWithOrderAction,
  getNewsListSearchAction,
  selectedNewsItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.authUser);
  useEffect(() => {
    document.body.classList.add('right-menu');
    currentUser &&
    (currentUser.roles.includes('1') || currentUser.roles.includes('2'))
      ? getNewsListAction()
      : getNewsListByTrackingAction(currentUser.tracking);

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getNewsListAction, getNewsListByTrackingAction]);

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
    selectedNewsItemsChangeAction(selectedList);

    if (event.shiftKey) {
      let items = newsItems;
      const start = getIndex(id, items, 'id');
      const end = getIndex(lastChecked, items, 'id');
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedList.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedList));
      selectedNewsItemsChangeAction(selectedList);
    }
  };

  const handleChangeSelectAll = () => {
    if (loading) {
      if (selectedItems.length >= newsItems.length) {
        selectedNewsItemsChangeAction([]);
      } else {
        selectedNewsItemsChangeAction(newsItems.map((x) => x.id));
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
              <IntlMessages id="menu.survey" />
            </h1>

            {loading && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button mr-1"
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="news.add-new" />
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
                      checked={selectedItems.length >= newsItems.length}
                      onClick={() => handleChangeSelectAll()}
                      onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < newsItems.length
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
                          onClick={() => getNewsListWithOrderAction(o.column)}
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
                        getNewsListSearchAction(e.target.value);
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
              newsItems.map((item, index) => {
                return (
                  <NewsListItem
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

      {loading && <SurveyApplicationMenu />}
      <AddNewsModal
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
    </>
  );
};
const mapStateToProps = ({ newsListApp }) => {
  const {
    newsItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = newsListApp;

  return {
    newsItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getNewsListAction: getNewsList,
    getNewsListByTrackingAction: getNewsListByTracking,
    getNewsListWithOrderAction: getNewsListWithOrder,
    getNewsListSearchAction: getNewsListSearch,
    selectedNewsItemsChangeAction: selectedNewsItemsChange,
  })(SurveyApp)
);
