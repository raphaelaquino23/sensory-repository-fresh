import React, { useState, useEffect, Key } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import AddCommentForm from "./AddCommentForm";
import CommentList from "./CommentList";

// Material UI
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentItem from "./CommentCreate";
import { axiosPrivate } from "../../api/axios";

const PostDetailPage = () => {
  const history = useNavigate();
  const [search, setSearch] = useState("");
  const [listCommentInformation, setListCommentInformation] = useState<any[]>([]);
  const [listComments, setListComments] = useState<any[]>([]);
  const [selectedComments, setSelectedComments] = useState<any[]>([]);
  const [user, setUser] = useState("");
  const [post, setPost] = useState("");

  const handleBackToPrev = () => {
    history('/post')
  }

  const handleSearchComment = (event: React.ChangeEvent<any>) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    axiosPrivate
    .get(
      `http://localhost:3081/api/commentbypost/${localStorage.getItem(
        "post"
      )}`
    )
    .then((response) => {
      setListComments(response.data);
    }); // THIS RETRIEVES ALL COMMENTS THAT ARE ATTACHED TO THE CURRENT POST
    
    axiosPrivate
      .get(`http://localhost:3081/api/commentinformation`)
      .then((response) => {
        setListCommentInformation(response.data);
      }); // THIS RETRIEVES ALL COMMENT INFO THAT WE WILL USE TO FILTER OUT WHICH ONES ARE ON THIS POST (WE COMPARE THE ARRAY FROM ABOVE AND FILTER AS SEEN BELOW)
  }, [user]);

  return (
    <Container>
      <Box>
        <Button
        variant="contained"
        color="primary"
        onClick={handleBackToPrev}
        sx={{
          marginBottom: "15px"
        }}>
          <ArrowBackIcon/>
        Back
        </Button>
      </Box>
      <div>
        {listComments
          .map(
            (
              comment: { Comment_Id: Key | null | undefined } //quick fix
            ) => (
              <tr key={comment.Comment_Id}>
                <CommentList comment={comment} />
              </tr>
            )
          )}
      </div>
      <div>
        <CommentItem />
      </div>
    </Container>
  );
};

export default PostDetailPage;

