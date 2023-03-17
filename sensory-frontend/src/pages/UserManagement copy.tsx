import UserAdmin from "../components/UserManagement/UserAdmin";
import UserContextProvider from "../contexts/UserContext";

function UserManagement2() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <UserContextProvider>
            <UserAdmin />
          </UserContextProvider>
        </div>
      </div>
    </div>
  );
}
export default UserManagement2;
