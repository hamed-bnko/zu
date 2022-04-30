/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
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
  Card,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import {
  getArticlesList,
  getArticlesListByTracking,
  getAdvsListWithOrder,
  getAdvsListSearch,
  selectedAdvsItemsChange,
  deleteArticlesItem,
} from 'redux/actions';

import AddNewArticleMadel from 'containers/applications/addNewArticleModal';
import SurveyApplicationMenu from 'containers/applications/SurveyApplicationMenu';

const SurveyApp = ({
  match,
  intl,
  ArticlesItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getAdvsListWithOrderAction,
  getAdvsListSearchAction,
  selectedAdvsItemsChangeAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [showingIndex, setShowIndex] = useState(0);

  const { currentUser } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('first');

    document.body.classList.add('right-menu');
    currentUser &&
    (currentUser.roles.includes('1') || currentUser.roles.includes('2'))
      ? dispatch(getArticlesList())
      : dispatch(getArticlesListByTracking(currentUser.tracking));

    return () => {
      document.body.classList.remove('right-menu');
    };
  }, [getArticlesList]);

  const handleChangeSelectAll = () => {
    if (loading) {
      if (selectedItems.length >= ArticlesItems.length) {
        selectedAdvsItemsChangeAction([]);
      } else {
        selectedAdvsItemsChangeAction(ArticlesItems.map((x) => x.id));
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
              <IntlMessages id="menu.articles" />
            </h1>

            {loading && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button mr-1"
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="add.articles" />
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
                      checked={selectedItems.length >= ArticlesItems.length}
                      onClick={() => handleChangeSelectAll()}
                      onChange={() => handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < ArticlesItems.length
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
                {ArticlesItems ? (
                  ArticlesItems.map((item, index) => (
                    <Card className="d-flex mb-3" key={`faqItem_${index}`}>
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <Button
                          color="link"
                          className="card-body  btn-empty btn-link list-item-heading text-right text-one"
                          onClick={() => setShowIndex(index)}
                          aria-expanded={showingIndex === index}
                        >
                          {item.name} - ({item.adjective})
                        </Button>
                        <Button
                          color="link"
                          className="card-body  btn-empty btn-link list-item-heading text-left text-one"
                          onClick={() => dispatch(deleteArticlesItem(item._id))}
                        >
                          x
                        </Button>
                      </div>
                      <Collapse isOpen={showingIndex === index}>
                        <div
                          className="card-body accordion-content pt-0"
                          dangerouslySetInnerHTML={{
                            __html: item.details,
                          }}
                        />
                      </Collapse>
                    </Card>
                  ))
                ) : (
                  <div className="loading" />
                )}
              </Row>
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      {loading && <SurveyApplicationMenu />}

      <AddNewArticleMadel
        // eslint-disable-next-line no-underscore-dangle
        itemId={
          currentUser &&
          (currentUser.roles.includes('1') || currentUser.roles.includes('2'))
            ? 'university'
            : currentUser.tracking
        }
        itemName={
          currentUser &&
          (currentUser.roles.includes('1') || currentUser.roles.includes('2'))
            ? 'جامعة الزاوية'
            : currentUser.nameOfTracking
        }
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
const mapStateToProps = ({ articlesListApp }) => {
  const {
    ArticlesItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  } = articlesListApp;

  return {
    ArticlesItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getAdvsListWithOrderAction: getAdvsListWithOrder,
    getAdvsListSearchAction: getAdvsListSearch,
    selectedAdvsItemsChangeAction: selectedAdvsItemsChange,
  })(SurveyApp)
);
