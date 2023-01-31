import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:3081/api/";

class AuthService {
  login(UserInformation_Name: string, UserInformation_Password: string) {
    return axios
      .post(API_URL + "login", {UserInformation_Name, UserInformation_Password})
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(UserInformation_Name: string, email: string, UserInformation_Password: string) {
    return axios.post(API_URL + "register", {
      UserInformation_Name,
      email,
      UserInformation_Password
    });
  }

  getCurrentUser() {
    axios.get(API_URL+`userinfo`).then(response => {
      return response.data
    })
    return null
  }
}

export default new AuthService();
