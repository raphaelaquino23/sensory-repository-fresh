import axios from 'axios'
const UserInfo_URL = 'http://localhost:3081/api/userinformation/';
const User_URL = 'http://localhost:3081/api/user/';
const Username_URL = 'http://localhost:3081/api/getuserid';

const getAllUserInfo = () => {
  const request = axios.get(UserInfo_URL)
  return request.then(response => response.data);
}

const getAllUsers = () => {
  const request = axios.get(User_URL)
  return request.then(response => response.data);
}

const getUserInfoById = (id:number) => {
  const request = axios.get(`${UserInfo_URL}/${id}`);
  return request.then(response => response.data);
}

const getUserById = (id:number) => {
  const request = axios.get(`${User_URL}/${id}`);
  return request.then(response => response.data);
}

const getUserByName = (username: string) => {
  const request = axios.get(`${Username_URL}/${username}`)
  return request.then(response => response.data)
}

export default { getAllUserInfo, getAllUsers, getUserInfoById, getUserByName };
