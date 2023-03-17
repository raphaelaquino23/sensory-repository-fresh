// import UserList from "../components/UserManagement/UserList";
// import UserContextProvider from "../contexts/UserContext";

// function User() {
//     return(
//         <div className="container-x1">
//             <div className="table-responsive">
//                 <div className="table-wrapper">
//                     <UserContextProvider>
//                         <UserList />
//                     </UserContextProvider>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default User;

import { useEffect, useState } from "react";
import axios from "axios";
import UsersService from "../services/UsersService";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { textAlign } from "@mui/system";

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

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [userInformations, setUserInformations] = useState<UserInformation[]>(
    []
  );
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleShow = () => setShow(true);
  const handleShowDelete = () => setShowDelete(true);
  const handleClose = () => setShow(false);

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

  const getUserTypeName = (userTypeId: number): string => {
    switch (userTypeId) {
      case 1:
        return "Therapist";
      case 2:
        return "Admin";
      case 3:
        return "Moderator";
      case 4:
        return "Regular User";
      default:
        return "Unknown";
    }
  };

  const handleClickDelete = async (userInfoId: number) => {
    UsersService.deleteUser(userInfoId);
    setShowDelete(false);
  };

  const deleteItem = userInformations;

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

      <table
        className="table"
        style={{ marginLeft: "110px", width: "85%", marginTop: "205px" }}
      >
        <thead>
          <th>Name</th>
          <th>Email Address</th>
          <th>Role</th>
          <th className="th" style={{ textAlign: "right" }}>
            Action
          </th>
        </thead>
        {!loading && (
          <tbody>
            {userInformations.map((userInfo, index) => (
              <tr key={userInfo.UserInformation_Id}>
                <td>{userInfo.UserInformation_Name}</td>
                <td>{userInfo.UserInformation_Email}</td>
                <td>{getUserTypeName(userInfo.UserType_Id)}</td>
                <td style={{ textAlign: "right" }}>
                  <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}
                  >
                    <button
                      onClick={handleShow}
                      style={{ display: "inline-block", alignItems: "right" }}
                      className="btn text-warning btn-act"
                      data-toggle="modal"
                    >
                      <i className="material-icons">&#xE254;</i>
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
                  >
                    <button
                      onClick={handleShowDelete}
                      style={{ display: "inline-block", alignItems: "right" }}
                      className="btn text-danger btn-act"
                      data-toggle="modal"
                    >
                      <i className="material-icons">&#xE872;</i>
                    </button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* <EditUser theUser={userinformation} /> */}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this User?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              //handleClickDelete();
            }}
          >
            OK
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserPage;
