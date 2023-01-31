import React, { useState } from "react";
import './styles//Checklist.css';
import ChecklistItem from "../components/CampaignChecklist/ChecklistItem";
import ChecklistService from "../services/ChecklistService";
import { useAuth } from "../contexts/AuthProvider";

function ChecklistToddler () {
  const [checkedList, setCheckedList] = useState<string[]>([]);
	const [activeItemsCount, setActiveItemsCount] = useState(0);
  const listData = [
    { id: "1", value: "My infant/toddler has problems eating" },
    { id: "2", value: "My infant/toddler refused to go to anyone but me" },
    { id: "3", value: "My infant/toddler has trouble falling asleep or staying asleep." },
    { id: "4", value: "My infant/toddler is extremely irritable when I dress him/her; seems to be uncomfortable in clothes" },
    { id: "5", value: "My infant/toddler rarely plays with toys, especially those requiring dexterity" },
    { id: "6", value: "My infant/toddler has difficulty shifting focus from one object/activity to another" },
		{ id: "7", value: "My infant/toddler does not notice pain or is slow to respond when hurt" },
		{ id: "8", value: "My infant/toddler resists cuddling, arches back away from the person holding him" },
		{ id: "9", value: "My infant/toddler cannot calm self by sucking on a pacifier, looking at toys, or listening to my voice" },
		{ id: "10", value: "My infant/toddler has a 'floppy' body, bumps into things and has poor balance" },
		{ id: "11", value: "My infant/toddler does little or no babbling, vocalizing" },
		{ id: "12", value: "My infant/toddler is easily startled" },
		{ id: "13", value: "My infant/toddler is extremely active and is constantly moving body/limbs or runs endlessly" },
		{ id: "14", value: " My infant/toddler seems to be delayed in crawling, standing, walking or running" },
  ];

  
  const { user, userType } = useAuth();
 
  const handleSelect = (event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
 
    if (isChecked) {
      setCheckedList([...checkedList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    const testResultObject = {
      awarenesstestresult: {
        Test_Id: 1, //idk what the adult test is so far but ill place as 3 for now considering adult is eldest
        User_Id: user.UserInformation_Id,
        TestResult_Description: 'Toddler Test',
        TestResult_Maximum: listData.length, 
        TestResult_Score: activeItemsCount, 
        TestResult_Feedback: 'PLACEHOLDER',
      }
    }
    ChecklistService.create(testResultObject);
  }
 
	const items = listData.map((item, index) => {
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
			<p style={{marginTop: '-10px', marginLeft:'120px', marginRight:'120px', marginBottom: '0px'}}>Many of the symptoms listed in the following categories are common to that particular age group.
					Where more than a few symptoms are found in a child, we recommend you talk to your doctor or
					for a professional experienced with
					treating Sensory Processing Disorder. *
			</p>
      <div className="card-checklist">
        <div className="card-header">
          <p className="title">Sensory Processing Disorder Checklist &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href={"/checklist-schoolage"}>School Age</a> &nbsp;&nbsp;&nbsp; <a href={"/checklist-adult"}>Adolescent/Adult</a></p>
					{/* <p className="toddler">Infant/Toddler</p> */}
        </div>
 
        {/* <div className="list-container">
          <label>You Selected:</label>
          {checkedList.map((item, index) => {
            return (
              <div className="chip">
                <p className="chip-label">{item}</p>
              </div>
            );
          })}
        </div> */}
 
				{/* Toddler */}
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <h3>Infant/Toddler Checklist</h3>
            {items}
          </div>
          
          <p style={{marginLeft: '20px'}}>Total number of symptoms checked: {activeItemsCount}</p>
          <p style={{marginLeft: '20px'}}>Percent: {(activeItemsCount*100)/listData.length}%</p>
          <button style={{marginTop: '0px', marginBottom: '10px', marginLeft: '24px'}}>Submit</button>
        </form>
      </div>
    </div>
  );
}
 
export default ChecklistToddler;