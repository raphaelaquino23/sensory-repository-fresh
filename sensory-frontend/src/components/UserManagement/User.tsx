import {useContext, useState, useEffect} from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import {UserContext} from '../../contexts/UserContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const User = ({user} : { user: any}) => {
  const {deleteUser} = useContext(UserContext)
  const { userType } = useAuth();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

  return (
    <>
      <td>{user.UserInformation_Name}</td>
      <td>{user.UserInformation_Email}</td>
      <td>{user.UserType_Name}</td>
      <td>{user.User_DeactivatedStatus}</td>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Delete
            </Tooltip>
          }>
            <button onClick={() => deleteUser(user.UserInformation_Id)}  style={{display: 'inline-block'}} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
        </OverlayTrigger>      
      </td>
    </>
  )
}

export default User;