import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {ActivityContext} from '../../contexts/ActivityContext';
import Activity from './ActivityAdmin';
import AddActivity from './AddActivity';
import ActivityPagination from './ActivityPagination';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { display } from '@mui/system';




const ActivityList = () => {
  const {sortedActivities} = useContext(ActivityContext);

  const [listActivities, setListActivities] = useState([]);
	const [allListActivities, setAllListActivities] = useState([]);
	const [startDate,setStartDate]= useState(new Date());
	const [endDate,setEndDate]= useState(new Date());
  const [open, setOpen] = useState(false)
  const [calendar, setCalendar] = useState("Select a date")

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
    axiosPrivate.get(`http://localhost:3081/api/campaigninformation`).then((response) => {
      setListActivities(response.data);
			setAllListActivities(response.data);
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


  const handleSelect = (date: any) =>{
    const filtered = allListActivities.filter((activity) => {
			const activityDate = new Date(activity["CampaignInformation_Date"]);
			  return(activityDate>= date.selection.startDate &&
				activityDate<= date.selection.endDate);
		})
		setStartDate(date.selection.startDate);
		setEndDate(date.selection.endDate);
		setListActivities(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
		// dateFormat: "yyyy-mm-dd",
    key: 'selection',
  }


  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>Campaign <b>Activities</b></h2>
          </div>
          <div>
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Activity</span></Button>                  
          </div>
        </div>
      </div>

            {/* <div style={{display: "flex", justifyContent: "center"}}> */}
            <div style={{display: "flex", justifyContent: "center"}}>
        <input 
            className="inpt" 
            placeholder="Search" 
            style={{border: "2px solid black"}} 
            value={search} 
            onChange={handleSearchActivity}
        /> &nbsp;
        <input
            value={ calendar }
            readOnly
            onClick={ () => setOpen (open => !open)}
            style={{border: "2px solid black"}}
        />
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
        {open &&
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            staticRanges={[]}
            inputRanges={[]}
          />
        }
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
            <th>Date</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            listActivities.filter((activity: { CampaignInformation_Name: string; CampaignInformation_Description: string; CampaignInformation_Url: string;}) => { //quick fix
              if (search === "") {
                return activity
              } else if (activity.CampaignInformation_Name.toLowerCase().includes(search.toLowerCase()) ||
                        activity.CampaignInformation_Description.toLowerCase().includes(search.toLowerCase()) ||
                        activity.CampaignInformation_Url.toLowerCase().includes(search.toLowerCase())){
                          return activity
              }
                        // }).map((activity: { CampaignInformation_Id: Key | null | undefined; }) => ( //quick fix
                        //     <tr key={activity.CampaignInformation_Id}>
						// <Activity activity={activity} />
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
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddActivity />
        </Modal.Body>
      </Modal>
    </>
  );
}


export default ActivityList;
