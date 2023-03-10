import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import {
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { GiAnatomy } from "react-icons/gi"

const NotNavbar = () => {

  return (
    <>
    <ChakraProvider resetCSS theme={theme}>
      <Nav>
        <Box ml={{ base: "0%", md: "0%", lg: "-5%" }} fontWeight="bold">
          <NavLink to={'/'}>
            <HStack _hover={{ color: "#1BD3A7" }}>
              <Box>
                <GiAnatomy size="3em" />
              </Box>
              <Heading size="2xl">SensAware</Heading>
            </HStack>
          </NavLink>
        </Box>
        <Bars />
        <NavMenu>
          <NavLink to='/Article-user'>
            Articles
          </NavLink>
          <NavLink to='/forum'>
            Forum
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
      </ChakraProvider>
    </>
  );
};

export default NotNavbar;