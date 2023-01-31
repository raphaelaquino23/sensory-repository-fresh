import './styles//PastActivities.css';

const PastActivities = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '10px' }}>
        Past Campaign Activities
      </h1>
      <div className='card-container'>
        <h3 style={{ textAlign: 'center', marginTop: '15px' }}>
          Fun Run for a Cause
        </h3>
        <div className='image-container'>
          <img src='images/fr.jpg' alt='img' width={500} />
        </div>
        <div className='card-content'>
          <div className='card-body'>
            <p>
              Last September 20, 2022, 110 users of SensAware participated in
              Fun Run for a Cause held at Bonifacio Global City. The event's
              aspiration is to spread awareness on Sensory Processing Disorder.
              SensAware aims to have more people be involved and understand the
              behavior of people with Sensory Processing Disorder and how to
              manage it. At the same time, this event encourages and promotes
              healthy lifestyle through physical activities. Proceeds from this
              activity will be donated to SensAware's partner institute as part
              of our awareness campaign for SPD.{' '}
            </p>
            <hr
              style={{
                backgroundColor: 'red',
                width: 730,
              }}
            />
            <h3 style={{ textAlign: 'center', marginTop: '15px' }}>
              Kamustahan: SensAware Community
            </h3>
            <div className='image-container'>
              <img src='images/ol.jpg' alt='img' width={500} />
            </div>
            <p style={{ marginTop: '20px' }}>
              The first virtual gathering of SensAware users entitled
              'Kamustahan: SensAware Community' was held last October 1, 2022
              through the online platform Google Meet. 80 users which consists
              of members with SPD as well as parents and families of people with
              the condition. The goal of this activity is to help the users meet
              and know more people that can relate to their experiences. This
              fun-filled activity consists of the users sharing their
              experiences and giving tips with each other. At the end of the
              activity, users expressed their excitement over having another
              Kamustahan event with the rest of the SensAware users. A positive
              feedback was given overall which concludes the success of the
              event.
            </p>
            <hr
              style={{
                backgroundColor: 'red',
                width: 730,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastActivities;
