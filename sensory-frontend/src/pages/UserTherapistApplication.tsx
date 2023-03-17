import { useState, useEffect } from 'react';
import axios from '../api/axios';

interface UserInformation {
  UserInformation_Id: number;
  UserInformation_Name: string;
  UserType_Id: number;
  UserInformation_Password: string;
  UserInformation_Email: string;
  UserInformation_Description: string;
}

const TherapistApplication = () => {
  const [therapist, setTherapist] = useState({
    name: '',
    username: '',
    workplace: '',
    license: '',
    regdate: '',
    valid: '',
  });
  const [content, setContent] = useState("");
  const [tempContent, setTempContent] = useState('');
  const [userId, setUserId] = useState(0);
  const [currentUserInformation, setCurrentUserInformation] = useState<UserInformation | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
    .get(`http://localhost:3081/api/getuserid/${username}`)
    .then((response) => {
      setUserId(response.data);
      return axios.get(`http://localhost:3081/api/userinformation/${userId}`);
    })
    .then((response) => {
      setCurrentUserInformation(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    setContent(tempContent);
  }, [tempContent])

  const onInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setTherapist((prevTherapist) => ({
      ...prevTherapist,
      [name]: value,
    }));
  };

  const submitApplication = () => {
    console.log(content);
    const applicationObject = {
      application: {
        User_Id: userId, 
        UserType_Id: 1,
        Application_Content: content,
      }
    }
    axios
    .post("http://localhost:3081/api/application/", applicationObject)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setContent(`${therapist.name}|${therapist.username}|${therapist.workplace}|${therapist.license}|${therapist.regdate}|${therapist.valid}`);
    submitApplication();
  };

  return (
    <div style={{ padding: 50 }}>
      <div className='wrapper'>
        {/* css is in Home.css		 */}
        <div className='cards'>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className='card_header'>
                <legend style={{ textAlign: 'center' }}>
                  Therapist Application
                </legend>
              </div>
              <div className='card-body'>
                Full Name (Last, First Middle):&nbsp;
                <input
                  type='text'
                  name='name'
                  onChange={onInputChange}
                  required
                />
                <br />
                Username:&nbsp;
                <input
                  type='text'
                  name='username'
                  onChange={onInputChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <br />
                Place of work:&nbsp;
                <input
                  type='text'
                  name='workplace'
                  onChange={onInputChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <br />
                Professional license number:&nbsp;
                <input
                  type='number'
                  name='license'
                  onChange={onInputChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <br />
                Professional license registration date:&nbsp;
                <input
                  type='date'
                  name='regdate'
                  onChange={onInputChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <br />
                Valid until:&nbsp;
                <input
                  type='date'
                  name='valid'
                  onChange={onInputChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <br />
                <button type='submit' style={{ width: '470px' }}>
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TherapistApplication;
