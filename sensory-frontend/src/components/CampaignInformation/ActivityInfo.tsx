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
  const [disableButton, setDisableButton] = useState<boolean>(true);

  // const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  // useEffect(() => {
  //   const data = window.localStorage.getItem("MY_APP_STATE");
  //   if ( data !== null ) setDisableButton(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("MY_APP_STATE", JSON.stringify(disableButton));
  // }, [disableButton]);

  // const handleClick = (event: any) => {
  //   event.currentTarget.disabled = true;
  //   console.log(event);
  //   console.log("button clicked");
  // }

  useEffect(() => {
    const isButtonDisabled = localStorage.getItem('isButtonDisabled');
    if (isButtonDisabled) {
      setDisableButton(JSON.parse(isButtonDisabled));
    }
  }, [])

  // const handleClick = () => {
  //   setDisableButton(true);
  //   localStorage.setItem('isButtonDisabled', JSON.stringify(true));
  // }

  const displayAlert = async (event: any) => {
    // event.currentTarget.disabled = true;
    // setDisableButton(event.currentTarget.disabled)
  // localStorage.setItem("name", event.currentTarget.disabled );
    // setDisableButton(true);
    setDisableButton(false);
    localStorage.setItem('isButtonDisabled', JSON.stringify(true));
    console.log(event);
    console.log("button clicked");
    alert("You have successfully joined this campaign! Please check the poster for more details.")
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

  // useEffect(() => {
  //   const data = window.localStorage.getItem("MY_APP_STATE");
  //   if ( data !== null ) setDisableButton(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("MY_APP_STATE", JSON.stringify(disableButton));
  // }, [disableButton]);


  const onClickChange = (e:any) => {    
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
   
  const date = new Date(activity["CampaignInformation_Date"]);  
  return (
    <>
      <td>
        <a href={activity.CampaignInformation_Url} target="_blank" rel="noopener noreferrer">{activity.CampaignInformation_Name}</a>
      </td>
      <td>{activity.CampaignInformation_Description}</td>
      <td>{date.toLocaleDateString()}</td>
      <td><Button onClick={(e)=>onClickChange(e)}>Download</Button></td>
      {/* {disableButton ? null : (
        <td><Button onClick={displayAlert} style={{cursor: 'pointer', color: 'white'}}>Join Event</Button></td>
      )}  */}
      <td><Button onClick={displayAlert} disabled={disableButton} style={{cursor: 'pointer', color: 'white'}}>{disableButton ? 'Join Event' : 'Join Event'}</Button></td>
    
      


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