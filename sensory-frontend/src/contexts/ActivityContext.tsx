import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

type ActivityContextType = {
  addActivity?: any;
  deleteActivity?: any;
  sortedActivities?: any;
  updateActivity?: any;
};

export const ActivityContext = createContext<ActivityContextType>({}); //https://stackoverflow.com/questions/72316650/reactjs-with-typescript-template-usecontext-property-does-not-exists-on-type

const ActivityContextProvider = (props: any) => {
  const [activities, setActivities] = useState<any[]>([]);
  const history = useNavigate();

  useEffect(() => {
    setActivities(JSON.parse(localStorage.getItem('activities')!));
  }, []);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  });

  const sortedActivities = activities.sort((a, b) =>
    a.CampaignInformation_Name < b.CampaignInformation_Name ? -1 : 1
  ); //https://stackoverflow.com/questions/44147937/property-does-not-exist-on-type-never

  const addActivity = (
    CampaignInformation_Name: string,
    CampaignInformation_Description: string,
    CampaignInformation_Url: string,
    CampaignInformation_Image: string
  ) => {
    setActivities([
      ...activities,
      {
        CampaignInformation_Name,
        CampaignInformation_Description,
        CampaignInformation_Url,
        CampaignInformation_Image,
      },
    ]);
    window.location.reload();
    history('/activity');
  };

  const deleteActivity = (CampaignInformation_Id: number) => {
    setActivities(
      activities.filter(
        (activity) => activity.CampaignInformation_Id !== CampaignInformation_Id
      )
    );
  };

  const updateActivity = (
    CampaignInformation_Id: number,
    updatedactivity: string
  ) => {
    setActivities(
      activities.map((activity) =>
        activity.CampaignInformation_Id === CampaignInformation_Id
          ? updatedactivity
          : activity
      )
    );
  };

  return (
    <ActivityContext.Provider
      value={{ sortedActivities, addActivity, deleteActivity, updateActivity }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};

export default ActivityContextProvider;
