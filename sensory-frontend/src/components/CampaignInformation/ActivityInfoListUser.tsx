// import { Modal, Button, Alert} from 'react-bootstrap';
// import { Key, useContext, useEffect, useState } from 'react';
// import {ActivityContext} from '../../contexts/ActivityContext';
// // import Activity from './Activity';
// import ActivityInfo from './ActivityInfo'
// import AddActivity from './AddActivity';
// import ActivityPagination from './ActivityPagination';
// import axios from 'axios';

// const ActivityList = () => {
// 	const {sortedActivities} = useContext(ActivityContext);

// 	const [showAlert, setShowAlert] = useState(false);
// 	const [listActivities, setListActivities] = useState([]);
// 	const [search, setSearch] = useState('');
// 	const [show, setShow] = useState(false);
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [activitiesPerPage] = useState(5)

// 	const handleShow = () => setShow(true);
// 	const handleClose = () => setShow(false);

// 	const handleSearchActivity = (event: React.ChangeEvent<any>) => {
// 		setSearch(event.target.value)
// 	}

// 	const handleShowAlert = () => {
// 		setShowAlert(true);
// 		setTimeout(()=> {
// 			setShowAlert(false);
// 		}, 2000)
// 	}

// 	useEffect(() => {
// 		handleClose();

// 		return () => {
// 			handleShowAlert();
// 		}
// 	}, [sortedActivities])

// 	useEffect(() => {
// 		axios.get(`http://localhost:3081/api/campaigninformation`).then((response) => {
// 			setListActivities(response.data);
// 		});
// 	}, []);

// 	const indexOfLastActivity = currentPage * activitiesPerPage;
// 	const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
// 	const currentActivities = sortedActivities.slice(indexOfFirstActivity, indexOfLastActivity);
// 	const totalPagesNum = Math.ceil(sortedActivities.length / activitiesPerPage);

// 	return (
//     <>
//       <div className="table-title">
//         <div className="row">
//           <div className="col-sm-6">
//             <h2>
//               Campaign <b>Activities</b>
//             </h2>
//           </div>
//           <div className="col-sm-6">
//             <input
//               className="inpt"
//               placeholder="Search"
// 			  style={{color: "black"}}
//               value={search}
//               onChange={handleSearchActivity}
//             ></input>
//           </div>
//         </div>
//       </div>

// 			<table className="table table-striped table-hover">
// 				<thead>
// 					<tr>
// 					<th>Activity Name</th>
// 						<th>Description</th>
// 						<th> File </th>
// 						<th>Actions</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{
// 						listActivities.filter((activity: { topic: string; }) => { //quick fix
// 							if (search === "") {
// 								return activity
// 						} else if (activity.topic.toLowerCase().includes(search.toLowerCase())){
// 								return activity
// 						}
// 						}).map((activity: { CampaignInformation_Id: Key | null | undefined; }) => ( //quick fix
// 							<tr key={activity.CampaignInformation_Id}>
//               	<ActivityInfo activity={activity} />
//             	</tr>
// 						))
// 					}
// 				</tbody>
// 			</table>

// 			<ActivityPagination pages = {totalPagesNum}
// 				setCurrentPage={setCurrentPage}
// 				currentActivities ={currentActivities}
// 				sortedActivities = {sortedActivities} />

// 			<Modal show={show} onHide={handleClose}>
// 				<Modal.Header closeButton>
// 					<Modal.Title>
// 						Add Activity
// 					</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<AddActivity />
// 				</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="secondary" onClick={handleClose}>
// 						Close Button
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</>
// 	)
// }

// export default ActivityList;

// import { Modal, Button, Alert} from 'react-bootstrap';
// import { Key, useContext, useEffect, useState } from 'react';
// import {ActivityContext} from '../../contexts/ActivityContext';
// import ActivityInfo from './ActivityInfo'
// import AddActivity from './AddActivity';
// import ActivityPagination from './ActivityPagination';
// import axios from 'axios';
// import { response } from 'express';
// import { axiosPrivate } from '../../api/axios';

// const ActivityList = () => {
// 	const {sortedActivities} = useContext(ActivityContext);

// 	const [listActivities, setListActivities] = useState([]);

// 	const [showAlert, setShowAlert] = useState(false);
// 	const [search, setSearch] = useState('');
// 	const [show, setShow] = useState(false);
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [activitiesPerPage] = useState(5)

// 	const handleShow = () => setShow(true);
// 	const handleClose = () => setShow(false);

