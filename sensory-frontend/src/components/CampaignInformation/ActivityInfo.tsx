import {useContext, useState, useEffect} from 'react';
import {ActivityContext} from '../../contexts/ActivityContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditActivity from './EditActivity';
import { axiosPrivate } from '../../api/axios';
import ActivityService from '../../services/ActivityService';
import FileDownload from 'js-file-download';
import Axios from 'axios';

const ActivityInfo = ({activity}: {activity : any}) => {
	const {deleteActivity} = useContext(ActivityContext)
	const [show, setShow] = useState(false);
		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

  useEffect(() => {
     handleClose()
  }, [activity])


	const displayAlert = async () => {
		alert("You are now registered to the event! Please check your email for more details.")
    const resUser = await axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`)
    const userId = resUser.data
    const registerObject = {
      campaign: {
        Campaign_Id: activity.CampaignInformation_Id
      },
      userid: userId
    }
    await axiosPrivate.post('http://localhost:3081/api/campaignsignup', registerObject);
	};

  const onClickChange = (e:any) => {    
    //   axiosPrivate.get(`http://localhost:3081/api/getFile/${article.ArticleInformation_Id}`).then((response) => {
    //   setFile(response.data.file);
    //   console.log("THE RESPONSE FILE" + response);
    //   saveAs(response.data);
    //  }) 
      e.preventDefault();
      // setFile(response.data.file);
      Axios({
        url: `http://localhost:3081/api/getFileActivity/${activity.CampaignInformation_Id}`,
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        console.log(res);
        FileDownload(res.data, `${activity.CampaignInformation_Url}`);
      })
      //console.log(file);
    };
		
	return (
		<>
			{/* <Link to={'/activityinfo'}> */}
    	<td>
				<a href={'/activityinfo'} target="_blank" rel="noopener noreferrer">{activity.CampaignInformation_Name}</a>
			</td> 
			<td>{activity.CampaignInformation_Description}</td>
			<td>{activity.CampaignInformation_Url}</td>
			<td>{activity.CampaignInformation_Image}</td>
			<td>{activity.partner}</td>
      <td><Button onClick={(e)=>onClickChange(e)}>Download</Button></td>
			<td><p onClick={displayAlert} style={{cursor: 'pointer', color: 'blue'}}>Join Event</p></td>
			{/* <td>
			<OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Edit
            </Tooltip>
          }>
            <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Delete
          	</Tooltip>
          }>
            <button onClick={() => deleteActivity(activity.CampaignInformation_Id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
        </OverlayTrigger>
                
      </td> */}

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditActivity theActivity={activity} />
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

export default ActivityInfo;