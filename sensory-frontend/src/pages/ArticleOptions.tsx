import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Campaign.css';

// const CheckListCard = () => {
//   return(
//     <div className='card'>
//     <div className='card__body'>
//       <img src='images/checklist.jpg' className='card__image' alt='img' />
//       <h2 className='card__title'>
//         Sensory Processing Disorder Checklist
//       </h2>
//       <p className='card__description'>
//         Take this test to find out if you, your child or someone around
//         you exhibits symptoms of SPD.
//       </p>
//     </div>
//     <Link to={'/checklist-toddler'}>
//       <button className='card__btn'>Take Test</button>
//     </Link>
//   </div>
//   )
// }

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
        {/* <CheckListCard /> */}
        <ArticlesCard />
        <PastEventsCard /> 
      </div>
    </div>
  );
};

export default ArticleOptions;
