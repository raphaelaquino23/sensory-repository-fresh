import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {ActivityContext} from '../../contexts/ActivityContext';
import ActivityInfo from './ActivityInfo'
import AddActivity from './AddActivity';
import ActivityPagination from './ActivityPagination';
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const ActivityList = () => {
    const {sortedActivities} = useContext(ActivityContext);


    const [showAlert, setShowAlert] = useState(false);
    const [listActivities, setListActivities] = useState([]);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage] = useState(5)

    const [allListActivities, setAllListActivities] = useState([]);
	const [startDate,setStartDate]= useState(new Date());
	const [endDate,setEndDate]= useState(new Date());
    const [open, setOpen] = useState(false)
    const [calendar, setCalendar] = useState("Select a date")


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
            setAllListActivities(response.data);
        });
    }, []);


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
            <h2>
              Campaign <b>Activities</b>
            </h2>
          </div>
        </div>
      </div>

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

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>Activity Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                  listActivities.filter((activity: { CampaignInformation_Name: string; CampaignInformation_Description: string; }) => { //quick fix
                    if (search === "") {
                      return activity
                } else if (activity.CampaignInformation_Name.toLowerCase().includes(search.toLowerCase()) ||
                  activity.CampaignInformation_Description.toLowerCase().includes(search.toLowerCase())){
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