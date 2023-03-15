import React, { useState } from "react";
import './styles//Checklist.css';
import ChecklistItem from "../components/CampaignChecklist/ChecklistItem";
import ChecklistService from "../services/ChecklistService";
import { useAuth } from "../contexts/AuthProvider";
import { Form, Button } from "react-bootstrap";

function ChecklistSchoolAge () {
  const [checkedList, setCheckedList] = useState<string[]>([]);
	const [activeItemsCount, setActiveItemsCount] = useState(0);
  const schoolData = [
		{ id: "1", value: "My child is overly sensitive to stimulation, overreacts to or does not like touch, noise, smells, etc." },
		{ id: "2", value: "My child is easily distracted in the classroom, often out of his/her seat, fidgety" },
		{ id: "3", value: "My child is easily overwhelmed at the playground, during recess and in class" },
		{ id: "4", value: "My child is slow to perform tasks" },
		{ id: "5", value: "My child has difficulty performing or avoids fine motor tasks such as handwriting" },
		{ id: "6", value: "My child appears clumsy and stumbles often, slouches in chair" },
		{ id: "7", value: "My child craves rough housing, tackling/wrestling games" },
		{ id: "8", value: "My child is slow to learn new activities" },
		{ id: "9", value: "My child is in constant motion" },
		{ id: "10", value: "My child has difficulty learning new motor tasks and prefers sedentary activities" },
		{ id: "11", value: "My child has difficulty making friends (overly aggressive or passive/withdrawn " },
		{ id: "12", value: "My child 'gets stuck' on tasks and has difficulty changing to another task" },
		{ id: "13", value: "My child confuses similar sounding words, misinterprets questions or requests" },
		{ id: "14", value: "My child has difficulty reading, especially aloud" },
		{ id: "15", value: "My child stumbles over words; speech lacks fluency, and rhythm is hesitant" },
	]
 
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

    const testResultObject = {
      awarenesstestresult: {
        Test_Id: 2, //idk what the adult test is so far but ill place as 3 for now considering adult is eldest
        User_Id: user.UserInformation_Id,
        TestResult_Description: 'School Age Test',
        TestResult_Maximum: schoolData.length, 
        TestResult_Score: activeItemsCount, 
        TestResult_Feedback: 'PLACEHOLDER',
      }
    }
    ChecklistService.create(testResultObject);
    // alert("You have selected " + activeItemsCount + " out of the " + schoolData.length + " symptoms")
    alert("Your response has been recorded.")
  }
 
	const items = schoolData.map((item, index) => {
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
			<p style={{marginTop: '-60px', marginLeft:'120px', marginRight:'120px', marginBottom: '0px'}}>
        <b>Disclaimer</b>: Many of the symptoms listed in the following categories are common to that particular age group.
					Where more than a few symptoms are found in a child, we recommend you talk to your doctor or
					for a professional experienced with
					treating Sensory Processing Disorder. 
			</p>
      <div className="card-checklist">
        <div className="card-header">
          <p className="title">Sensory Processing Disorder Checklist &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href={"/checklist-toddler"}>Infant/Toddler</a> &nbsp;&nbsp;&nbsp; <a href={"/checklist-adult"}>Adolescent/Adult</a></p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <h3>School Age Checklist</h3>
            {items}
          </div>
          
          <p style={{marginLeft: '20px'}}>Total number of symptoms checked: {activeItemsCount}</p>
          {/* <p style={{marginLeft: '20px'}}>Percent: {((activeItemsCount*100)/schoolData.length).toFixed(2)}%</p> */}
          <Button variant="success" type="submit" style={{backgroundColor: "#90b474"}}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
 
export default ChecklistSchoolAge;