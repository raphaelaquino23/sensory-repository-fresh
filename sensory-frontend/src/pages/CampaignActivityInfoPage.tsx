import ActivityInfoList from '../components/CampaignInformation/ActivityInfoListUser';
import ActivityContextProvider from '../contexts/ActivityContext';

function ActivityInfo() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <ActivityContextProvider>
            <ActivityInfoList />
          </ActivityContextProvider>
        </div>
      </div>
    </div>
  );
}

export default ActivityInfo;