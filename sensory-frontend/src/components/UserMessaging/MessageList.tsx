import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import Message from './Message';
import AddMessage from './AddMessage';
import { axiosPrivate } from '../../api/axios';
// import PostPagination from './PostPagination';

const MessageList = () => {
	const {sortedMessages} = useContext(MessageContext);

	const [listMessage, setListMessage] = useState<any[]>([]);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [messagesPerPage] = useState(10)
	const [id, setId] = useState<any>(null);
	const [filteredMessages, setFilteredMessages] = useState<any[]>([]);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	useEffect(() => {
		handleClose();
	}, [sortedMessages])

	const fetchMessages = async() => {
		axiosPrivate.get(`http://localhost:3081/api/messages/${id}`).then((response) => {
			setListMessage(response.data);
		});
	}

	const handleSearchMessage = (event: React.ChangeEvent<any>) => {
		setSearch(event.target.value)
	  }

	useEffect(() => {
		axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`).then(response => {
			setId(response.data);
			}
		)
		fetchMessages();
	}, [id]);

	useEffect(() => {
		fetchMessages();
	}, [])

	const indexOfLastMessage = currentPage * messagesPerPage;
	const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
	const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);
	const totalPagesNum = Math.ceil(sortedMessages.length / messagesPerPage);

	return (
		<>
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2><b>Messages</b></h2>
					</div>
					<div>
						<Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Compose a message</span></Button>					
					</div>
				</div>
			</div>

			<input 
                className="inpt" 
                placeholder="Search" 
                style={{border: "2px solid black"}} 
                value={search} 
                onChange={handleSearchMessage}
      />

			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Sender</th>
						<th>Receiver</th>
						<th>Content</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{listMessage
            .filter((message: { sender: string, receiver: string, Message_Content: string }) => {
              if(message) {
                if (search === "") {
                  return message;
                } else if (
                    // message.sender.toLowerCase().includes(search.toLowerCase()) ||
                    // message.receiver.toLowerCase().includes(search.toLowerCase()) ||
                    message.Message_Content.toLowerCase().includes(search.toLowerCase())
                ) {
                  return message;
                }
              }
            })
            .map(
              (
                message: { Message_Id: Key | null | undefined}
              ) => (
                <tr key={message.Message_Id}>
                  <Message message={message} />
                </tr>
              )
            )}
					{/* {
						listMessage.map((message: { Message_Id: Key | null | undefined; }) => (
							<tr key={message.Message_Id}>
              	<Message message={message} />
            	</tr>
						))
					} */}
				</tbody>
			</table>

			{/* <PostPagination pages = {totalPagesNum}
				setCurrentPage={setCurrentPage}
				currentPosts ={currentPosts}
				sortedPosts = {sortedPosts} /> */}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Compose a message
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddMessage />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default MessageList;