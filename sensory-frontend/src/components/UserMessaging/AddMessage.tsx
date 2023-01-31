import { Form, Button } from "react-bootstrap";
import { useContext, useState } from 'react';
import MessageService from "../../services/MessageService";

const AddMessage = () => {

  const [newMessage, setNewMessage] = useState({
    sender:"",
		receiver: "",
		subject: "",
		content: "",
  });

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setNewMessage({...newMessage,[e.target.name]: e.target.value})
  };

  const {sender, receiver, subject, content} = newMessage;

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

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
					placeholder=" To: *"
					name="receiver"
					value={receiver}
					onChange = { (e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder=" Subject *"
					name="subject"
					value={subject}
					onChange = { (e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					as="textarea"
					placeholder="Message *"
					rows={5} //changed row to rows
					name="content"
					value={content}
					onChange = { (e) => onInputChange(e)}
				/>
			</Form.Group>
				<Button variant="success" type="submit">
					Send
				</Button>
		</Form>
	)
}
export default AddMessage;