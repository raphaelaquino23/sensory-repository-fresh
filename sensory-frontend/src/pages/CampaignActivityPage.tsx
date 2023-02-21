import ActivityList from '../components/CampaignInformation/ActivityListAdmin';
import ActivityContextProvider from '../contexts/ActivityContext';

function Activity() {
  return (
    <div className='container-xl'>
      <div className='table-responsive'>
        <div className='table-wrapper'>
          <ActivityContextProvider>
            <ActivityList />
          </ActivityContextProvider>
        </div>
      </div>
    </div>
  );
}

export default Activity;
