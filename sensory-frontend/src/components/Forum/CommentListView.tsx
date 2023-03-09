import { useEffect, useState } from "react";
import axios from "axios";

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
}

const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInformation, setCommentInformation] = useState<CommentInformation[]>([]);
  const [commentStats, setCommentStats] = useState<CommentStats[]>([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get<Comment[]>(
          `http://localhost:3081/api/comment?Post_Id=${postId}`
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

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.Comment_Id}>
          <p>{commentInformation.find((c) => c.CommentInformation_Id === comment.CommentInformation_Id)?.CommentInformation_Content}</p>
          <p>{commentStats.find((c) => c.CommentStats_Id === comment.CommentStats_Id)?.CommentStats_Upvotes} Upvotes</p>
        </div>
      ))}
    </>
  );
};

export default CommentList;
