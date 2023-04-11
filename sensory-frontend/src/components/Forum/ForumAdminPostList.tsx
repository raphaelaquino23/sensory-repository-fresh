import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import CommentListView from './CommentListView'
import Post from './ForumPostAdmin'
import Filter from 'bad-words';


interface Post {
  PostInformation_Id: number;
  PostInformation_Title: string;
  PostInformation_Content: string;
  PostCategory_Id: number;
}

interface PostListProps {
  posts: Post[];
}

interface CommentListViewProps {
  postId: number;
}

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <Button colorScheme="red" onClick={onDelete}>
    Delete
  </Button>
);

const PostList = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const [isViewCommentOpen, setIsViewCommentOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [uncensor, setUncensor] = useState(true);

  const filter = new Filter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get<Post[]>("http://localhost:3081/api/postinformation");
        setPostList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);

  const handleChange = () => {
    return setUncensor(!uncensor);
  }

  const handleDelete = async (post: Post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPost) {
      try {
        await axios.delete(`http://localhost:3081/api/postinformation/${selectedPost.PostInformation_Id}`);
        const updatedList = postList.filter((post) => post.PostInformation_Id !== selectedPost.PostInformation_Id);
        setPostList(updatedList);
      } catch (error) {
        console.error(error);
      }
    }
    setIsOpen(false);
  };

  const onViewCommentClose = () => {
    setIsViewCommentOpen(false);
  };

  const handleViewComment = (post: Post) => {
    setSelectedPost(post);
    setIsViewCommentOpen(true);
  };

  const handleUncensorTitle = (post: Post) => {
    setSelectedPost(post);
    handleChange();
  }

  const handleUncensorContent = (post: Post) => {
    setSelectedPost(post);
    
  }

  return (
    <Flex justify="center" align="center" height="100%">
      <Box w="80%">
        <Heading as="h1" size="lg" mb="4">
          Forum Posts
        </Heading>
        <Box bg="white" p="6" borderRadius="md" boxShadow="md">
          <Flex justify="space-between" fontWeight="bold" mb="4">
            <Box flex="2">Title</Box>
            <Box flex="3">Content</Box>
            <Box flex="1">Delete</Box>
          </Flex>
          {postList.map((post) => (
            <Box key={post.PostInformation_Id} p="4" bg="gray.50" borderRadius="md" mb="4">
              <Heading as="h2" size="md" mb="2">
                {post.PostInformation_Title}
                {uncensor ? (post.PostInformation_Title) : (post.PostInformation_Title ? filter.clean(post.PostInformation_Title) : "")}
              </Heading>
              <Text mb="2">{post.PostInformation_Content}</Text>
              <Button colorScheme="red" onClick={() => handleDelete(post)}>
                Delete
              </Button>
              <Button colorScheme="blue" onClick={() => handleViewComment(post)} ml="4">
                View Comments
              </Button>
              <Button colorScheme="green" onClick={() => handleUncensorTitle(post)} ml="4">
                Uncensor Title
              </Button>
              <Button colorScheme="yellow" onClick={() => handleUncensorContent(post)} ml="4">
                Uncensor Content
              </Button>
            </Box>
          ))}
        </Box>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={isViewCommentOpen} onClose={onViewCommentClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Comments</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedPost && <CommentListView postId={selectedPost.PostInformation_Id} postTitle={selectedPost.PostInformation_Title} /> }
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default PostList;  