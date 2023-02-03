import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../helpers/axios-helper'

const Posts = ({comment} : { comment: any }) => {
	const [listPosts, setListPosts] = useState([]);

	useEffect(() => {
		axiosPrivate.get(`http://localhost:3081/api/postinformation`).then((response) => {
			setListPosts(response.data);
		});
	}, [listPosts]);

  if(listPosts === undefined || listPosts.length == 0){
    return(
      <>
        <p>Loading. . .</p>
      </>
    )
  }

  return(
    <>
      {listPosts.forEach((post)=> {
        <li>{post}</li>
      })}
    </>
  )
}