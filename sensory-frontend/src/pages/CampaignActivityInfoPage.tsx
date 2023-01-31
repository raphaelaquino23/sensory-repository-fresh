import ActivityInfoList from '../components/CampaignInformation/ActivityInfoList';
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