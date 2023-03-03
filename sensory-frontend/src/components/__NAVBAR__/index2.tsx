import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme';
import { Badge, NavDropdown } from 'react-bootstrap';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';
import {
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { GiAnatomy } from "react-icons/gi"
import { useState } from 'react';
import AuthProvider, { useAuth } from '../../contexts/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setDefaultResultOrder } from 'dns/promises';


const Navbar = () => {
  const navigate = useNavigate();
  const { user, userType } = useAuth();

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("auth");
    localStorage.removeItem("role");  
    localStorage.removeItem("_grecaptcha");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate('/');
  }

  return (
    <>
    <ChakraProvider resetCSS theme={theme}>
      <Nav>
        <Box ml={{ base: "0%", md: "0%", lg: "-5%" }} fontWeight="bold">
          <NavLink to={'/home'}>
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
          <NavLink to='/campaign'>
            Campaigns
          </NavLink>
          <NavLink to='/forum'>
            Forum
          </NavLink>
          <NavLink to='/forum-admin'>
            Forum Management
          </NavLink>
          <NavLink to='/message'>
            Messenger
          </NavLink>
					
        </NavMenu>
        <Badge style={{marginTop: "15px", height: "50%", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 1rem"}}>{userType?.UserType_Name}</Badge>
        <NavDropdown title={localStorage.getItem("username")} id="navbarScrollingDropdown" style={{
						color: "#fff",
						display: "flex",
  					alignItems: "center",
						justifyContent: "flex-end",
  					textDecoration: "none",
  					padding: "0 1rem",
  					height: "100%",
					}}>
          <NavDropdown.Item href="/profile" style={{color: "black"}}>My Profile</NavDropdown.Item>
            <NavDropdown.Item href="/logout" style={{color: "black"}} onClick={logout}>
              Log Out 
            </NavDropdown.Item>
          </NavDropdown>
      </Nav>
      </ChakraProvider>
    </>
  );
};

export default Navbar;