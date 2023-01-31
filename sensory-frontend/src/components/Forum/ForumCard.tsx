import {
  Badge,
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Tag,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { BsCaretDownFill, BsCaretUpFill, BsReplyAllFill } from "react-icons/bs";

export const PostCard = ({post} : { post: any})=> {

  const [listPostInformation, setListPostInformation] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3081/api/postinformation`).then((response) => {
      setListPostInformation(response.data);
    });
  }, []);

  const router = useRouter();

  return (
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
            color="#00c73f"
            // onClick={async () => {
            //   if (post.voteStatus === 1) {
            //     return;
            //   }
            //   try {
            //     // votePost function here
            //   } catch (err) {
            //     router.replace(`/login?next=/post/${post.id}`);
            //   }
            // }}
          >
            <BsCaretUpFill />
          </Box>
          {post.PostStats_Upvotes}
          <Box
            _hover={{ color: "red", cursor: "pointer" }}
            color="red"
            // onClick={async () => {
            //   if (post.voteStatus === -1) {
            //     return;
            //   }
            //   try {
            //     // votePost function here
            //   } catch (err) {
            //     router.replace(`/login?next=/post/${post.id}`);
            //   }
            // }}
          >
            <BsCaretDownFill />
          </Box>
        </Box>
        <Spacer />
        <Box>
          {/* {post.comments ? post.comments.length : 0} */}
          <NextLink href={`/post/create-comment/${post.id}`}>
            <Box title="Comment" _hover={{ color: "gray", cursor: "pointer" }}>
              <BsReplyAllFill />
            </Box>
          </NextLink>
        </Box>
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
              <NextLink href={`/category/${post.PostCategory_Id}`}>
                <Badge
                  fontSize="sm"
                  colorScheme="green"
                  shadow="md"
                  _hover={{ shadow: "1px 1px 8px #888888", cursor: "pointer" }}
                >
                  {post.PostCategory_Title}
                </Badge>
              </NextLink>
              <Tag colorScheme="whatsapp" shadow="md">
                @misterSPD
              </Tag>
              <Tag>
                Moderator
              </Tag>
            </HStack>
            <Box fontSize="xl">
              <strong>{post.PostInformation_Title}</strong>
            </Box>
            <Box>{post.PostInformation_Content}</Box>
          </Box>
          <Box>
            <Box fontSize="sm" fontStyle="italic" color="gray.600" mt={3}>
              <HStack spacing={10}>
                <Box>created at </Box>
                {post.createdAt === post.updatedAt ? null : (
                  <Box>updated at </Box>
                )}
              </HStack>
            </Box>
            <Box position="absolute" bottom={0} right={0} mr={4} mb={4}>
              <HStack spacing={4}>
                "Delete Button Here"
              </HStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};
