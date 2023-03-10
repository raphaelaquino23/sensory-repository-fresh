import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

interface Comment {
  Comment_Id: number;
  Comment_DateCreated: Date;
  Comment_DateEdited: Date;
  User_Id: number;
  Post_Id: number;
  CommentInformation_Id: number;
  CommentStats_Id: number;
  Comment_DeactivatedStatus: boolean;
  Comment_DeactivatedBy: number;
}

interface CommentInformation {
  CommentInformation_Id: number;
  CommentInformation_Content: string;
}

interface CommentStats {
  CommentStats_Id: number;
  CommentStats_Upvotes: number;
}

interface Props {
  postId: number;
  postTitle: string;
}

const CommentList = ({ postId, postTitle }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInformation, setCommentInformation] = useState<CommentInformation[]>([]);
  const [commentStats, setCommentStats] = useState<CommentStats[]>([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get<Comment[]>(
          `http://localhost:3081/api/commentbypost/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCommentInformation() {
      try {
        const response = await axios.get<CommentInformation[]>(
          "http://localhost:3081/api/commentinformation"
        );
        setCommentInformation(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCommentStats() {
      try {
        const response = await axios.get<CommentStats[]>(
          "http://localhost:3081/api/commentstats"
        );
        setCommentStats(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
    fetchCommentInformation();
    fetchCommentStats();
  }, [postId]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axios.delete(`http://localhost:3081/api/comment/${commentId}`);
      setComments(comments.filter((comment) => comment.Comment_Id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Comments for {postTitle}
      </Text>
      {comments.map((comment) => (
        <Box key={comment.Comment_Id} p="4" bg="gray.100" borderRadius="md" mb="4">
          <Flex justify="space-between" alignItems="center" mb="2">
            <Text fontWeight="bold">{postTitle}</Text>
            <Button onClick={() => handleDeleteComment(comment.Comment_Id)}>Delete</Button>
          </Flex>
          <Text>{commentInformation.find((info) => info.CommentInformation_Id === comment.CommentInformation_Id)?.CommentInformation_Content}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
