import {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext} from '../../contexts/PostContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
	Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  Tag,
  VStack,} from "@chakra-ui/react";
import { BiDetail } from "react-icons/bi";
import { BsCaretDownFill, BsCaretUpFill, BsReplyAllFill } from "react-icons/bs";
import NextLink from "next/link";
import EditPost from './ForumEditPost'
import CreateComment from './CommentCreate';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import { response } from 'express';
import PostDetailPage from './ForumPostDetail';
import Filter from 'bad-words';

const PostUser = ({post} : { post: any}) => {
	const {deletePost} = useContext(PostContext)
	const [show, setShow] = useState(false);
  const [postUpvotes, setPostUpvotes] = useState(0);
  const [postClicks, setPostClicks] = useState(0);
  const [poster, setPoster] = useState('');
  const [posterId, setPostUserId] = useState(0);
  const [posterUserType, setPosterUserType] = useState(0);
  const [postId, setPostId] = useState('');

  const filter = new Filter();
		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
  const navigate = useNavigate()

  useEffect(() => {
     handleClose()
     axiosPrivate.get(`http://localhost:3081/api/poststats/${post.PostInformation_Id}`).then((response) => {
      setPostUpvotes(response.data.PostStats_Upvotes);
      setPostClicks(response.data.PostStats_Clicks);
    }) 
    axiosPrivate.get(`http://localhost:3081/api/post/${post.PostInformation_Id}`).then((response) => {
      setPostUserId(response.data.User_Id);
      setPostId(response.data.Post_Id);
    }) 
    axiosPrivate.get(`http://localhost:3081/api/userinformation/${posterId}`).then((response => {
      setPoster(response.data.UserInformation_Name);
      setPosterUserType(response.data.UserType_Id);
    }))
  })

  const handleUpvote = async (e:any) => {
    e.preventDefault();
    const res = await axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`);
    const postRes = await axiosPrivate.get(`http://localhost:3081/api/post/${post.PostInformation_Id}`);
    const upvoteObject = {
      post: {
        Post_Id: postRes.data.Post_Id,
        PostStats_Id: postRes.data.PostStats_Id,
      },
      user_Id: res.data,
    }
    await axiosPrivate.post('http://localhost:3081/api/postUpvoteTracker', upvoteObject);
    window.location.reload();
  }

  const handleDownvote = (e:any) => {
    e.preventDefault();
  }

  const handlePostDetail = async (e:any) => {
    e.preventDefault();
    const getPostId = await axiosPrivate.get(`http://localhost:3081/api/post/${post.PostInformation_Id}`);
    localStorage.setItem("post", post.PostInformation_Id);
    navigate(`/postdetail/`) 
  }

  const getCategoryTitle = (categoryId: number): string => {
    switch (categoryId) {
      case 1:
        return "General";
      case 2:
        return "News";
      case 3:
        return "Update";
      case 4:
        return "Help";
      case 5:
        return "Question";
      default:
        return "";
    }
  };
  
  return (
    <>
      <Flex m={2} mb={8}>
        <VStack
          p={4}
          bg="white"
          textAlign="center"
          fontSize="x-large"
          w="6%"
          borderRadius={6}
          shadow="2px 2px 6px #bababa"
        >
          <Box>
            <Box
              _hover={{ color: "#00c73f", cursor: "pointer" }}
              color="black"
              onClick={handleUpvote}
            >
              <BsCaretUpFill />
            </Box>
            {postUpvotes}
            <Box
              _hover={{ color: "red", cursor: "pointer" }}
              color="black"
              onClick={handleDownvote}
            >
              <BsCaretDownFill />
            </Box>
          </Box>
          <Spacer />
          <Box></Box>
        </VStack>
        <Box
          p={4}
          w="100%"
          shadow="2px 2px 6px #bababa"
          borderRadius={6}
          bg="white"
          position="relative"
        >
          <SimpleGrid columns={1} spacing={10}>
            <Box>
              <HStack mb={2} spacing={4}>
                <NextLink href={`/category/`}>
                  <Badge
                    fontSize="sm"
                    colorScheme="yellow"
                    shadow="md"
                    _hover={{
                      shadow: "1px 1px 8px #888888",
                      cursor: "pointer",
                    }}
                  >
                    {getCategoryTitle(post.PostCategory_Id)}
                  </Badge>
                </NextLink>
                <Badge
                  fontSize="sm"
                  colorScheme={getUserTypeColor(posterUserType)}
                  shadow="md"
                >
                  {poster}
                </Badge>
                <Tag color="grey" shadow="md">
                  {getUserType(posterUserType)}
                </Tag>
              </HStack>
              <Box fontSize="xl">
                <strong>
                  {post.PostInformation_Censor
                    ? post.PostInformation_Title
                      ? filter.clean(post.PostInformation_Title)
                      : ""
                    : post.PostInformation_Title}
                </strong>
              </Box>
              <Box>
                {post.PostInformation_Censor
                  ? post.PostInformation_Content
                    ? filter.clean(post.PostInformation_Content)
                    : ""
                  : post.PostInformation_Content}
              </Box>
            </Box>
            <Box>
              <Box fontSize="sm" fontStyle="italic" color="gray.600" mt={3}>
                <HStack spacing={10}>
                  <Box>{post.Post_DateCreated}</Box>
                </HStack>
              </Box>
              <Box position="absolute" bottom={0} right={0} mr={4} mb={4}>
                <HStack spacing={4}>
                  <IconButton
                    colorScheme="gray"
                    aria-label="detail"
                    size="md"
                    shadow="md"
                    title="Detail"
                    icon={<BiDetail />}
                    onClick={handlePostDetail}
                  />
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateComment />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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

export default PostUser;