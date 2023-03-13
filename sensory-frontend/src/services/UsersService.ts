import axios from "axios";
const USERINFORMATION_API_URL = "http://localhost:3081/api/userinformation/";
const USER_API_URL = "http://localhost:3081/api/user/";
const Username_URL = "http://localhost:3081/api/getuserid";

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

  deleteUser(user: any) {
    return axios.delete(USER_API_URL, user);
  }
}

export default new UserService();
