// @ts-nocheck
import { createContext, useCallback, useContext, useEffect, useId, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import jwt from 'jwt-decode';
export type AuthContextType = {
  user?: any,
  userType?: any,
  auth?: any
  setAuth: (isAuth: boolean) => void
};

const AuthContext = createContext<AuthContextType>({
  setAuth: () => {}
});
export const useAuth= () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState('');
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('')
  const authThis = "hello"
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuth = async() => {
        try{
            const stringifyToken = (localStorage.getItem('accessToken') || '{}')
            const usertoken = jwt(stringifyToken)
            const resUser = await axios.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`)
            setUserId(resUser.data);

            const res = await axios.get(
                `http://localhost:3081/api/logged-user/${resUser.data}`,
                {withCredentials: true}
            );
            const userTypeId = res.data.UserType_Id
            const resType = await axios.get(
              `http://localhost:3081/api/usertype/${userTypeId}`
            )
            const tokenIto = localStorage.getItem("accessToken")
            if(!tokenIto){
              res.send(res.status(404))
            } else if (tokenIto) {
              console.log("usertypeeeeeeeeeeee" + userTypeId)
              localStorage.setItem("auth", authThis)
              localStorage.setItem("role", userTypeId)
              console.log("adasipjaoidjads" + resUser.data)
              setUser(res.data)
              setUserType(resType.data)
            }
        } catch (error) {
            setUser('')
        };
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ setAuth(isAuth) {}, auth, user, userType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
