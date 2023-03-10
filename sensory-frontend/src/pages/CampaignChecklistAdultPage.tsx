import React, { useState } from "react";
import './styles/Checklist.css';
import ChecklistItem from "../components/CampaignChecklist/ChecklistItem";
import { useAuth } from "../contexts/AuthProvider";
import UsersService from "../services/UsersService";
import ChecklistService from "../services/ChecklistService";
import { Form, Button } from "react-bootstrap";

function ChecklistAdult () {
  const [checkedList, setCheckedList] = useState<string[]>([]);
	const [activeItemsCount, setActiveItemsCount] = useState(0);
  const adultData = [
		{ id: "1", value: " I am over-sensitive to environmental stimulation: I do not like being touched" },
		{ id: "2", value: "I avoid visually stimulating environments and/or I am sensitive to sounds" },
		{ id: "3", value: "I often feel lethargic and slow in starting my day" },
		{ id: "4", value: "I often begin new tasks simultaneously and leave many of them uncompleted" },
		{ id: "5", value: "I use an inappropriate amount of force when handling objects" },
		{ id: "6", value: "I often bump into things or develop bruises that I cannot recall" },
		{ id: "7", value: "I have difficulty learning new motor tasks, or sequencing steps of a task" },
		{ id: "8", value: "I need physical activities to help me maintain my focus throughout the day" },
		{ id: "9", value: "I have difficulty staying focused at work and in meetings" },
		{ id: "10", value: "I misinterpret questions and requests, requiring more clarification than usual" },
		{ id: "11", value: "I have difficulty reading, especially aloud" },
		{ id: "12", value: "My speech lacks fluency, I stumble over words" },
		{ id: "13", value: "I must read material several times to absorb the content" },
		{ id: "14", value: "I have trouble forming thoughts and ideas in oral presentations" },
	]

  const dummyDatabaseResponse =
    "I am over-sensitive to environmental stimulation: I do not like being touched, I avoid visually stimulating environments and/or I am sensitive to sounds, I often feel lethargic and slow in starting my day, I often begin new tasks simultaneously and leave many of them uncompleted, I use an inappropriate amount of force when handling objects, I often bump into things or develop bruises that I cannot recall, I have difficulty learning new motor tasks, or sequencing steps of a task, I need physical activities to help me maintain my focus throughout the day, I have difficulty staying focused at work and in meetings, I misinterpret questions and requests, requiring more clarification than usual, I have difficulty reading, especially aloud, My speech lacks fluency, I stumble over words, I must read material several times to absorb the content, I have trouble forming thoughts and ideas in oral presentations";

  const splicedData = dummyDatabaseResponse.split(",");
  console.log(splicedData);

  const { user, userType } = useAuth(); // retrieves user
 
  const handleSelect = (event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
 
    if (isChecked) {
      setCheckedList([...checkedList, value]);
    } else {
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(user);

    const testResultObject = {
      awarenesstestresult: {
        Test_Id: 3, //idk what the adult test is so far but ill place as 3 for now considering adult is eldest
        User_Id: user.UserInformation_Id,
        TestResult_Description: 'Adult Test',
        TestResult_Maximum: adultData.length, 
        TestResult_Score: activeItemsCount, 
        TestResult_Feedback: 'PLACEHOLDER',
      }
    }
    console.log(testResultObject);
    ChecklistService.create(testResultObject);
    alert("Your response has been recorded.")
  }
 
	const items = adultData.map((item, index) => {
    return (
			<div>
      <ChecklistItem
        key={index}
				value={item.value}
        setActiveItemsCount={setActiveItemsCount}
      />
			<label>{item.value}</label>
			</div>
    );
  });

  return (
    <div className="container">
			<p style={{marginTop: '-50px', marginLeft:'120px', marginRight:'120px', marginBottom: '0px'}}>
        <b>Disclaimer</b>: Many of the symptoms listed in the following categories are common to that particular age group.
					Where more than a few symptoms are found in a child, we recommend you talk to your doctor or
					for a professional experienced with
					treating Sensory Processing Disorder. 
			</p>
      <div className="card-checklist">
        <div className="card-header">
          <p className="title">Sensory Processing Disorder Checklist &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href={"/checklist-schoolage"}>School Age</a> &nbsp;&nbsp;&nbsp; <a href={"/checklist-toddler"}>Infant/Toddler</a></p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <h3>Adult Checklist</h3>
            {items}
          </div>
          
          <p style={{marginLeft: '20px'}}>Total number of symptoms checked: {activeItemsCount}</p>
          <p style={{marginLeft: '20px'}}>Percent: {((activeItemsCount*100)/adultData.length).toFixed(2)}%</p>
          {/* <button style={{marginTop: '0px', marginBottom: '10px', marginLeft: '24px'}}>Submit</button> */}
          <Button variant="success" type="submit" style={{backgroundColor: "#90b474"}}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
 
export default ChecklistAdult;