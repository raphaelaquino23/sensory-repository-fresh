// @ts-nocheck
import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import ActivityService from "../../services/ActivityService";
import ArticleService from "../../services/ArticleService";

const AddActivity = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [newActivity, setNewActivity] = useState({
		name: "",
		description: "",
		url: "",
	});
	
	const onInputChange = (e: any) => { 
		setNewActivity({...newActivity,[e.target.name]: e.target.value})
	};

	  //File is selected from the form here
	const onFileChange = (e:any) => {
		setSelectedFile(e.target.files[0]);
	};

	const { name, description, url } = newActivity;

	const handleSubmit = async (e:any) => {
    e.preventDefault();

				
    const formData = new FormData();
    formData.append("file", selectedFile);

    

		const activityObject = {
			campaign: {},
			campaignInformation:{
				CampaignInformation_Name: name,
				CampaignInformation_Description: description,
				CampaignInformation_Url: selectedFile.name
			},
			campaignStats:{
				CampaignStats_Clicks: 0
			},
			fileName: selectedFile.name
		}

    ArticleService.upload(formData).then((returnedThis) => console.log(returnedThis));
		ActivityService.create(activityObject).then((returnedActivity) => console.log(returnedActivity));
  };

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Activity Name *"
					name="name"
					value={name}
					onChange = { (e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					as="textarea"
					placeholder="Activity Description"
					rows={3} //changed row to rows
					name="description"
					value={description}
					onChange = { (e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
        <Form.Control
          type="file"
          formEncType="multipart/form-data"
          placeholder="file"
          name="file"
		  accept=".jpg, .png"
		  onChange = { (e) => onFileChange(e)}
        />
      </Form.Group>
				<Button variant="success" type="submit">
					Add New Activity
				</Button>
		</Form>
	)
}

export default AddActivity;