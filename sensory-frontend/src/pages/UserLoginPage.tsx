import { Form, Button, Card, Image } from "react-bootstrap"
import {UserContext} from '../contexts/UserContext';
import {useRef, useCallback, useContext, useState, useEffect} from 'react';
import {axiosPrivate} from "../api/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";
import ReCAPTCHA from 'react-google-recaptcha';
import FacebookLogin from 'react-facebook-login';
import FBRegisterService from '../services/FBRegisterService';

const Login2 = () =>{
  interface IFacebook { 
		name: string;
		email: string;
	}
  
	const fb: IFacebook = {
		name: '',
		email: ''
	}
  
  const { setAuth } = useContext(AuthContext);
	// const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
	const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
	const navigate = useNavigate();

	const centered = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15vh',
  };

  const responseFacebook = (response: any) => {
    const authThis = "hello"

    if (response.accessToken) {
      const userEmail = response.graphDomain + response.name;
      const userInformationObject: any = {
        user:{},
        userinformation:{
          UserInformation_Name: response.name,
          UserInformation_Password: response.userID,
          UserInformation_Email: userEmail,
          UserInformation_Image: response.picture.data.url,
          UserInformation_Description: response.graphDomain,
          UserType_Id: 4
        }
      }
      FBRegisterService
        .create(userInformationObject)
        .then((returnedRegister:any) => {
        })

      setSuccess(true);
      localStorage.setItem("auth", authThis);
      localStorage.setItem("role", '4');
      localStorage.setItem("accessToken", (response.accessToken));
      localStorage.setItem("user", userInformationObject);
      localStorage.setItem("username", response.name);
    } else {
      setSuccess(false);
    }
  }

	const [userinformation, setUserInformation] = useState({
    UserInformation_Name:"", UserInformation_Password: ""
  });

	const onInputChange = (e: React.ChangeEvent<any>) => { //e returns an error
		setUserInformation({...userinformation,[e.target.name]: e.target.value})
	}

  const verify = () => {
    setCaptchaSuccess(true)
  }

	const { UserInformation_Name, UserInformation_Password } = userinformation

  useEffect(() => {
		setErrMsg('');
	}, [UserInformation_Name, UserInformation_Password])

	const activateAPI= useCallback(async () => {
    const response = await axiosPrivate.post('http://localhost:3081/api/login' ,{userinformation: userinformation})
    if (response.data) {
      localStorage.setItem("accessToken", (response.data));
          setSuccess(true);
      localStorage.setItem("username", UserInformation_Name);
    } else {
      setErrMsg('Username or password is incorrect');
    }
    return response.data;
  }, [userinformation]);

  const handleSubmit = useCallback((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    activateAPI();
  }, [activateAPI])

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//         const response = await axiosPrivate.post('http://localhost:3081/api/login',
//             JSON.stringify({ userinformation }),
//             {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             }
//         );
//         console.log(JSON.stringify(response?.data));
//         //console.log(JSON.stringify(response));
//         const accessToken = response?.data?.accessToken;
//         const roles = response?.data?.roles;
//         setAuth({ userinformation, roles, accessToken });
//         setUserInformation(userinformation);
//         setSuccess(true);
//     } catch (err) {
//         if (!err?.response?) {
//             setErrMsg('No Server Response');
//         } else if (err?.response?.status === 400) {
//             setErrMsg('Missing Username or Password');
//         } else if (err.response?.status === 401) {
//             setErrMsg('Unauthorized');
//         } else {
//             setErrMsg('Login Failed');
//         }
//         errRef.current?.focus();
//     } 
// }

	return (
    <>
      {success && captchaSuccess === true ? (
        <section>
          <h1>You are logged in!</h1>
          <p>Welcome {localStorage.getItem("username")}</p>
          <br />
          <p>
            <a href="/home">Click here to continue</a>
          </p>
        </section>
      ) : (
        <section style={{ marginTop: "40px", borderRadius: "5px", backgroundColor: "white", border: "solid", borderColor: "#B2BEB5"}}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 style={{fontSize: "30px", textAlign: "center"}}><b>Log In</b></h1>
          <Form onSubmit={handleSubmit} style={{backgroundColor: "white"}}>
            <Form.Group style={{backgroundColor: "white"}}>
              <Form.Control
                type="text"
                placeholder="User Name"
                name="UserInformation_Name"
                value={UserInformation_Name}
                onChange={(e) => onInputChange(e)}
								style={{marginTop: "10px"}}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="UserInformation_Password"
                value={UserInformation_Password}
                onChange={(e) => onInputChange(e)}
								style={{marginTop: "10px"}}
                required
              />
            </Form.Group>
						{!success || !captchaSuccess ? (
        <div>
          <div style={centered}>
            <ReCAPTCHA
              onSubmit={verify}
              sitekey="6Lehx-8iAAAAALhAhjl6R1wnedHo0XNtS2IhFUdn"
              data-theme="dark"
              onChange={verify}
							style={{marginTop: "10px"}}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
            <Button variant="success" type="submit" style={{marginTop: "10px"}}>
              Login
            </Button>
						
						<div style={centered}>
            <FacebookLogin
              buttonStyle={{
                width: "380px",
                height: "43px",
                alignItems: "center",
                display: "inline-flex",
								marginTop: "-100px"
              }}
              // appId="468886398448206"
							// appId="717585733227340"
							appId="839713883737549"
              textButton="Login with Facebook"
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          </div>
          </Form>
          <p>
            Need An Account? &nbsp;
            <span className="line">
              <a href="register" style={{color: "black"}}><u>Sign Up</u></a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Login2;

// import { Form, Button, Card, Image } from "react-bootstrap"
// import {UserContext} from '../contexts/UserContext';
// import {useRef, useCallback, useContext, useState, useEffect} from 'react';
// import {axiosPrivate} from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../contexts/AuthProvider";
// import ReCAPTCHA from 'react-google-recaptcha';
// import FacebookLogin from 'react-facebook-login';
// import FBRegisterService from '../services/FBRegisterService';

// const Login2 = () =>{
//   interface IFacebook { 
// 		name: string;
// 		email: string;
// 	}
  
// 	const fb: IFacebook = {
// 		name: '',
// 		email: ''
// 	}
  
//   const { setAuth } = useContext(AuthContext);

// 	const userRef = useRef<HTMLInputElement>(null);
//   const errRef = useRef<HTMLParagraphElement>(null);
// 	const [errMsg, setErrMsg] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [captchaSuccess, setCaptchaSuccess] = useState(false);
// 	const navigate = useNavigate();

//   // useEffect(() => {
//   //   userRef.current.focus();
//   // }, [])

// 	const centered = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '15vh',
//   };

//   const responseFacebook = (response: any) => {
//     const authThis = "hello"

//     if (response.accessToken) {
//       const userEmail = response.graphDomain + response.name;
//       const userInformationObject: any = {
//         user:{},
//         userinformation:{
//           UserInformation_Name: response.name,
//           UserInformation_Password: response.userID,
//           UserInformation_Email: userEmail,
//           UserInformation_Image: response.picture.data.url,
//           UserInformation_Description: response.graphDomain,
//           UserType_Id: 4
//         }
//       }
//       FBRegisterService
//         .create(userInformationObject)
//         .then((returnedRegister:any) => {
//         })

//       setSuccess(true);
//       localStorage.setItem("auth", authThis);
//       localStorage.setItem("role", '4');
//       localStorage.setItem("accessToken", (response.accessToken));
//       localStorage.setItem("user", userInformationObject);
//       localStorage.setItem("username", response.name);
//     } else {
//       setSuccess(false);
//     }
//   }

// 	const [userinformation, setUserInformation] = useState({
//     UserInformation_Name:"", UserInformation_Password: ""
//   });

//   useEffect(() => {
//     setErrMsg('');
//   }, [userinformation])

// 	const onInputChange = (e: React.ChangeEvent<any>) => { //e returns an error
// 		setUserInformation({...userinformation,[e.target.name]: e.target.value})
// 	}

//   const verify = () => {
//     setCaptchaSuccess(true)
//   }

// 	const { UserInformation_Name, UserInformation_Password } = userinformation

// 	const activateAPI= useCallback(async () => {
//     // setAuth({ userinformation })
//     setUserInformation({UserInformation_Name:"", UserInformation_Password: ""});
//     setSuccess(true);
// 		const response = await axiosPrivate.post('http://localhost:3081/api/login' ,{userinformation: userinformation})
//         if (response.data) {
//           localStorage.setItem("accessToken", (response.data));
//       		setSuccess(true);
//           localStorage.setItem("username", UserInformation_Name);
//         }
//         return response.data;
// 	}, [userinformation]);

// 	useEffect(() => {
// 		setErrMsg('');
// 	}, [UserInformation_Name, UserInformation_Password])

// 	const handleSubmit = useCallback((e: React.ChangeEvent<any>) => {
// 		e.preventDefault();
// 		try {
//         activateAPI();
//       } catch (err: any) {
// 			if (!err?.response) {
// 					setErrMsg('No Server Response');
// 			} else if (err.response?.status === 400) {
// 					setErrMsg('Missing Username or Password');
// 			} else if (err.response?.status === 401) {
// 					setErrMsg('Unauthorized');
// 			} else {
// 					setErrMsg('Login Failed');
// 			}
//       errRef.current?.focus();
// 	}
// 		///activateAPIStats();
// 	}, [activateAPI])

// 	return (
//     <>
//       {success && captchaSuccess === true ? (
//         <section>
//           <h1>You are logged in!</h1>
//           <p>Welcome {localStorage.getItem("username")}</p>
//           <br />
//           <p>
//             <a href="/home">Click here to continue</a>
//           </p>
//         </section>
//       ) : (
//         <section style={{ marginTop: "40px", borderRadius: "5px", backgroundColor: "white", border: "solid", borderColor: "#B2BEB5"}}>
//           <p ref={errRef} className={errMsg ? "errmsg" : 
//           "offscreen"} aria-live="assertive">{errMsg}</p>
//           <h1 style={{fontSize: "30px", textAlign: "center"}}><b>Log In</b></h1>
//           <Form onSubmit={handleSubmit} style={{backgroundColor: "white"}}>
//             <Form.Group style={{backgroundColor: "white"}}>
//               <Form.Control
//                 type="text"
//                 placeholder="User Name *"
//                 name="UserInformation_Name"
//                 value={UserInformation_Name}
//                 onChange={(e) => onInputChange(e)}
// 								style={{marginTop: "10px"}}
//                 required
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Control
//                 type="password"
//                 placeholder="Password *"
//                 name="UserInformation_Password"
//                 value={UserInformation_Password}
//                 onChange={(e) => onInputChange(e)}
// 								style={{marginTop: "10px"}}
//                 required
//               />
//             </Form.Group>
// 						{!success || !captchaSuccess ? (
//         <div>
//           <div style={centered}>
//             <ReCAPTCHA
//               onSubmit={verify}
//               sitekey="6Lehx-8iAAAAALhAhjl6R1wnedHo0XNtS2IhFUdn"
//               data-theme="dark"
//               onChange={verify}
// 							style={{marginTop: "10px"}}
//             />
//           </div>
//         </div>
//       ) : (
//         <div></div>
//       )}
//             <Button variant="success" type="submit" style={{marginTop: "10px"}}>
//               Login
//             </Button>
						
// 						<div style={centered}>
//             <FacebookLogin
//               buttonStyle={{
//                 width: "380px",
//                 height: "43px",
//                 alignItems: "center",
//                 display: "inline-flex",
// 								marginTop: "-100px"
//               }}
//               // appId="468886398448206"
// 							// appId="717585733227340"
// 							appId="839713883737549"
//               textButton="Login with Facebook"
//               fields="name,email,picture"
//               scope="public_profile,user_friends"
//               callback={responseFacebook}
//               icon="fa-facebook"
//             />
//           </div>
//           </Form>
//           <p>
//             Need An Account? &nbsp;
//             <span className="line">
//               <a href="register" style={{color: "black"}}><u>Sign Up</u></a>
//             </span>
//           </p>
//         </section>
//       )}
//     </>
//   );
// }

// export default Login2;