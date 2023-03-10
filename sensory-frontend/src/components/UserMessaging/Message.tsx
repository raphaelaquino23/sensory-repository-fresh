import {useContext, useState, useEffect} from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { axiosPrivate } from '../../api/axios';
// import EditPost from './EditPost'

const Message = ({message} : { message: any}) => {
	const {deleteMessage} = useContext(MessageContext)
	const [show, setShow] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [sender, setSender] = useState('');
		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

  const fetchNames = async() => {
    axiosPrivate.get(`http://localhost:3081/api/userinformation/${message.Sender_Id}`).then(response => {
      setSender(response.data.UserInformation_Name);
    })
    axiosPrivate.get(`http://localhost:3081/api/userinformation/${message.Receiver_Id}`).then(response => {
      setReceiver(response.data.UserInformation_Name);
    })
  }
  useEffect(() => {
    fetchNames();
  }, [message])

  useEffect(() => {
     handleClose()
  }, [message])

  useEffect(() => {
 }, [message])
  return (
    <>
    	<td>
				{sender}
			</td>
    	<td>
				{receiver}
			</td>
      <td>
        {message.Message_Content}
      </td>
      <td>
        {/* <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Edit
            </Tooltip>
          }>
            <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
        </OverlayTrigger> */}
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Delete
          	</Tooltip>
          }>
            <button onClick={() => deleteMessage(message.id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
        </OverlayTrigger>
                
      </td>

        {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPost thePost={post} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
  	  </Modal> */}
  	</>
  )
}

export default Message;