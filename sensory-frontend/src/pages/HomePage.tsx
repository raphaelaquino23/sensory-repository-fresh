import React from "react";
import { Link } from "react-router-dom";
import './styles//home.css'

// const Home = () => {

//   return (
//     <div className="wrapper">
//       <Card
//         img="images/articles.jpg"
//         title="Articles"
//         description="Lorem ipsum dolor sit amet. Eos quod aliquid et nobis totam quo nulla unde est labore accusamus."
// 				button="View Articles" />

			
//       <Card
//         img="images/campaign.jpg"
//         title="Campaign"
//         description="Lorem ipsum dolor sit amet. Eos quod aliquid et nobis totam quo nulla unde est labore accusamus."
// 				button="View Campaign"
//       />

//       <Card
//         img="images/forum.jpeg"
//         title="Forum"
//         description="Lorem ipsum dolor sit amet. Eos quod aliquid et nobis totam quo nulla unde est labore accusamus."
// 				button="View Forum"
//       />
//     </div>
		
//   );
// }

// function Card(props: any) {
//   return (
//     <div className="card">
//       <div className="card__body">
//         <img src={props.img} className="card__image" alt="img"/>
//         <h2 className="card__title">{props.title}</h2>
//         <p className="card__description">{props.description}</p>
//       </div>
//       <button className="card__btn" >{props.button}</button>
//     </div>
//   );
// }
// export default Home;

const AdminArticles = () => {
  return (
    <div className="card">
      <div className="card__body">
        <img src="images/articles.jpg" className="card__image" alt="img" />
        <h2 className="card__title">Repository</h2>
        <p className="card__description">
          Discover and read articles related to Sensory Processing Disorder and check for therapy clinics near you.
        </p>
      </div>
      <Link to={"/ArticleOptions"}>
        <button className="card__btn">View Repository</button>
      </Link>
    </div>
  );
};

// const Articles = () => {
//   return (
//     <div className="card">
//       <div className="card__body">
//         <img src="images/articles.jpg" className="card__image" alt="img" />
//         <h2 className="card__title">Articles</h2>
//         <p className="card__description">
//           Discover and read articles related to Sensory Processing Disorder.
//         </p>
//       </div>
//       <Link to={"/article-user"}>
//         <button className="card__btn">View Articles</button>
//       </Link>
//     </div>
//   );
// };

const Campaigns = () => {
  return (
    <div className="card">
      <div className="card__body">
        <img src="images/campaign.jpg" className="card__image" alt="img" />
        <h2 className="card__title">Campaign</h2>
        <p className="card__description">
          Interested in joining activities and events? Check out available
          campaigns.
        </p>
      </div>
      <Link to={"/campaign"}>
        <button className="card__btn">View Campaign</button>
      </Link>
    </div>
  );
};

const Forum = () => {
  return (
    <div className="card">
      <div className="card__body">
        <img src="images/forum.jpeg" className="card__image" alt="img" />
        <h2 className="card__title">Forum</h2>
        <p className="card__description">
          Exchange experiences and get to talk with other people dealing with or
          related with Sensory Processing Disorder.
        </p>
      </div>
      <Link to={"/forum"}>
        <button className="card__btn">View Forum</button>
      </Link>
    </div>
  );
};

const Home = () => {
  const thisUserType = localStorage.getItem("role");
  return (
    <div className="app-home">
			<div className="container-x9" style={{position: "relative", textAlign: "center", color: "white", fontSize: "50px"}}>
				<img src="images/sen.jpg" alt="home" style={{width: "100%", height: "auto"}}/>
				{/* <h1 style={{ textAlign: "center", marginTop: "20px" }}>
					Welcome to SensAware
				</h1> */}
				<h1 className="centered" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%"}}>Welcome to SensAware</h1>
				</div>
      <h1 style={{ textAlign: "center", marginTop: "20px", fontSize: "30px"}}>
        Get started 
      </h1>
      <div className="wrapper" style={{marginBottom: "40px"}}>
        {/* {thisUserType==="2"? <AdminArticles /> : <Articles/>} */}
        <AdminArticles />
        <Campaigns />
        <Forum />
      </div>
    </div>
  );
};

// function Card(props: any) {
//   return (
//     <div className="card">
//       <div className="card__body">
//         <img src={props.img} className="card__image" alt="img"/>
//         <h2 className="card__title">{props.title}</h2>
//         <p className="card__description">{props.description}</p>
//       </div>
//       <button className="card__btn" >{props.button}</button>
//     </div>
//   );
// }
export default Home;