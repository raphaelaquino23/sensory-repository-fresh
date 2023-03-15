import { Form, Button } from "react-bootstrap"
import {ActivityContext} from '../../contexts/ActivityContext';
import {useContext, useEffect, useState} from 'react';
import ActivityService from "../../services/ActivityService";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SPACE_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;
const SPACE2_REGEX = /^[A-z][A-z0-9-.,?!'_ ]{3,150}$/;

const EditActivity = ({theActivity} : { theActivity: any}) =>{

	// const CampaignInformation_Id = theActivity.CampaignInformation_Id;
	const [newActivity, setNewActivity] = useState({
		name: "",
		description: "",
		url: "",
		date: ""
	})

	const [validActivity, setValidActivity] = useState(false);
	const [validDescription, setValidDescription] = useState(false);
	const [activityFocus, setActivityFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	const [selectedFile, setSelectedFile] = useState();

	const onFileChange = (e:any) => {
		setSelectedFile(e.target.files[0]);
	};

	useEffect(() => {
		setErrMsg('');
	}, [newActivity]);

	const onInputChange = (e:any) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const { name, description, url, date } = newActivity;

  useEffect(() => {
    const result = SPACE_REGEX.test(name);
      setValidActivity(result);
  }, [name]);

  useEffect(() => {
    const result = SPACE2_REGEX.test(description);
      setValidDescription(result);
  }, [description]);

	const handleSubmit = (e: React.ChangeEvent<any>) => {
		e.preventDefault();
    const v1 = SPACE_REGEX.test(name);
    	const v2 = SPACE2_REGEX.test(description);
    		if (!v1 || !v2) {
      		setErrMsg('Invalid Entry');
      return;
  }
			
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
          style={{width: "330px"}}
          aria-invalid={validActivity ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setActivityFocus(true)}
          onBlur={() => setActivityFocus(false)}
				/>
        <p
          id='uidnote'
          className={
            activityFocus && name && !validActivity ? 'instructions' : 'offscreen'
          }
        >
        	<FontAwesomeIcon icon={faInfoCircle} />
          	Field must not be empty
        </p>
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
          style={{width: "330px"}}
          aria-invalid={validDescription ? 'false' : 'true'}
          aria-describedby='dcnote'
          onFocus={() => setActivityFocus(true)}
          onBlur={() => setActivityFocus(false)}
				/>
        <p
          id='dcnote'
          className={
             activityFocus && description && !validDescription ? 'instructions' : 'offscreen'
          }
        >
        	<FontAwesomeIcon icon={faInfoCircle} />
            Field must not be empty
        </p>
			</Form.Group>
			<Form.Group>
        <Form.Control
          type="date"
          placeholder="Date"
          name="date"
          value={date}
          onChange = { (e) => onInputChange(e)}
          required
          style={{width: "330px"}}
        />
      </Form.Group>
			<Button variant="success" type="submit" style={{width: "330px"}}>
				Edit Activity
			</Button>
		</Form>
	 )
}

export default EditActivity;