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
  const [listPosts, setListPosts] = useState<Post[]>([]);
  const [listPostInformation, setListPostInformation] = useState<
    PostInformation[]
  >([]);
  const [listUserPosts, setListUserPosts] = useState<PostInformation[]>([]);

  useEffect(() => {
    axios.get<Post[]>(`http://localhost:3081/api/post`).then((response) => {
      setListPosts(response.data);
    });

    axios.get(`http://localhost:3081/api/postinformation`)
    .then((response) => {
      const postInformationArray = response.data.filter((postInfo:any) => postInfo !== undefined);
      setListPostInformation(postInformationArray);
    });
  }, []);

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
    }
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3081/api/getuserid/${searchUsername}`)
      .then((response) => {
        const userId = response.data;
        return axios.get(`http://localhost:3081/api/userinformation/${userId}`);
      })
      .then((response) => {
        setSearchResult(response.data);
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

  return (
    <div className="cards" style={{height: "470px", display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "40px"}}>
    <div className="bontainer" style={{marginTop: "30px"}}>
      
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
            <p>Apply as a <a href='/therapist' style={{color: "blue"}}>therapist</a></p>
            <p>Apply as a <a href='/moderator' style={{color: "blue"}}>moderator</a></p>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      )}
    </div>
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
