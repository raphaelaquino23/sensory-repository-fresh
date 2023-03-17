import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Text,
  Button,
  Badge,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import "./styles/UserProfile.css";
import MessageForm from "./ProfileSendMessage";
import { Link } from "react-router-dom";
import UserPostsDialog from "./UserProfilePagePostDialogBox";

interface UserInformation {
  UserInformation_Id: number;
  UserInformation_Name: string;
  UserType_Id: number;
  UserInformation_Password: string;
  UserInformation_Email: string;
  UserInformation_Description: string;
}

interface Post {
  Post_Id: number;
  PostInformation_Id: number;
  PostStats_Id: number;
  Post_DateCreated: string;
  Post_DateEdited: string;
  User_Id: number;
  Post_DeactivatedStatus: boolean | undefined;
  Post_DeactivatedBy: number;
}

interface PostInformation {
  PostInformation_Id: number;
  PostInformation_Title: string;
  PostInformation_Content: string;
  PostCategory_Id: number;
}

const ProfilePage: React.FC = () => {
  const [currentUserInformation, setCurrentUserInformation] =
    useState<UserInformation | null>(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState<UserInformation | null>(
    null
  );
  const [messageContent, setMessageContent] = useState("");
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [showPostDialogBox, setShowPostDialogBox] = useState(false);
  const [showYourPostDialogBox, setShowYourPostDialogBox] = useState(false);
 
  const [listPostInformation, setListPostInformation] = useState<PostInformation[]>([]);
  
  const [listUserPosts, setListUserPosts] = useState<Post[]>([]);
  const [listUserPostInformation, setListUserPostInformation] = useState<PostInformation[]>([]);

  const [listSearchPosts, setListSearchPosts] = useState<Post[]>([]);
  const [listSearchPostInformation, setListSearchPostInformation] = useState<PostInformation[]>([]);


  // const filteredPosts = listPosts.filter(
  //   (post) => post.User_Id === currentUserInformation?.UserInformation_Id
  // );
  // if(filteredPosts){
  //   const postInformation = filteredPosts.map((post) =>
  //   listPostInformation.find(
  //     (info) => info?.PostInformation_Id === post.Post_Id
  //   ));
  //   if(postInformation){
  //     setListUserPosts(postInformation);
  //   }
  // }

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      axios
        .get(`http://localhost:3081/api/getuserid/${username}`)
        .then((response) => {
          const userId = response.data;
          return axios.get(
            `http://localhost:3081/api/userinformation/${userId}`
          );
        })
        .then((response) => {
          setCurrentUserInformation(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  
      Promise.all([
        axios.get(`http://localhost:3081/api/postinformationbyuserid/${currentUserInformation?.UserInformation_Id}`),
        axios.get(`http://localhost:3081/api/postinformation`)
      ])
        .then((responses) => {
          const listUserPosts = responses[0].data;
          const listPostInformation = responses[1].data;
          const postInformationIds = listUserPosts.map((post:any) => post.PostInformation_Id);
          const filteredPosts = listPostInformation.filter((post:any) => postInformationIds.includes(post.PostInformation_Id));
          setListUserPosts(listUserPosts);
          setListPostInformation(listPostInformation);
          setListUserPostInformation(filteredPosts);
          console.log(listUserPostInformation);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUserInformation?.UserInformation_Id]);
  

  const handleViewPostClick = () => {
    fetchPosts(); 
  }

  const fetchPosts = () => {
    axios.get(`http://localhost:3081/api/postinformationbyuserid/${currentUserInformation?.UserInformation_Id}`)
    .then((response) => {
      setListUserPosts(response.data);
    });

    axios.get(`http://localhost:3081/api/postinformation`)
      .then((response) => {
        setListPostInformation(response.data);
      })
      .then(() => {
        const postInformationIds = listUserPosts.map((post) => post.PostInformation_Id);
        const filteredPosts = listPostInformation.filter((post) => postInformationIds.includes(post.PostInformation_Id));
        setListUserPostInformation(filteredPosts);
        console.log(listUserPostInformation);
      })
  }

  const handleSearch = () => {
    axios
      .get(`http://localhost:3081/api/getuserid/${searchUsername}`)
      .then((response) => {
        const searchedUserId = response.data;
        return axios.get(
          `http://localhost:3081/api/userinformation/${searchedUserId}`
        );
      })
      .then((response) => {
        setSearchResult(response.data);
  
        return Promise.all([
          axios.get(`http://localhost:3081/api/postinformationbyuserid/${response.data?.UserInformation_Id}`),
          axios.get(`http://localhost:3081/api/postinformation`)
        ]);
      })
      .then((responses) => {
        const listUserPosts = responses[0].data;
        const listPostInformation = responses[1].data;
        const postInformationIds = listUserPosts.map((post:any) => post.PostInformation_Id);
        const filteredPosts = listPostInformation.filter((post:any) => postInformationIds.includes(post.PostInformation_Id));
        setListSearchPosts(listUserPosts);
        setListSearchPostInformation(filteredPosts);
        console.log(listSearchPostInformation);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleCloseDialogBox = () => {
    setShowDialogBox(false);
  };

  const handleOpenDialogBox = () => {
    setShowDialogBox(true);
  };

  const handleClosePostDialogBox = () => {
    setShowPostDialogBox(false);
  }

  const handleOpenPostDialogBox = () => {
    setShowPostDialogBox(true);
  }

  return (
    <div className="bontainer">
      <div className="search-container" style={{alignItems: "center", margin: "0"}}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a user"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <br />
      {searchResult ? (
        <div className="user-container">
          <div className="user-info">
            <h1>
              <strong>You are viewing the profile of {searchResult.UserInformation_Name}</strong>
            </h1>
          </div>
          <div className="user-details">
            <p>
              <strong>Description:</strong>{" "}
              {searchResult.UserInformation_Description}
            </p>
            <div className="badge-container">
              <span
                style={{
                  backgroundColor: getUserTypeColor(searchResult.UserType_Id),
                  borderRadius: "9999px",
                  color: "white",
                  display: "inline-block",
                  padding: "4px 8px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                {getUserType(searchResult.UserType_Id)}
              </span>
            </div>
            {showDialogBox && (
              <MessageForm
                currentUsername={searchResult.UserInformation_Name}
                onClose={handleCloseDialogBox}
              />
            )}
            {!showDialogBox && (
              <button
                className="send-message-button"
                onClick={handleOpenDialogBox}
              >
                Send Message
              </button>
            )}
            {showPostDialogBox && (
              <UserPostsDialog 
                isOpen={showPostDialogBox}
                onClose={handleClosePostDialogBox}
                listUserPostInformation={listSearchPostInformation}
              />
            )}
            {!showPostDialogBox && (
              <div>
                <button
                  className="view-posts-button"
                  onClick={handleOpenPostDialogBox}
                >
                  View {searchResult.UserInformation_Name}'s Posts
                </button>
              </div>
            )}
          </div>
        </div>
      ) : currentUserInformation ? (
        <div className="user-container">
          <div className="user-info">
            <strong>
              <h1>{currentUserInformation.UserInformation_Name}</h1>
            </strong>
            <div className="badge-container"></div>
          </div>
          <div className="user-details">
            <p>
              <strong>Your Description:</strong>{" "}
              {currentUserInformation.UserInformation_Description}
            </p>
            <p>
              <strong>Your Email:</strong>{" "}
              {currentUserInformation.UserInformation_Email}
            </p>
          </div>
          <strong>Your current role:</strong>
          <span
            style={{
              backgroundColor: getUserTypeColor(
                currentUserInformation.UserType_Id
              ),
              borderRadius: "9999px",
              color: "white",
              display: "inline-block",
              padding: "4px 8px",
              fontWeight: "bold",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            {getUserType(currentUserInformation.UserType_Id)}
          </span>
          <div>
            <br />
            {currentUserInformation.UserType_Id !== 1 && <Link to="/therapist" className="apply-therapist-button">
              Apply as a therapist
            </Link>
            }
            <br />
            <br />
            {currentUserInformation.UserType_Id !== 3 && <Link to="/moderator" className="apply-moderator-button">
              Apply as a moderator
            </Link>}
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

const getUserTypeColor = (userTypeId: number) => {
  switch (userTypeId) {
    case 1:
      return "blue";
    case 2:
      return "purple";
    case 3:
      return "orange";
    case 4:
      return "green";
    default:
      return "gray";
  }
};

const getUserType = (userTypeId: number) => {
  switch (userTypeId) {
    case 1:
      return "Therapist";
    case 2:
      return "Admin";
    case 3:
      return "Moderator";
    case 4:
      return "Regular User";
    default:
      return "Unknown";
  }
};
export default ProfilePage;
