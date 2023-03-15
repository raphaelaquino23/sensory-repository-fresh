import axios from "axios";
const USERINFORMATION_API_URL = "http://localhost:3081/api/userinformation/";
const USER_API_URL = "http://localhost:3081/api/user";
const USERID_API_URL = "http://localhost:3081/api/getuserid/:username";

class UserService {
  saveUserInformation(userInformation: any) {
    return axios.post(USERINFORMATION_API_URL, userInformation);
  }

  getAllUserInformation() {
    return axios.get(USERINFORMATION_API_URL);
  }

  updateUserInformation(userInformation: any) {
    return axios.get(USERINFORMATION_API_URL, userInformation);
  }

  deleteUser(id: number) {
    return axios.delete(`${USER_API_URL}/${id}`);
  }

  getUser() {
    return axios.get(USER_API_URL);
  }

  updateUser() {
    return axios.put(USER_API_URL);
  }
}

export default new UserService();
