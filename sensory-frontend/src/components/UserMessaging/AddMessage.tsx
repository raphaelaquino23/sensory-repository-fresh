import { Form, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from 'react';
import MessageService from "../../services/MessageService";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SPACE_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;
const SPACE2_REGEX = /^[A-z][A-z0-9-.,?!'_ ]{3,250}$/;

const AddMessage = () => {

  const [newMessage, setNewMessage] = useState({
    sender:"",
		receiver: "",
		content: "",
  });

  const [validReceiver, setvalidReceiver] = useState(false);
  const [validContent, setvalidContent] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  
  const onInputChange = (e: React.ChangeEvent<any>) => {
    setNewMessage({...newMessage,[e.target.name]: e.target.value})
  };

  useEffect(() => {
    setErrMsg('');
  }, [newMessage]);

  const {sender, receiver, content} = newMessage;

  useEffect(() => {
    const result = SPACE_REGEX.test(receiver);
    setvalidReceiver(result);
  }, [receiver]);

  useEffect(() => {
    const result = SPACE2_REGEX.test(content);
    setvalidContent(result);
  }, [content]);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const v1 = SPACE_REGEX.test(receiver);
    const v2 = SPACE2_REGEX.test(content);
    if (!v1 || !v2 ) {
      setErrMsg('Invalid Entry');
      return;
    }

		const messageObject = {
			message: {
				Message_Content: content
			},
			SenderName : localStorage.getItem("username"),
			ReceiverName: receiver
		};
		MessageService.create(messageObject).then((returnedMessage: any) => returnedMessage)
		window.location.reload();
  };

  return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Recipient"
					name="receiver"
					style={{width: "350px"}}
					value={receiver}
					onChange = { (e) => onInputChange(e)}
					required
          aria-invalid={validReceiver ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setMessageFocus(true)}
          onBlur={() => setMessageFocus(false)}
				/>
        <p
          id='uidnote'
          className={
          messageFocus && receiver && !validReceiver ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
            Field must not be empty
        </p>
			</Form.Group>
			<Form.Group>
				<Form.Control
					as="textarea"
					placeholder="Message"
					rows={5} //changed row to rows
					name="content"
					value={content}
					style={{width: "350px"}}
					onChange = { (e) => onInputChange(e)}
					required
          aria-invalid={validContent ? 'false' : 'true'}
          aria-describedby='dcnote'
          onFocus={() => setMessageFocus(true)}
          onBlur={() => setMessageFocus(false)}
				/>
        <p
          id='dcnote'
          className={
          messageFocus && content && !validContent ? 'instructions' : 'offscreen'
          }
        >
        <FontAwesomeIcon icon={faInfoCircle} />
          Field must not be empty
          <br />
            Character must not exceed 250
        </p>
			</Form.Group>
				<Button variant="success" type="submit">
					Send
				</Button>
		</Form>
	)
}
export default AddMessage;