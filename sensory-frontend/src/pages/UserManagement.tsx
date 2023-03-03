import UserList from "../components/UserManagement/UserList";
import UserContextProvider from "../contexts/UserContext";

function User() {
    return(
        <div className="container-x1">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <UserContextProvider>
                        <UserList />
                    </UserContextProvider>
                </div>
            </div>
        </div>
    )
}

export default User;