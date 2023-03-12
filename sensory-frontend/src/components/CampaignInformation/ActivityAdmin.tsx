import {useContext, useState, useEffect} from 'react';
import {ActivityContext} from '../../contexts/ActivityContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditActivity from './EditActivity';


const Activity = ({activity} : { activity: any}) => {
  const {deleteActivity} = useContext(ActivityContext)
  const [show, setShow] = useState(false);
   
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  useEffect(() => {
     handleClose()
  }, [activity])

  const date = new Date(activity["CampaignInformation_Date"]);
  return (
    <>
      {/* <Link to={'/activityinfo'}> */}
      {/* <td>
        <a href={'/activityinfo'} target="_blank" rel="noopener noreferrer">{activity.CampaignInformation_Name}</a>
      </td> */}
      <td>{activity.CampaignInformation_Name}</td>
      <td>{activity.CampaignInformation_Description}</td>
      <td>{date.toLocaleDateString()}</td>
      <td>{activity.CampaignInformation_Url}</td>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Edit
            </Tooltip>
          }>
            <button onClick={handleShow} style={{display: 'inline-block'}} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Delete
            </Tooltip>
          }>
            <button onClick={() => deleteActivity(activity.CampaignInformation_Id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
        </OverlayTrigger>
               
      </td>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Activity
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


export default Activity;
