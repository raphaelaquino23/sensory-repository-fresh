import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UsersService from "../services/UsersService";

type UserContextType = {
  login?: any;
  logout?: any;
  register?: any;
  updateUser?: any;
  deleteUser?: any;
};

export const UserContext = createContext<UserContextType>({}); //https://stackoverflow.com/questions/72316650/reactjs-with-typescript-template-usecontext-property-does-not-exists-on-type

const UserContextProvider = (props: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const history = useNavigate();

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")!));
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  });

  const sortedUsers = users.sort((a, b) => (a.name < b.name ? -1 : 1)); //https://stackoverflow.com/questions/44147937/property-does-not-exist-on-type-never

  const login = (
    UserInformation_Name: string,
    UserInformation_Password: string
  ) => {
    setUsers([...users, { UserInformation_Name, UserInformation_Password }]);
  };

  const logout = (User_Id: number) => {
    setUsers([...users, { User_Id }]);
    window.location.reload();
    history("/");
  };

  const register = (
    UserInformation_Name: string,
    UserInformation_Password: string
  ) => {
    setUsers([...users, { UserInformation_Name, UserInformation_Password }]);
    history("/login");
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.UserInformation_Id !== id));
    UsersService.deleteUser(id);
  };

  const updateUser = (UserInformation_Id: number, updatedUser: string) => {
    setUsers(
      users.map((user) =>
        user.UserInformation_Id === UserInformation_Id ? updatedUser : user
      )
    );
    window.location.reload();
    history("/");
  };

  return (
    <UserContext.Provider
      value={{ login, logout, register, deleteUser, updateUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
