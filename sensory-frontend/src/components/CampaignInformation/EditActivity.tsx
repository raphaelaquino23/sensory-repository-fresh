import { Form, Button } from "react-bootstrap"
import {ActivityContext} from '../../contexts/ActivityContext';
import {useContext, useState} from 'react';

const EditActivity = ({theActivity} : { theActivity: any}) =>{

	const CampaignInformation_Id = theActivity.CampaignInformation_Id;

	const [name, setName] = useState(theActivity.name);
	const [description, setDescription] = useState(theActivity.description);
	const [date, setDate] = useState(theActivity.date);
	const [topic, setTopic] = useState(theActivity.topic);
	const [partner, setPartner] = useState(theActivity.partner);

	const {updateActivity} = useContext(ActivityContext);

	const updatedActivity = {CampaignInformation_Id, name, description, date, topic, partner}

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault();
			updateActivity(CampaignInformation_Id, updatedActivity)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Activity Name *"
					name="name"
					value={name}
					onChange={(e)=> setName(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					as="textarea"
					placeholder="Activity Description *"
					rows={3} //changed row to rows
					name="description"
					value={description}
					onChange = { (e) => setDescription(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
        <Form.Control
          type="text"
          placeholder="Date"
          name="date"
          value={date}
          onChange = { (e) => setDate(e.target.value)}
          required
        />
      </Form.Group>
			<Form.Group>
        <Form.Control
          type="text"
          placeholder="Topic *"
          name="topic"
          value={topic}
          onChange = { (e) => setTopic(e.target.value)}
          required
        />
      </Form.Group>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Activity Partner *"
					name="partner"
					value={partner}
					onChange = { (e) => setPartner(e.target.value)}
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