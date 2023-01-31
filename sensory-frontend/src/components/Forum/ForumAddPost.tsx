import { Form, Button } from "react-bootstrap";
import { PostContext } from '../../contexts/PostContext';
import { useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { axiosPrivate } from "../../api/axios";
import ForumService from "../../services/ForumService";

const AddPost = () => {
  const [postinformation, setNewPostInformation] = useState({
    PostInformation_Title:"", PostInformation_Content: ""
  });
	const [userId, setUserId] = useState();

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setNewPostInformation({...postinformation,[e.target.name]: e.target.value});
  }

  const {PostInformation_Title, PostInformation_Content} = postinformation;

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		const res = await axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`)

		const postObject = {
			post:{
				User_Id: res.data,
			},
			postInformation:{
				PostInformation_Title: PostInformation_Title,
				PostInformation_Content: PostInformation_Content,
			},
			postStats:{
				PostStats_Upvotes: 0,
				PostStats_Clicks: 0,
			}
		}
		ForumService.create(postObject).then((returnedPost:any) => returnedPost);
		window.location.reload();
	}

  return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Post Title *"
					name="PostInformation_Title"
					value={PostInformation_Title}
					onChange = { (e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					as="textarea"
					placeholder="Post Content *"
					rows={3} //changed row to rows
					name="PostInformation_Content"
					value={PostInformation_Content}
					onChange = { (e) => onInputChange(e)}
				/>
			</Form.Group>

				<Button variant="success" type="submit">
					Add New Post
				</Button>
		</Form>
	)
}
export default AddPost;