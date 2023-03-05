import { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";

interface Post {
  PostInformation_Id: number;
  PostInformation_Title: string;
  PostInformation_Content: string;
  PostCategory_Id: number;
}

interface PostListProps {
  posts: Post[];
}

const PostList = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

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
              </Heading>
              <Text mb="2">{post.PostInformation_Content}</Text>
              <Button colorScheme="red" onClick={() => handleDelete(post)}>
                Delete
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
      </Box>
    </Flex>
  );
};

export default PostList;