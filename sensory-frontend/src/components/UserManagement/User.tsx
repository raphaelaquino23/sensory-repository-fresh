import { useEffect, useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import UsersService from "../../services/UsersService";
import UserEdit from "./UserEdit";

const UserPage = ({ user }: { user: any }) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseDel = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const getUserTypeName = (userTypeId: number): string => {
    switch (userTypeId) {
      case 1:
        return "Therapist";
      case 2:
        return "Admin";
      case 3:
        return "Moderator";
      case 4:
        return "Regular User";
      default:
        return "Unknown";
    }
  };

  const handleClickDelete = async (userInfoId: number) => {
    console.log(userInfoId);
    UsersService.deleteUser(userInfoId);
    setShowDelete(false);
    setShow(false);
  };

  return (
    <>
      <td>{user.UserInformation_Name}</td>
      <td>{user.UserInformation_Email}</td>
      <td>{getUserTypeName(user.UserType_Id)}</td>
      <td style={{ textAlign: "right" }}>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            style={{ display: "inline-block", alignItems: "right" }}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={handleShowDelete}
            style={{ display: "inline-block", alignItems: "right" }}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Status</Tooltip>}>
          <button
            onClick={handleShow}
            style={{ display: "inline-block", alignItems: "right" }}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserEdit user={user} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              console.log(user.UserInformation_Id);
              handleClickDelete(user.UserInformation_Id);
            }}
          >
            OK
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserPage;
