
//Imports
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CommentItem from "./CommentCreate";

//Styling Imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Paper, Container, Button, TextField, Box, Grid } from "@mui/material";
import { axiosPrivate } from "../../api/axios";
import Filter from 'bad-words';
import { Flex, HStack, Badge, Tag } from "@chakra-ui/react";

const CommentList = ({ comment }: { comment: any }) => {
  const [commentDir, setCommentDir] = useState<any>(null);
  const [commentUser, setCommentUser] = useState<any>(null);
  const [commentUserType, setCommentUserType] = useState(0);

  const filter = new Filter();

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:3081/api/commentinformation/${comment.Comment_Id}`)
      .then((response) => {
        setCommentDir(response.data.CommentInformation_Content);
      });
    axiosPrivate
        .get(`http://localhost:3081/api/userinformation/${comment.User_Id}`)
        .then((response) => {
          setCommentUser(response.data.UserInformation_Name);
          setCommentUserType(response.data.UserType_Id);
    });
  }, [commentUser]);

  return (
    <Flex justify="center" align="center" height="100%" p="4" bg="gray.100" borderRadius="md" mb="4">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
        <HStack mb={2} spacing={4}>
            <span 
              style={{ 
                backgroundColor: 'grey', 
                borderRadius: '9999px', 
                color: 'white', 
                display: 'inline-block', 
                padding: '4px 8px', 
                fontWeight: 'bold', 
                fontSize: '14px', 
                textTransform: 'uppercase' 
              }}
            >
              {commentUser}
            </span>
            <span 
              style={{ 
                backgroundColor: getUserTypeColor(commentUserType), 
                borderRadius: '9999px', 
                color: 'white', 
                display: 'inline-block', 
                padding: '4px 8px', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase' 
              }}
            >
            {getUserType(commentUserType)}
            </span>
          </HStack>
          <p style={{ textAlign: "left" }}>
            {commentDir ? filter.clean(commentDir) : ''}
          </p>
        </Grid>
      </Grid>
      {/* <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> */}
    </Flex>
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


export default CommentList;