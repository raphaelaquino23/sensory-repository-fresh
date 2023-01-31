
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

const CommentList = ({ comment }: { comment: any }) => {
  const [commentDir, setCommentDir] = useState<any>(null);
  const [commentUser, setCommentUser] = useState<any>(null);

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
    <>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{commentUser}</h4>
            <p style={{ textAlign: "left" }}>
              {commentDir}
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </>
  );
};

export default CommentList;