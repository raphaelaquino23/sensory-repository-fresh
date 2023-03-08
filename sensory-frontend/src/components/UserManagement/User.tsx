// import {useContext, useState, useEffect} from 'react';
// import { useAuth } from '../../contexts/AuthProvider';
// import {UserContext} from '../../contexts/UserContext';
// import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

// const User = ({user} : { user: any}) => {
//   const {deleteUser} = useContext(UserContext)
//   const { userType } = useAuth();
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
// 	const handleClose = () => setShow(false);

//   return (
//     <>
//       <td>{user.UserInformation_Name}</td>
//       <td>{user.UserInformation_Email}</td>
//       <td>{user.UserType_Name}</td>
//       <td>{user.User_DeactivatedStatus}</td>
//       <td>
//         <OverlayTrigger
//           overlay={
//             <Tooltip id={`tooltip-top`}>
//               Delete
//             </Tooltip>
//           }>
//             <button onClick={() => deleteUser(user.UserInformation_Id)}  style={{display: 'inline-block'}} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
//         </OverlayTrigger>      
//       </td>
//     </>
//   )
// }

// export default User;

import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserType {
  id: number;
  name: string;
  description: string;
}

interface UserInformation {
  id: number;
  name: string;
  password: string;
  email: string;
  image: string;
  description: string;
  userType: UserType;
}

interface User {
  id: number;
  userInformationId: number;
  userInformation: UserInformation | null;
  dateCreated: Date;
  dateEdited: Date | null;
  deactiveStatus: boolean;
  deactivatedBy: number | null;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);

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
    axios.get<User[]>(`http://localhost:3081/api/user?include=userinformation.usertype`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  const changeUserType = async (user: User, userType: UserType) => {
    try {
      const response = await axios.put(`http://localhost:3081/api/user/${user.id}`, {
        userInformationId: user.userInformationId,
        userType: {
          id: userType.id,
          name: userType.name,
          description: userType.description,
        },
      });

      if (response.status === 200) {
        // Update the user's user type in the state
        const updatedUsers = users.map(u => {
          if (u.id === user.id) {
            const updatedUserInformation = { ...u.userInformation!, userType };
            return { ...u, userInformation: updatedUserInformation };
          } else {
            return u;
          }
        });
        setUsers(updatedUsers);
      } else {
        console.error(`Failed to update user ${user.id}'s user type`);
      }
    } catch (error) {
      console.error(`Error updating user ${user.id}'s user type: ${error}`);
    }
  };
  return (
    <div>
      <h1>Manage Users</h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>{user.userInformation?.name || 'Unnamed User'}</h2>
            <p>User Type: {user.userInformation?.userType.name || 'Unknown'}</p>
            <select
              value={user.userInformation?.userType.id}
              onChange={event => {
                const userType = userTypes.find(type => type.id === parseInt(event.target.value));
                if (userType) {
                  changeUserType(user, userType);
                }
              }}
            >
              {userTypes.map(userType => (
                <option key={userType.id} value={userType.id}>
                  {userType.name}
                </option>
              ))}
            </select>
          
            {/* <p>Created: {user.dateCreated}</p>
            <p>Last Edited: {user.dateEdited || 'Never'}</p> */}
        
        <p>Deactivated: {user.deactiveStatus ? 'Yes' : 'No'}</p>
      </li>
    ))}
  </ul>
</div>);
};

export default UserPage;