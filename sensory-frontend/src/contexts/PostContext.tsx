import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type PostContextType = {
  createPostInformation?: any
  createCommentInformation?: any
  deletePost?: any
  sortedPosts?: any
  updatePost?: any
};

export const PostContext = createContext<PostContextType>({}); //https://stackoverflow.com/questions/72316650/reactjs-with-typescript-template-usecontext-property-does-not-exists-on-type

const PostContextProvider = (props: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const history = useNavigate();

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem('posts')!));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  });

  const sortedPosts = posts.sort((a, b) =>
    a.post_title < b.post_title ? -1 : 1
  ); //https://stackoverflow.com/questions/44147937/property-does-not-exist-on-type-never

  const createPostInformation = (
    PostInformation_Title: string,
    PostInformation_Content: string,
    PostInformation_Censor: boolean
  ) => {
    setPosts([...posts, 
      { PostInformation_Title, 
        PostInformation_Content,
        PostInformation_Censor }]);
    window.location.reload();
    history('/post');
  };

  const createCommentInformation = (CommentInformation_Content: string) => {
    setPosts([...posts, { CommentInformation_Content }]);
    window.location.reload();
    history('/comment');
  };

  const deletePost = (PostInformation_Id: number) => {
    setPosts(
      posts.filter((post) => post.PostInformation_Id !== PostInformation_Id)
    );
    axios.delete(
      `http://localhost:3081/api/postinformation/${PostInformation_Id}`
    );
    window.location.reload();
    history('/post');
  };

  const updatePost = (
    PostInformation_Id: number, 
    updatedPost: string
  ) => {
    setPosts(
      posts.map((post) =>
        post.PostInformation_Id === PostInformation_Id ? updatedPost : post
      )
    );
    axios.put(
      `http://localhost:3081/api/postinformation/${PostInformation_Id}`
    );
    window.location.reload();
    history('/post');
  };

  return (
    <PostContext.Provider
      value={{
        sortedPosts,
        createPostInformation,
        deletePost,
        updatePost,
        createCommentInformation,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
