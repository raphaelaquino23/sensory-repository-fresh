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

import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserType {
  UserType_Id: number;
  UserType_Name: string;
  UserType_Description: string;
}

interface UserInformation {
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
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [userInformations, setUserInformations] = useState<UserInformation[]>([]);

  useEffect(() => {
    // Fetch all the user types
    axios.get<UserType[]>('http://localhost:3081/api/usertype')
      .then(response => {
        setUserTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching user types:', error);
      });

    // Fetch all the users with their associated user information and user type
    axios.get<UserInformation[]>(`http://localhost:3081/api/userinformation`)
      .then(response => {
        setUserInformations(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const changeUserType = async (user: User, userType: UserType) => {
    try {
      const response = await axios.put(`http://localhost:3081/api/user/${user.User_Id}`, {
        userInformationId: user.UserInformation_Id,
        userType: {
          id: userType.UserType_Id,
          name: userType.UserType_Name,
          description: userType.UserType_Description,
        },
      });

      if (response.status === 200) {
        // Update the user's user type in the state
        const updatedUsers = users.map(u => {
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
      console.error(`Error updating user ${user.User_Id}'s user type: ${error}`);
    }
  };

  const displayUserType = async (userInformation: UserInformation, userType: UserType) => {
    if (userInformation.UserType_Id === userType.UserType_Id) {
      // userTypeName = userType.UserType_Id
      return userType.UserType_Name;
    }
  };



  return (
    <div>
      <h1>Manage Users</h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />

      <ul>
        {userInformations.map(userInformations => (
          <li key={userInformations.UserInformation_Id}>
            <h2>{userInformations.UserInformation_Name || 'Unnamed User'}</h2>
            <h2>{userInformations.UserInformation_Email}</h2>

            

            {/* {userTypes.map(userType => (
              <>
              <h2>{displayUserType(user, usertype)}</h2>
                  <option key={userType.UserType_Id} value={userType.UserType_Id}>
                    {userType.UserType_Name}
                  </option>
              </>
            ))}
            <p>User Type: {user.userType.UserType_Name || 'Unknown'}</p> */}
            
            {users.map(user => (
              <>
                <select
                value={userInformations.UserType_Id}
                onChange={event => {
                  const userType = userTypes.find(type => type.UserType_Id === parseInt(event.target.value));
                  if (userType) {
                    changeUserType(user, userType);
                  }
                }}
              >
                {/* <p>Created: {user.User_DateCreated}</p>
                <p>Last Edited: {user.User_DateEdited || 'Never'}</p> */}
                {userTypes.map(userType => (
                  <option key={userType.UserType_Id} value={userType.UserType_Id}>
                    {userType.UserType_Name}
                  </option>
                ))}
              </select>
              <p>Deactivated: {user.User_DeactivatedStatus ? 'Yes' : 'No'}</p>
              </>
              ))}

              {users.map(user => (
  
              <>
              <p>Deactivated: {user.User_DeactivatedStatus ? 'Yes' : 'No'}</p>
              </>
              
              ))}
        
      </li>
    ))}
  </ul>

  
</div>);
};

export default UserPage;