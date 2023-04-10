import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button } from "react-bootstrap";
import "./styles//Register.css";
import axios from "../api/axios";
import RegisterService from "../services/RegisterService";
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
// import FacebookLoginComponent from '../components/User/facebooklogin.component';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null); //go back here
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const clientId =
    "386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com";

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const onSuccess = (res: any) => {};

  const onFailure = (err: string) => {
    console.error("failed", err);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    const userObject = {
      user: {},
      userinformation: {
        UserInformation_Name: user,
        UserInformation_Password: pwd,
        UserInformation_Email: email,
      },
    };
    setSuccess(true);
    RegisterService.create(userObject).then((returnedUser) => returnedUser);
  };

  return (
    <>
      {success ? (
        window.location.replace('http://localhost:3000/login')
      ) : (
        <section
          style={{
            marginTop: "50px",
            borderRadius: "5px",
            backgroundColor: "white",
            border: "solid",
            borderColor: "#B2BEB5",
          }}
        >
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 style={{ fontSize: "30px", textAlign: "center" }}>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group style={{ backgroundColor: "white" }}>
              <label htmlFor="username">
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />
              </label>
              <Form.Control
                type="text"
                id="username"
                placeholder="User Name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                style={{ width: "310px" }}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </Form.Group>
            <label htmlFor="password">
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              style={{ marginTop: "10px", width: "310px" }}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 15 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <label htmlFor="confirm_pwd">
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <Form.Control
              type="password"
              id="confirm_pwd"
              placeholder="Confirm Password"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              style={{ marginTop: "10px", width: "310px" }}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <label htmlFor="email">
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <Form.Control
              type="text"
              id="email"
              placeholder="Email Address"
              ref={emailRef} //not sure if emailRef is needed
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              style={{ marginTop: "10px", width: "310px" }}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must begin with a letter.
              <br />
              Letters, numbers, underscore, dot allowed.
            </p>

            {/* <p
              style={{
                textAlign: 'center',
                marginTop: '5px',
                marginBottom: '-3px',
              }}
            >
              {' '}
              or{' '}
            </p> */}

            {/* <button
              style={{ backgroundColor: '#003959' }}
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button> */}
            <br />
            <p style={{ fontSize: "12px", width: "310px" }}>
              By signing up, you agree to the{" "}
              <a href="/terms" style={{ color: "blue" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" style={{ color: "blue" }}>
                Privacy Policy
              </a>{" "}
              of SensAware
            </p>
            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "10px", width: "310px" }}
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </Button>
          </Form>
          <p>
            Already registered? &nbsp;
            <span className="line">
              {/*put router link here*/}
              <a href="/login" style={{ color: "black" }}>
                <u>Log In</u>
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
