import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import UsersService from "../../services/UsersService";

const UserEdit = ({ user }: { user: any }) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [email, setEmail] = useState("");

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

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    //changeUserType();
    //UsersService.updateUser();
  };

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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Select>
          <option>Admin</option>
          <option>Moderator</option>
          <option>Therapist</option>
          <option>User</option>
        </Form.Select>
        <br />
      </Form.Group>
      <Button variant="success" type="submit">
        Change User Type
      </Button>
    </Form>
  );
};

export default UserEdit;
