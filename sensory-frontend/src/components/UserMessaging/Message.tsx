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
  const [subject, setSubject] = useState('');
  const [id, setId] = useState(0);
  const [isSender, setIsSender] = useState(false);
  const [isReceiver, setIsReceiver] = useState(false);
		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

  const fetchNames = async() => {
    axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`).then(response => {
			setId(response.data);
      if(id === message.Sender_Id){
        setIsSender(true);
      }
      if(id === message.Receiver_Id){
        setIsReceiver(true);
      }}
		)
    axiosPrivate.get(`http://localhost:3081/api/userinformation/${message.Sender_Id}`).then(response => {
      if(isSender){
        setSender(response.data.UserInformation_Name + " (You)");
      }
      else {
        setSender(response.data.UserInformation_Name);
      }
    })
    axiosPrivate.get(`http://localhost:3081/api/userinformation/${message.Receiver_Id}`).then(response => {
      if(isReceiver){
        setReceiver(response.data.UserInformation_Name + " (You)");
      }
      else {
        setReceiver(response.data.UserInformation_Name);
      }
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
      </td>
  	</>
  )
}

export default Message;