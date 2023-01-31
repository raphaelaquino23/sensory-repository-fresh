import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {ActivityContext} from '../../contexts/ActivityContext';
import Activity from './Activity';
import AddActivity from './AddActivity';
import ActivityPagination from './ActivityPagination';
import axios from 'axios';

const ActivityList = () => {
	const {sortedActivities} = useContext(ActivityContext);

	const [listActivities, setListActivities] = useState([]);

	const [showAlert, setShowAlert] = useState(false);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [activitiesPerPage] = useState(5)

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleSearchActivity = (event: React.ChangeEvent<any>) => {
		setSearch(event.target.value)
	}

	const handleShowAlert = () => {
		setShowAlert(true);
		setTimeout(()=> {
			setShowAlert(false);
		}, 2000)
	}

	useEffect(() => {
		axios.get(`http://localhost:3081/api/campaigninformation`).then((response) => {
			setListActivities(response.data);
		});
	}, []);

	useEffect(() => {
		handleClose();

		return () => {
			handleShowAlert();
		}
	}, [sortedActivities])

	const indexOfLastActivity = currentPage * activitiesPerPage;
	const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
	const currentActivities = sortedActivities.slice(indexOfFirstActivity, indexOfLastActivity);
	const totalPagesNum = Math.ceil(sortedActivities.length / activitiesPerPage);

	return (
		<>
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Campaign <b>Activities</b></h2>
					</div>
					<div className="col-sm-6">
						<input className="inpt" placeholder="Search" value={search} onChange={handleSearchActivity}></input>
						<Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Activity</span></Button>					
					</div>
				</div>
			</div>

			
			{/* if (currentActivities.length != 0) { */}
			<Alert show={showAlert} variant="success">
				Campaign Activity Updated Successfully!
			</Alert>

			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Activity Name</th>
						<th>Description</th>
						<th>Partner</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						listActivities.filter((activity: { CampaignInformation_Name: string; }) => { //quick fix
							if (search === "") {
								return activity
						} else if (activity.CampaignInformation_Name.toLowerCase().includes(search.toLowerCase())){
								return activity
						}
						}).map((activity: { CampaignInformation_Id: Key | null | undefined; }) => ( //quick fix
							<tr key={activity.CampaignInformation_Id}>
              	<Activity activity={activity} />
            	</tr>
						))
					}
				</tbody>
			</table>

			<ActivityPagination pages = {totalPagesNum}
				setCurrentPage={setCurrentPage}
				currentActivities ={currentActivities}
				sortedActivities = {sortedActivities} />

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Add Activity
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddActivity />
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

export default ActivityList;