// 	const handleSearchActivity = (event: React.ChangeEvent<any>) => {
// 		setSearch(event.target.value)
// 	}

// 	const handleShowAlert = () => {
// 		setShowAlert(true);
// 		setTimeout(()=> {
// 			setShowAlert(false);
// 		}, 2000)
// 	}

// 	useEffect(() => {
// 		handleClose();

// 		return () => {
// 			handleShowAlert();
// 		}
// 	}, [sortedActivities])

// 	useEffect(() => {
// 		axiosPrivate.get(`http://localhost:3081/api/campaigninformation`).then((response) => {
// 			setListActivities(response.data)
// 		})
// 		// axiosPrivate.get(`http://localhost:3081/api/articleinformation`).then((response) => {
// 		// 	setListArticleInformation(response.data);
// 		// });
// 	}, []);

// 	const indexOfLastActivity = currentPage * activitiesPerPage;
// 	const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
// 	const currentActivities = sortedActivities.slice(indexOfFirstActivity, indexOfLastActivity);
// 	const totalPagesNum = Math.ceil(sortedActivities.length / activitiesPerPage);

// 	return (
//     <>
//       <div className="table-title">
//         <div className="row">
//           <div className="col-sm-6">
//             <h2>
// 				Campaign <b>Activities</b>
//             </h2>
//           </div>
//           <div className="col-sm-6">
//             <input
//               className="inpt"
//               placeholder="Search"
//               style={{color: "black"}}
//               value={search}
//               onChange={handleSearchActivity}
//             ></input>
//           </div>
//         </div>
//       </div>

//       <Alert show={showAlert} variant="success">
//         Campaign Activity Updated Successfully!
//       </Alert>

//       <table className="table table-striped table-hover">
//         <thead>
//           <tr>
// 		  	<th>Activity Name</th>
// 			<th>Description</th>
//  			<th> File </th>
//  			<th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {listActivities
//             .filter((activity: { topic: string }) => {
//               if (activity) {
//                 if (search === "") {
//                   return activity;
//                 } else if (
// 					activity.topic.toLowerCase().includes(
//                     search.toLowerCase()
//                   )
//                 ) {
//                   return activity;
//                 }
//               }
//             })
//             .map(
//               (
//                 activity: { CampaignInformation_Id: Key | null | undefined }
//               ) => (
//                 <tr key={activity.CampaignInformation_Id}>
//                   <ActivityInfo activity={activity} />
//                 </tr>
//               )
//             )}
//         </tbody>
//       </table>

//       <ActivityPagination
//         pages={totalPagesNum}
//         setCurrentPage={setCurrentPage}
//         currentActivities={currentActivities}
//         sortedActivities={sortedActivities}
//       />
//     </>
//   );
// }

// export default ActivityList;

import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {ActivityContext} from '../../contexts/ActivityContext';
// import Activity from './Activity';
import ActivityInfo from './ActivityInfo'
import AddActivity from './AddActivity';
import ActivityPagination from './ActivityPagination';
import axios from 'axios';

const ActivityList = () => {
	const {sortedActivities} = useContext(ActivityContext);

	const [showAlert, setShowAlert] = useState(false);
	const [listActivities, setListActivities] = useState([]);
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
		handleClose();

		return () => {
			handleShowAlert();
		}
	}, [sortedActivities])

	useEffect(() => {
		axios.get(`http://localhost:3081/api/campaigninformation`).then((response) => {
			setListActivities(response.data);
		});
	}, []);

	const indexOfLastActivity = currentPage * activitiesPerPage;
	const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
	const currentActivities = sortedActivities.slice(indexOfFirstActivity, indexOfLastActivity);
	const totalPagesNum = Math.ceil(sortedActivities.length / activitiesPerPage);

	return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Campaign <b>Activities</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <input
              className="inpt"
              placeholder="Search"
              value={search}
              onChange={handleSearchActivity}
            ></input>
          </div>
        </div>
      </div>

			<table className="table table-striped table-hover">
				<thead>
					<tr>
					<th>Activity Name</th>
						<th>Description</th>
						<th> File </th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						listActivities.filter((activity: { topic: string; }) => { //quick fix
							if (search === "") {
								return activity
						} else if (activity.topic.toLowerCase().includes(search.toLowerCase())){
								return activity
						}
						}).map((activity: { CampaignInformation_Id: Key | null | undefined; }) => ( //quick fix
							<tr key={activity.CampaignInformation_Id}>
              	<ActivityInfo activity={activity} />
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