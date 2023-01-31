//Imports
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Styling Imports
import {
  Paper,
  Box,
  Button,
  Container,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  ListItem,
  TextField,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import axios, { axiosPrivate } from "../../api/axios";

function CommentItem() {

  const [commentInformation, setNewCommentInformation] = useState({
    CommentInformation_Content:""
  });
  const onInputChange = (e: React.ChangeEvent<any>) => {  
    setNewCommentInformation({...commentInformation,[e.target.name]: e.target.value});
  }
  const {CommentInformation_Content} = commentInformation;


  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const res = await axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`);
    const postId = JSON.parse(localStorage.getItem('post') || '{}');
		const commentObject = {
			comment:{
				User_Id: res.data,
				Post_Id: postId,
				Comment_DeactivatedStatus: false
			},
			commentInformation:{
				CommentInformation_Content: commentInformation.CommentInformation_Content,
			},
			commentStats:{
				CommentStats_Upvotes: 0
			}
		}
		await axiosPrivate.post('http://localhost:3081/api/comment/', commentObject).then((response:any) => response);
    window.location.reload();
  }
  return (
    <ListItem alignItems="flex-start">
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
        </Stack>

        <React.Fragment>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body1"
            color="text.primary"
          >
          </Typography>
          <Box
            sx={{
              justifyContent: "space-evenly",
              display: "flex-start",
            }}
          >
            <Typography
              sx={{
                display: "flex-start",
                marginLeft: "75px",
                textAlign: "left",
                marginBottom: "25px",
                whiteSpace: "pre-line",
              }}
            >
              <Box
                sx={{
                  padding: "15px",
                }}
              >
                <Paper elevation={5}>
                  <Container className="commentContainer">
                    <Box>
                      <TextField
                        fullWidth
                        className="textField"
                        id="outlined-multiline-flexible"
                        label="Edit Your Comment"
                        multiline
                        
					              name="CommentInformation_Content"
                        value={CommentInformation_Content}
                        onChange = { (e) => onInputChange(e)}
                        maxRows={20}
                      />
                    </Box>
                  </Container>
                </Paper>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    sx={{
                      margin: "2px",
                    }}
                    color="primary"
                    variant="contained"
                    className="buttons"
                    onClick={handleSubmit}
                  >
                    <SendIcon sx={{ mr: 1 }} /> Submit{" "}
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  justifyContent: "center",
                }}
              >
                <br />
              </Box>
            </Typography>
          </Box>
        </React.Fragment>

        <br />

        <Divider variant="inset" />
      </Container>
    </ListItem>
  );
}

export default CommentItem;
