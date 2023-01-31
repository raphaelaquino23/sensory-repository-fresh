import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Campaign.css';

const CheckListCard = () => {
  return(
    <div className='card'>
    <div className='card__body'>
      <img src='images/checklist.jpg' className='card__image' alt='img' />
      <h2 className='card__title'>
        Sensory Processing Disorder Checklist
      </h2>
      <p className='card__description'>
        Take this test to find out if you, your child or someone around
        you exhibits symptoms of SPD.
      </p>
    </div>
    <Link to={'/checklist-toddler'}>
      <button className='card__btn'>Take Test</button>
    </Link>
  </div>
  )
}

const ActivitiesCard = () => {
  if(localStorage.getItem("role") === "2")
    return (
        <div className="card">
          <div className="card__body">
            <img src="images/event.jpg" className="card__image" alt="img" />
            <h2 className="card__title">Awareness Campaign Activities</h2>
            <p className="card__description">
              Interested in joining events and getting to know more about the
              community? Check out our ongoing activities.
            </p>
          </div>
          <Link to={"/activity"}>
            <button className="card__btn">See Ongoing Activities</button>
          </Link>
        </div>
    )
  else
    return (
      <div className="card">
        <div className="card__body">
          <img src="images/event.jpg" className="card__image" alt="img" />
          <h2 className="card__title">Awareness Campaign Activities</h2>
          <p className="card__description">
            Interested in joining events and getting to know more about the
            community? Check out our ongoing activities.
          </p>
        </div>
        <Link to={"/activityinfo"}>
          <button className="card__btn">See Ongoing Activities</button>
        </Link>
      </div>
)
};

const PastEventsCard = () => {
  return(
    <div className='card'>
    <div className='card__body'>
      <img src='images/past.jpeg' className='card__image' alt='img' />
      <h2 className='card__title'>Awareness Campaign Past Events</h2>
      <p className='card__description'>
        Curious about the events that we had in store? Check out some of
        the past activities.{' '}
      </p>
    </div>
    <Link to={'/pastactivities'}>
      <button className='card__btn'>See Past Activities</button>
    </Link>
  </div>
  )
}

const Campaign = () => {
  return (
    <div>
      <div className='wrapper'>
        <CheckListCard />
        <ActivitiesCard />
        <PastEventsCard /> 
      </div>
    </div>
  );
};

export default Campaign;
