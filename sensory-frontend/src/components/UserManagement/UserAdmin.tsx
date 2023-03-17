import { useEffect, useState } from "react";
import axios from "axios";
import UsersService from "../../services/UsersService";
import { Alert, Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import User from "./User";

interface UserType {
  UserType_Id: number;
  UserType_Name: string;
  UserType_Description: string;
}

interface UserInformation extends User {
  UserInformation_Id: number;
  UserInformation_Name: string;
  UserInformation_Password: string;
  UserInformation_Email: string;
  UserInformation_Image: string;
  UserInformation_Description: string;
  userType: UserType;
  UserType_Id: number;
}

interface User {
  User_Id: number;
  UserInformation_Id: number;
  userInformation: UserInformation | null;
  User_DateCreated: Date;
  User_DateEdited: Date | null;
  User_DeactivatedStatus: boolean;
  User_DeactivatedBy: number | null;
  userType: UserType;
}

const UserAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [userInformations, setUserInformations] = useState<UserInformation[]>(
    []
  );
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    //Fetch user
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await UsersService.getUser();
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching User Model Data.", error);
      }
      setLoading(false);
    };
    fetchUserData();

    // Fetch all the user types
    axios
      .get<UserType[]>("http://localhost:3081/api/usertype")
      .then((response) => {
        setUserTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user types:", error);
      });

    // Fetch all the users with their associated user information and user type
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UsersService.getAllUserInformation();
        setUserInformations(response.data);
      } catch (error) {
        console.log("Error fetching user information data", error);
      }
      setLoading(false);
    };
    fetchData();
    setShowAlert(true);
  }, []);

  useEffect(() => {
    return () => {
      handleShowAlert();
    };
  }, []);

  const changeUserType = async (user: User, userType: UserType) => {
    try {
      const response = await axios.put(
        `http://localhost:3081/api/user/${user.User_Id}`,
        {
          userInformationId: user.UserInformation_Id,
          userType: {
            id: userType.UserType_Id,
            name: userType.UserType_Name,
            description: userType.UserType_Description,
          },
        }
      );

      if (response.status === 200) {
        // Update the user's user type in the state
        const updatedUsers = users.map((u) => {
          if (u.User_Id === user.User_Id) {
            const updatedUserInformation = { ...u.userInformation!, userType };
            return { ...u, userInformation: updatedUserInformation };
          } else {
            return u;
          }
        });
        setUsers(updatedUsers);
      } else {
        console.error(`Failed to update user ${user.User_Id}'s user type`);
      }
    } catch (error) {
      console.error(
        `Error updating user ${user.User_Id}'s user type: ${error}`
      );
    }
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2 style={{ fontSize: "25px" }}>
              User <b>Management</b>
            </h2>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success">
        User Updated Successfully!
      </Alert>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Role</th>
            <th className="th" style={{ textAlign: "right" }}>
              Action
            </th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {userInformations.map((userInfo, index) => (
              <tr key={userInfo.UserInformation_Id}>
                <User user={userInfo} />
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};

export default UserAdmin;
