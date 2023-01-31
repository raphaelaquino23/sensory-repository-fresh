import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../helpers/axios-helper'

const Comments = ({comment} : { comment: any }) => {
  const [content, setContent] = useState<any>(null);
  const [commenter, setCommenter] = useState<any>(null);

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:3081/api/commentinformation/${comment.Comment_Id}`)
      .then((response => {
        setContent(response.data.CommentInformation_Content);
      }));
  }, [content])

  useEffect(() => {
    axiosPrivate
      .get(`http://localhost:3081/api/userinformation/${comment.User_Id}`)
      .then((response) => {
        setCommenter(response.data.UserInformation_Name);
      });
  }, [commenter])

  if(comment !== null && !commenter !== null){
    return(
      <>
        <p>{commenter}: {content}</p>
      </>
    )
  }

  return(
    <>
      <p>Loading comment . . .</p>
    </>
  )
}