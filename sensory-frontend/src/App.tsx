import "./App.css";
import Navbar from "./components/__NAVBAR__/index2";
import NotNavbar from "./components/__NAVBAR__";
// import Navbar from './components/Navbar2';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Article from "./pages/ArticlePage";
import UserManagement from "./pages/UserManagement copy";
import ArticleUser from "./pages/ArticleUserPage";
import Campaign from "./pages/CampaignPage";
import ArticleOptions from "./pages/ArticleOptions";
import AdminForum from "./pages/ForumPostAdminPage";
import ForumAdmin from "./pages/ForumPostPageAdmn";
import AuditTrail from "./pages/AuditTrailManagementPage";
import CampaignActivityPage from "./pages/CampaignActivityPage";
import Logout from "./pages/UserLogoutPage";
import ActivityInfo from "./pages/CampaignActivityInfoPage";
import PastActivities from "./pages/CampaignPastActivitiesPage";
import ChecklistToddler from "./pages/CampaignChecklistToddlerPage";
import ChecklistSchoolAge from "./pages/CampaignChecklistSchoolAgePage";
import ChecklistAdult from "./pages/CampaignChecklistAdultPage";
import Register from "./pages/UserRegistrationPage";
import LogIn from "./pages/UserLoginPage";
// import FacebookLoginComponent from './components/User/facebooklogin.component';
import Reactivation from "./pages/UserReactivationPage";
import ModeratorApplication from "./pages/UserModerationApplicationPage";
import TherapistApplication from "./pages/UserTherapistApplication";
import Message from "./pages/UserMessagingPage";
import UserView from "./pages/UserViewPage";
import UserProfile from "./pages/UserProfilePage";
import { AuthProvider } from "./contexts/AuthProvider";
import PostDetailPage from "./components/Forum/ForumPostDetail";
import NewsSearch from "./components/NewsAPI/newsapi";
import TherapistDirectory from "./pages/TherapistDirectory";
import Terms from "./pages/TermsOfService";
import Privacy from "./pages/PrivacyPolicy";
import ForumUser from "./pages/ForumPostPageUser";
import ContactUs from "./pages/ContactUs";
import PageNotFound from "./pages/PageNotFound";
//Test

function App() {
  const thisToken = localStorage.getItem("accessToken");
  const thisUserType = localStorage.getItem("role");
  return (
    <Router>
      <AuthProvider>
        {thisToken ? <Navbar /> : <NotNavbar />}
        <Routes>
          <Route path="/" element={<Logout />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/article"
            element={
              thisToken && thisUserType === "2" ? <Article /> : <ArticleUser />
            }
          />
          <Route
            path="/article-user"
            element={
              thisToken && thisUserType === "2" ? <Article /> : <ArticleUser />
            }
          />
          <Route
            path="/news-search"
            element={thisToken ? <NewsSearch /> : <LogIn />}
          />
          <Route
            path="/campaign"
            element={thisToken ? <Campaign /> : <LogIn />}
          />
          <Route
            path="/ArticleOptions"
            element={thisToken ? <ArticleOptions /> : <LogIn />}
          />
          {/* <Route
            path="/forum-user"
            element={
              thisToken && thisUserType === "2" ? <AdminForum /> : <UserForum />
            }
          /> */}
          <Route
            path="/forum-manage"
            element={
              thisToken && (thisUserType === "2" || thisUserType === "3") ? (
                <AdminForum />
              ) : (
                <LogIn />
              )
            }
          />
          <Route
            path="/audit-trail"
            element={
              thisToken && (thisUserType === "2" || thisUserType === "3") ? (
                <AuditTrail />
              ) : (
                <LogIn />
              )
            }
          />
          <Route
            path="/forum"
            element={
              thisToken && (thisUserType === "2" || thisUserType === "3") ? (
                <ForumAdmin />
              ) : (
                <ForumUser />
              )
            }
          />
          <Route path="/postdetail" element={<PostDetailPage />} />
          <Route
            path="/activity"
            element={
              thisToken && thisUserType === "2" ? (
                <CampaignActivityPage />
              ) : (
                <ActivityInfo />
              )
            }
          />
          <Route
            path="/activityinfo"
            element={
              thisToken && thisUserType === "2" ? (
                <CampaignActivityPage />
              ) : (
                <ActivityInfo />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route
            path="/pastactivities"
            element={thisToken ? <PastActivities /> : <LogIn />}
          />
          <Route
            path="/checklist-toddler"
            element={thisToken ? <ChecklistToddler /> : <LogIn />}
          />
          <Route
            path="/checklist-schoolage"
            element={thisToken ? <ChecklistSchoolAge /> : <LogIn />}
          />
          <Route
            path="/directory"
            element={thisToken ? <TherapistDirectory /> : <LogIn />}
          />
          <Route
            path="/checklist-adult"
            element={thisToken ? <ChecklistAdult /> : <LogIn />}
          />
          <Route
            path="/register"
            element={thisToken ? <Home /> : <Register />}
          />
          <Route path="/login" element={thisToken ? <Home /> : <LogIn />} />
          <Route
            path="/reactivate"
            element={thisToken ? <Reactivation /> : <LogIn />}
          />
          <Route
            path="/moderator"
            element={thisToken ? <ModeratorApplication /> : <LogIn />}
          />
          <Route
            path="/therapist"
            element={thisToken ? <TherapistApplication /> : <LogIn />}
          />
          <Route
            path="/message"
            element={thisToken ? <Message /> : <LogIn />}
          />
          <Route
            path="/profile"
            element={thisToken ? <UserProfile /> : <Home />}
          />
          <Route path="/user" element={thisToken ? <UserView /> : <LogIn />} />
          <Route
            path="/usermanage"
            element={
              thisToken && thisUserType === "2" ? <UserManagement /> : <LogIn />
            }
          />
          <Route
            path="/contactus"
            element={thisToken ? <ContactUs /> : <LogIn />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
