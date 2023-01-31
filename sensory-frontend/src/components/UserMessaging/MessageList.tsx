import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import Message from './Message';
import AddMessage from './AddMessage';
import { axiosPrivate } from '../../api/axios';
// import PostPagination from './PostPagination';

const PostList = () => {
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


	// const handleShowAlert = () => {
	// 	setShowAlert(true);
	// 	setTimeout(()=> {
	// 		setShowAlert(false);
	// 	}, 2000)
	// }

	useEffect(() => {
		handleClose();

		// return () => {
		// 	handleShowAlert();
		// }
	}, [sortedMessages])

	const fetchMessages = async() => {
		axiosPrivate.get(`http://localhost:3081/api/messages/${id}`).then((response) => {
			setListMessage(response.data);
		});
	}

	useEffect(() => {
		axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`).then(response => {
			setId(response.data);
			}
		)
		fetchMessages();
	}, [id]);

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
					<div className="col-sm-6">
						<Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Compose a message</span></Button>					
					</div>
				</div>
			</div>

			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Sender</th>
						<th>Receiver</th>
						<th>Content</th>
					</tr>
				</thead>
				<tbody>
					{
						listMessage.map((message: { Message_Id: Key | null | undefined; }) => (
							<tr key={message.Message_Id}>
              	<Message message={message} />
            	</tr>
						))
					}
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
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close Button
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default PostList;