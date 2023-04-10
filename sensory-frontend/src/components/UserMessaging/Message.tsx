import {useContext, useState, useEffect} from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { axiosPrivate } from '../../api/axios';
// import EditPost from './EditPost'

const Message = ({message, username}: any) => {
  const {deleteMessage} = useContext(MessageContext)
  const [show, setShow] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [sender, setSender] = useState('');
  const [id, setId] = useState(0);
  const [isSender, setIsSender] = useState(false);
  const [isReceiver, setIsReceiver] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchNames = async () => {
    const [senderResponse, receiverResponse, userIdResponse] = await Promise.all([
      axiosPrivate.get(`http://localhost:3081/api/userinformation/${message.Sender_Id}`),
      axiosPrivate.get(`http://localhost:3081/api/userinformation/${message.Receiver_Id}`),
      axiosPrivate.get(`http://localhost:3081/api/getuserid/${username}`)
    ]);
  
    setId(userIdResponse.data);
    const userId = userIdResponse.data;

    if (userId === message.Sender_Id) {
      setIsSender(true);
    }
  
    if (userId === message.Receiver_Id) {
      setIsReceiver(true);
    }
  
    const senderName = isSender ? `${senderResponse.data.UserInformation_Name} (You)` : senderResponse.data.UserInformation_Name;
    const receiverName = isReceiver ? `${receiverResponse.data.UserInformation_Name} (You)` : receiverResponse.data.UserInformation_Name;
  
    setSender(senderName);
    setReceiver(receiverName);
  };
  
  useEffect(() => {
    fetchNames();
  }, []);

  useEffect(() => {
    handleClose();
  }, [message]);

  return (
    <>
      <td>
        {message.Sender_Id === id ? `${sender} (You)` : sender}
      </td>
      <td>
        {message.Receiver_Id === id ? `${receiver} (You)` : receiver}
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