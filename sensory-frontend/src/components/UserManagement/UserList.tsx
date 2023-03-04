import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {UserContext} from '../../contexts/UserContext';
import User from './User';
import UserRegistrationPage from '../../pages/UserRegistrationPage'; //Registration
// import UserPagination from './UserPagination';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import '../../index.css';

const UserList = () => {
  // const {sortedUsers} = useContext(UserContext);

  const [listUserInformation, setListUserInformation] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSearchUSer = (event: React.ChangeEvent<any>) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axiosPrivate.get(`http://localhost:3081/api/userinformation`).then((response) => {
      setListUserInformation(response.data);
    });
  }, []);

  // useEffect(() => {
  //   axiosPrivate.get(`http://localhost:3081/api/user`).then((response) => {
  //     setListUserInformation(response.data);
  //   });
  // }, []);

  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  // const totalPagesNum = Math.ceil(sortedUsers.length / usersPerPage);

  return(
    <>
      <div className="table-title" style={{marginLeft: "1px", marginRight: "3px"}}>
        <div className="row">
          <div className="col-sm-6">
            <h2> User <b>Management </b></h2>
          </div>
        </div>
      </div>

      <input
        className="inpt"
        placeholder="Search"
        style={{border: "2px solid black"}}
        value={search} 
        onChange={handleSearchUSer}
      />

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email Address</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listUserInformation
            .filter((user: { UserInformation_Name: string, UserInformation_Email: string}) => {
              if(user) {
                if (search === "") {
                  return user;
                } else if (
                  user.UserInformation_Name.toLowerCase().includes(search.toLowerCase()) ||
                  user.UserInformation_Email.toLowerCase().includes(search.toLowerCase()) 
                  // usertype.UserType_Name.toLowerCase().includes(search.toLowerCase()) 
                  // user.UserInformation_Status.toLowerCase().includes(search.toLowerCase())
                ) {
                  return user;
                }
              }
            })
            .map(
              (
                user: { UserInformation_Id: Key | null | undefined }
              ) => (
                <tr key={user.UserInformation_Id}>
                  <User user={user} />
                </tr>
              )
            )}
        </tbody>
      </table>

      {/* <UserPagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentUsers={currentUsers}
        sortedUsers={sortedUsers}
      /> */}
    </>
  )
  
}

export default UserList;