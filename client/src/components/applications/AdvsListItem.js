import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Badge,
  CardImg,
  CardSubtitle,
  // CardText,
  Row,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditAdvsModal from 'containers/applications/EditAdvsModal';

import { updateAdvsItem } from 'redux/actions';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../common/CustomBootstrap';
import DeleteAdv from './DeleteAdv';
import AddFileModal from '../../containers/applications/addFileModal';

const SurveyListItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [madalDeleteAdv, setMadalDeleteAdv] = useState(false);
  const [madalAddFile, setMadalAddFile] = useState(false);
  const dispatch = useDispatch();
  return (
    <Colxx sm="6" lg="4" xl="4" className="mb-3" key={item.id}>
      <ContextMenuTrigger id="menu_id" data={item.id}>
        <Card>
          <div className="position-relative">
            <NavLink to={`?p=${item.id}`} className="w-40 w-sm-100">
              <CardImg top alt={item.title} src={item.image} />
            </NavLink>
            <Badge
              color={item.statusColor}
              pill
              className="position-absolute badge-top-left"
            >
              {item.status}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="10" className="mb-3 text-justify">
                <CardSubtitle>{item.title}</CardSubtitle>
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{
                    __html: item.description.substr(0, 150),
                  }}
                />
                <Button
                  outline
                  color="theme-3"
                  className="icon-button ml-1 edit-button"
                  onClick={() => setModalOpen(true)}
                >
                  <i className="simple-icon-pencil" />
                </Button>
                <Button
                  outline
                  color="theme-3"
                  className="icon-button ml-1 edit-button"
                  onClick={() => setMadalDeleteAdv(true)}
                >
                  <i className="simple-icon-trash" />
                </Button>
                <Button
                  outline
                  color="theme-3"
                  className="icon-button ml-1 edit-button"
                  // eslint-disable-next-line prettier/prettier
                  onClick={() =>
                    // eslint-disable-next-line no-underscore-dangle
                    dispatch(updateAdvsItem({ id: item._id, show: !item.show }))
                  }
                >
                  {item.show ? (
                    <i className="simple-icon-ban" />
                  ) : (
                    <i className="simple-icon-eye" />
                  )}
                </Button>
                <Button
                  outline
                  color="theme-3"
                  className="icon-button ml-1 edit-button"
                  onClick={() => setMadalAddFile(true)}
                >
                  <i className="simple-icon-paper-clip" />
                </Button>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
      <EditAdvsModal
        item={item}
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
      />
      <AddFileModal
        // eslint-disable-next-line no-underscore-dangle
        itemId={item._id}
        itemName={item.title}
        toggleModal={() => setMadalAddFile(!madalAddFile)}
        modalOpen={madalAddFile}
      />
      <DeleteAdv
        item={item}
        toggleModal={() => setMadalDeleteAdv(!madalDeleteAdv)}
        modalOpen={madalDeleteAdv}
      />
    </Colxx>
  );
};

export default React.memo(SurveyListItem);
