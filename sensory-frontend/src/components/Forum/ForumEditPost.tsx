import { Form, Button } from "react-bootstrap"

import {PostContext} from '../../contexts/PostContext';
import {useContext, useState, useCallback} from 'react';
import axios from "axios";

const EditPost = ({thePost} : { thePost: any}) =>{

	//const PostInformation_Id = thePost.id;

	const [postinformation, setNewPostInformation] = useState({
		PostInformation_Id: "",
    PostInformation_Title:"", PostInformation_Content: ""
  });

	const onInputChange = (e: React.ChangeEvent<any>) => {
    setNewPostInformation({...postinformation,[e.target.name]: e.target.value})
  }

	const {updatePost} = useContext(PostContext);

	const {PostInformation_Id, PostInformation_Title, PostInformation_Content} = postinformation;

	const activateAPI= useCallback(async () => {
		updatePost(PostInformation_Id, PostInformation_Title, PostInformation_Content)
		await axios.put('http://localhost:3081/api/postinformation' ,{postinformation: postinformation})
	}, [postinformation]);

	const handleSubmit = useCallback((e: React.ChangeEvent<any>) => {
		e.preventDefault();
		activateAPI();
	}, [activateAPI])

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Post ID *"
					name="PostInformation_Id"
					value={PostInformation_Id}
					onChange={ (e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Post Name *"
					name="PostInformation_Title"
					value={PostInformation_Title}
					onChange={ (e) => onInputChange(e)}
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
					onChange = {  (e) => onInputChange(e)}
					required
				/>
			</Form.Group>

			<Button variant="success" type="submit">
				Edit Post
			</Button>
			</Form>
	 )
}

export default EditPost;