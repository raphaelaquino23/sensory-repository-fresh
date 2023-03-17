import PostContextProvider from '../contexts/PostContext';
import PostListUser from '../components/Forum/ForumPostListUser';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

function ForumUser() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div className='container-xl'>
        <div className='table-responsive'>
          <div className='table-wrapper'>
            <PostContextProvider>
              <PostListUser />
            </PostContextProvider>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default ForumUser;
