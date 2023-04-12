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
import { axiosPrivate } from '../../api/axios';

const ActivityList = () => {
    const {sortedActivities} = useContext(ActivityContext);


    const [showAlert, setShowAlert] = useState(false);
    const [listActivities, setListActivities] = useState([]);
    const [search, setSearch] = useState('');
    const [userId, setUserId] = useState<number>(0);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage] = useState(5)

    const [allListActivities, setAllListActivities] = useState([]);
    const [campaignList, setCampaignList] = useState([]);
    const [campaign, setCampaign] = useState([]);
	const [startDate,setStartDate]= useState(new Date());
	const [endDate,setEndDate]= useState(new Date());
    const [open, setOpen] = useState(false)
    const [calendar, setCalendar] = useState("Select a date")
    // const [joined, setJoined] = useState(true)


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // useEffect(() => {
    //     setJoined(true)
    // }, [joined])

    // useEffect(() => {
    //     const data = window.localStorage.getItem('MY_APP_STATE');
    //     if ( data !== null ) setJoined(JSON.parse(data));
    //   }, []);
    
    //   useEffect(() => {
    //     window.localStorage.setItem('MY_APP_STATE', JSON.stringify(joined));
    //   }, [joined]);

    const joined = true;

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
        axios.get(`http://localhost:3081/api/campaignlist`).then((res) => {
            setCampaignList(res.data);
        })
        axios.get(`http://localhost:3081/api/campaign`).then((res) => {
            setCampaign(res.data);
        })
        axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`).then((res) => {
            setUserId(res.data);
        })
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

    const checkCampaignExists = campaignList.find((element: {User_Id: number}) => 
    element.User_Id === userId)

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
                  //forEach CampaignList\
                  // If CampaignInformation_Id === CampaignList.CampaignInformation_Id
                  //  if User_Id === CampaignList.User_Id
                  // const existingUserNameOrEmail = users.find((element: { UserInformation_Email: string; UserInformation_Name: string }) => 
                  //if(element.UserInformation_Email === email || element.UserInformation_Name === user));
                    <tr key={activity.CampaignInformation_Id}>
                <ActivityInfo activity={activity}/>
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