import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Campaign.css';

const ArticlesCard = () => {
  if(localStorage.getItem("role") === "2")
    return (
        <div className="card">
          <div className="card__body">
            <img src="images/dlarticle.jpg" className="card__image" alt="img" />
            <h2 className="card__title">Downloadable Articles</h2>
            <p className="card__description">
              Want to read and download Sensory Processing Disorder articles from our repository? Click here.
            </p>
          </div>
          <Link to={"/article"}>
            <button className="card__btn">See downloadable articles</button>
          </Link>
        </div>
    )
  else
    return (
      <div className="card">
        <div className="card__body">
          <img src="images/dlarticle.jpg" className="card__image" alt="img" />
          <h2 className="card__title">Downloadable Articles</h2>
          <p className="card__description">
          Want to read and download Sensory Processing Disorder articles from our repository? Click here.
          </p>
        </div>
        <Link to={"/article-user"}>
          <button className="card__btn">See downloadable articles</button>
        </Link>
      </div>
)
};

const DirectoryCard = () => {
  return(
    <div className='card'>
    <div className='card__body'>
      <img src='images/directory.jpg' className='card__image' alt='img' width="20px" />
      <h2 className='card__title'>Therapist Directory</h2>
      <p className='card__description'>
      Looking for a therapist? Check out these clinics from Metro Manila that might be near you.{' '}
      </p>
    </div>
    <Link to={'/directory'}>
      <button className='card__btn'>See directory</button>
    </Link>
  </div>
  )
}

const PastEventsCard = () => {
  return(
    <div className='card'>
    <div className='card__body'>
      <img src='images/APIArticle.jpg' className='card__image' alt='img' width="20px" />
      <h2 className='card__title'>Articles from API</h2>
      <p className='card__description'>
      Check out SPD related articles available through an API.{' '}
      </p>
    </div>
    <Link to={'/news-search'}>
      <button className='card__btn'>See articles on API</button>
    </Link>
  </div>
  )
}

const ArticleOptions = () => {
  return (
    <div>
      <div className='wrapper'>
        <DirectoryCard />
        <ArticlesCard />
        <PastEventsCard /> 
      </div>
    </div>
  );
};

export default ArticleOptions;
