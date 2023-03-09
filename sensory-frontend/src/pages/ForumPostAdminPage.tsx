import PostContextProvider from '../contexts/PostContext';
import PostList from '../components/Forum/ForumAdminPostList';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

function UserForum() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div className='container-xl'>
        <div className='table-responsive'>
          <div className='table-wrapper'>
            <PostContextProvider>
              <PostList />
            </PostContextProvider>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default UserForum;
