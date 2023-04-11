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
	const [sentMessages, setSentMessages] = useState<any[]>([]);
	const [showSent, setShowSent] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleShowSent = () => setShowSent(true);
	const handleCloseSent = () => setShowSent(false);

	useEffect(() => {
		handleClose();
		handleCloseSent();
	}, [sortedMessages])

	const fetchMessages = async() => {
		axiosPrivate.get(`http://localhost:3081/api/messages/${id}`).then((response) => {
			setListMessage(response.data);
		});
	}

	const fetchSent = async() => {
		axiosPrivate.get(`http://localhost:3081/api/sentmessages/${id}`).then((response) => {
			setSentMessages(response.data);
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
		if(id !== null){
			fetchSent();
		}
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
            <h2>
              {!showSent && <b>All Your Messages</b>}
            </h2>
            <h2>
              {showSent && <b>Your Sent Messages</b>}
            </h2>
          </div>
          <div>
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Compose a message</span>
            </Button>
          </div>
        </div>
      </div>

      <input
        className="inpt"
        placeholder="Search"
        style={{ border: "2px solid black" }}
        value={search}
        onChange={handleSearchMessage}
      />
			<br/><br/>
			{ !showSent &&
				<Button
				onClick={handleShowSent}
				className="btn btn-success"
				data-toggle="modal"
				>
				<span>Show Only Sent</span>
				</Button>
			}

			{ showSent &&
				<Button
				onClick={handleCloseSent}
				className="btn"
				data-toggle="modal"
				>
				<span>Show All</span>
				</Button>
			}

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {!showSent && listMessage
            .filter(
              (message: {
                sender: string;
                receiver: string;
                Message_Content: string;
              }) => {
                if (message) {
                  if (search === "") {
                    return message;
                  } else if (
                    message.Message_Content.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  ) {
                    return message;
                  }
                }
              }
            )
            .map((message: { Message_Id: Key | null | undefined }) => (
              <tr key={message.Message_Id}>
                <Message message={message} />
              </tr>
            ))}
					{showSent && sentMessages
            .filter(
              (message: {
                sender: string;
                receiver: string;
                Message_Content: string;
              }) => {
                if (message) {
                  if (search === "") {
                    return message;
                  } else if (
                    message.Message_Content.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  ) {
                    return message;
                  }
                }
              }
            )
            .map((message: { Message_Id: Key | null | undefined }) => (
              <tr key={message.Message_Id}>
                <Message message={message} />
              </tr>
            ))}
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
          <Modal.Title>Compose a message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMessage />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MessageList;