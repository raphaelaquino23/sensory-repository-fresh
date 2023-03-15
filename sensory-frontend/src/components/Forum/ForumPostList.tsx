import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {PostContext} from '../../contexts/PostContext';
import Post from './ForumPost';
import AddPost from './ForumAddPost';
import PostPagination from './ForumPagination';
import axios from 'axios';
import CreateComment from './CommentCreate';
import { axiosPrivate } from '../../api/axios';

const PostList = () => {
	const {sortedPosts} = useContext(PostContext);

	const [listPostInformation, setListPostInformation] = useState([]);

	const [showAlert, setShowAlert] = useState(false);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10)

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleSearchPost = (event: React.ChangeEvent<any>) => {
		setSearch(event.target.value)
	}

	const handleShowAlert = () => {
		setShowAlert(true);
		setTimeout(()=> {
			setShowAlert(false);
		}, 2000)
	}

	useEffect(() => {
		handleClose();

		return () => {
			handleShowAlert();
		}
	}, [sortedPosts])

	useEffect(() => {
		axiosPrivate.get(`http://localhost:3081/api/postinformation`).then((response) => {
			setListPostInformation(response.data);
		});
	}, []);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
	const totalPagesNum = Math.ceil(sortedPosts.length / postsPerPage);

	return (
		<>
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Post <b>Repository</b></h2>
					</div>
					<div>
						<Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Post</span></Button>					
					</div>
				</div>
			</div>

			<input 
                className="inpt" 
                placeholder="Search" 
                style={{border: "2px solid black"}} 
                value={search} 
                onChange={handleSearchPost}
      		/>
			<Alert show={showAlert} variant="success">
				Post Repository Updated Successfully!
			</Alert>

			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Name</th>
						{/* <th>Content</th>
						<th>Actions</th> */}
					</tr>
				</thead>
				<tbody>
					{
						listPostInformation.filter((post: { PostInformation_Title: string; }) => { //quick fix
							if (search === "") {
								return post
						} else if (post.PostInformation_Title.toLowerCase().includes(search.toLowerCase())){
								return post
						}
						}).map((post: { PostInformation_Id: Key | null | undefined; }) => ( //quick fix
							<tr key={post.PostInformation_Id}>
              	<Post post={post} />
            	</tr>
						))
					}
				</tbody>
			</table>
  
			<PostPagination pages = {totalPagesNum}
				setCurrentPage={setCurrentPage}
				currentPosts ={currentPosts}
				sortedPosts = {sortedPosts} />

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Add Post
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddPost />
				</Modal.Body>
			</Modal>

		</>
	)
}

export default PostList;