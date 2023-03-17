import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import UsersService from "../../services/UsersService";

const UserEdit = ({ user }: { user: any }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    UsersService.updateUserInfoUserTypeId(
      selectedItem,
      user.UserInformation_Id
    );
    console.log(user);
    console.log("userinfo Id:: " + user.UserInformation_Id);
    console.log("selected Item:: " + selectedItem);
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Select
          onChange={(e) => {
            const item = parseInt(e.target.value);
            setSelectedItem(item);
            console.log("onChange item" + item);
          }}
        >
          <option value={1}>Therapist</option>
          <option value={2}>Admin</option>
          <option value={3}>Moderator</option>
          <option value={4}>User</option>
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
