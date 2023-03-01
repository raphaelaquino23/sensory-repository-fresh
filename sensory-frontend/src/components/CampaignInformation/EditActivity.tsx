import { Form, Button } from "react-bootstrap"
import {ActivityContext} from '../../contexts/ActivityContext';
import {useContext, useState} from 'react';

const EditActivity = ({theActivity} : { theActivity: any}) =>{

	const CampaignInformation_Id = theActivity.CampaignInformation_Id;

	const [selectedFile, setSelectedFile] = useState();
	const [name, setName] = useState(theActivity.name);
	const [description, setDescription] = useState(theActivity.description);
	const [url, setUrl] = useState(theActivity.url);

	const {updateActivity} = useContext(ActivityContext);

	const updatedActivity = {CampaignInformation_Id, name, description, url}
	const onFileChange = (e:any) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault();
			updateActivity(CampaignInformation_Id, updatedActivity)
	}

	const formData = new FormData();
    // formData.append("file", selectedFile);

	const activityObject = {
		campaign: {},
		campaignInformation:{
			CampaignInformation_Name: name,
			CampaignInformation_Description: description,
			// CampaignInformation_Url: selectedFile.name
		},
		campaignStats:{
			CampaignStats_Clicks: 0
		},
		// fileName: selectedFile.name
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Activity Name"
					name="name"
					value={name}
					onChange={(e)=> setName(e.target.value)}
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
					onChange = { (e) => setDescription(e.target.value)}
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
				Edit Activity
			</Button>
			</Form>
	 )
}

export default EditActivity;