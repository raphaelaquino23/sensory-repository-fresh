import { Form, Button } from "react-bootstrap"
import {ActivityContext} from '../../contexts/ActivityContext';
import {useContext, useState} from 'react';
import ActivityService from "../../services/ActivityService";

const EditActivity = ({theActivity} : { theActivity: any}) =>{

	// const CampaignInformation_Id = theActivity.CampaignInformation_Id;
	const [newActivity, setNewActivity] = useState({
		name: "",
		description: "",
		url: "",
		date: ""
	})
	const [selectedFile, setSelectedFile] = useState();
	// const [name, setName] = useState(theActivity.name);
	// const [description, setDescription] = useState(theActivity.description);
	// const [url, setUrl] = useState(theActivity.url);

	// const {updateActivity} = useContext(ActivityContext);

	// const updatedActivity = {CampaignInformation_Id, name, description, url}
	const onFileChange = (e:any) => {
		setSelectedFile(e.target.files[0]);
	};

	const onInputChange = (e:any) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

	const { name, description, url, date } = newActivity;

	const handleSubmit = (e: React.ChangeEvent<any>) => {
		e.preventDefault();
			
		const formData = new FormData();
    formData.append("file", selectedFile!);
	
		const activityObject = {
			campaign: {},
			campaignInformation:{
				CampaignInformation_Id: theActivity.CampaignInformation_Id,
				CampaignInformation_Name: name,
				CampaignInformation_Description: description,
			// CampaignInformation_Url: selectedFile.name
				CampaignInformation_Date: date
		},
		campaignStats:{
			CampaignStats_Clicks: 0
		},
		// fileName: selectedFile.name
	};
	// ArticleService.update(formData).then((returnedThis:any) => returnedThis);
		ActivityService.update(activityObject).then((returnedActivity:any) => returnedActivity);
    window.location.reload();
}
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Activity Name"
					name="name"
					value={name}
					onChange={(e) => onInputChange(e)}
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
					onChange={(e) => onInputChange(e)}
					required
				/>
			</Form.Group>
			<Form.Group>
        <Form.Control
          type="date"
          placeholder="Date"
          name="date"
          value={date}
          onChange = { (e) => onInputChange(e)}
          required
        />
      </Form.Group>
			<Button variant="success" type="submit">
				Edit Activity
			</Button>
			</Form>
	 )
}

export default EditActivity;