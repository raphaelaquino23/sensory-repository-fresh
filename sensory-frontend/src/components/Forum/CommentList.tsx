
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
import { Flex } from "@chakra-ui/react";

const CommentList = ({ comment }: { comment: any }) => {
  const [commentDir, setCommentDir] = useState<any>(null);
  const [commentUser, setCommentUser] = useState<any>(null);

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
    });
  }, [commentUser]);

  return (
    <Flex justify="center" align="center" height="100%" p="4" bg="gray.100" borderRadius="md" mb="4">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}><strong>{commentUser}</strong></h4>
          <p style={{ textAlign: "left" }}>
            {commentDir ? filter.clean(commentDir) : ''}
          </p>
        </Grid>
      </Grid>
      {/* <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> */}
    </Flex>
  );
};

export default CommentList;