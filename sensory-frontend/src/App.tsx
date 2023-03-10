import './App.css';
import Navbar from './components/__NAVBAR__/index2';
import NotNavbar from './components/__NAVBAR__';
// import Navbar from './components/Navbar2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage'
import Article from './pages/ArticlePage';
import ArticleUser from './pages/ArticleUserPage'
import Campaign from './pages/CampaignPage';
import UserForum from './pages/ForumPostPage';
import AdminForum from './pages/ForumPostAdminPage';
import CampaignActivityPage from './pages/CampaignActivityPage';
import Logout from './pages/UserLogoutPage';
import ActivityInfo from './pages/CampaignActivityInfoPage';
import PastActivities from './pages/CampaignPastActivitiesPage';
import ChecklistToddler from './pages/CampaignChecklistToddlerPage';
import ChecklistSchoolAge from './pages/CampaignChecklistSchoolAgePage';
import ChecklistAdult from './pages/CampaignChecklistAdultPage';
import Register from './pages/UserRegistrationPage';
import LogIn from './pages/UserLoginPage';
// import FacebookLoginComponent from './components/User/facebooklogin.component';
import Reactivation from './pages/UserReactivationPage';
import ModeratorApplication from './pages/UserModerationApplicationPage';
import TherapistApplication from './pages/UserTherapistApplication';
import Message from './pages/UserMessagingPage';
import UserView from './pages/UserViewPage';
import UserProfile from './pages/UserProfilePage';
import { AuthProvider } from './contexts/AuthProvider'
import { useState } from 'react';
import PostDetailPage from './components/Forum/ForumPostDetail';
import CommentListDown from './components/Forum/CommentList';
import CommentCard from './components/Forum/CommentCard';
import Unauthorized from './pages/UnauthorizedPage';
import NewsSearch from './components/NewsAPI/newsapi';
//Test

function App() {
	const thisToken = localStorage.getItem("accessToken")
	const thisUserType = localStorage.getItem("role")
  return (
      <Router>
			<AuthProvider>
			{thisToken? <Navbar /> : <NotNavbar/>}
      <Routes>
        <Route path='/'  element={<Logout/>} />
        <Route path='/article' element={thisToken && (thisUserType === "2")? <Article/>: <ArticleUser/>} />
				<Route path='/article-user' element={thisToken && (thisUserType === "2")? <Article/>: <ArticleUser/>} />
				<Route path='/news-search' element={thisToken? <NewsSearch/> : <LogIn/>} />
        <Route path='/campaign' element={thisToken? <Campaign/> : <LogIn/>} />
        <Route path='/forum' element={thisToken? <UserForum/>: <LogIn/>} />
        <Route path='/forum-admin' element={thisToken? <AdminForum/>: <LogIn/>} />
        <Route path='/postdetail' element={<PostDetailPage/>} />
        <Route path='/activity' element={thisToken && (thisUserType === "2")? <CampaignActivityPage/>: <ActivityInfo/>} /> 
				<Route path='/activityinfo' element={thisToken && (thisUserType === "2")? <CampaignActivityPage/>: <ActivityInfo/>} /> 
				<Route path='/home' element={<Home/>} />
				<Route path='/pastactivities' element={thisToken? <PastActivities/>: <LogIn/>} />
				<Route path='/checklist-toddler' element={thisToken? <ChecklistToddler/>: <LogIn/>} />
				<Route path='/checklist-schoolage' element={thisToken? <ChecklistSchoolAge/>: <LogIn/>}/>
				<Route path='/checklist-adult' element={thisToken?<ChecklistAdult/>: <LogIn/>} />
				<Route path='/register' element={thisToken? <Home/> : <Register/>}/>
				<Route path='/login' element={thisToken? <Home/> : <LogIn/>} />
				<Route path='/reactivate' element={thisToken? <Reactivation/>: <LogIn/>} />
				<Route path='/moderator' element={thisToken? <ModeratorApplication/>: <LogIn/>} />
				<Route path='/therapist' element={thisToken? <TherapistApplication/>: <LogIn/>} />
				<Route path='/message' element={thisToken? <Message/>: <LogIn/>} />
				<Route path='/profile' element={thisToken? <UserProfile/>: <Home/>} />
				<Route path='/user' element={thisToken? <UserView/>: <LogIn/>} />
      </Routes>
			</AuthProvider>
    </Router>
  );
}

export default App;