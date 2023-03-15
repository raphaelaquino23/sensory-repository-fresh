import axios from "axios";
const USERINFORMATION_API_URL = "http://localhost:3081/api/userinformation/";
const USER_API_URL = "http://localhost:3081/api/user";
const USERTYPE_API_URL = "http://localhost:3081/api/usertypeId";
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

  updateUserInfoUserTypeId(userTypeId: number, userId: number) {
    console.log(USERTYPE_API_URL, { userTypeId, userId });
    return axios.put(USERTYPE_API_URL, { userTypeId, userId });
  }
}

export default new UserService();
