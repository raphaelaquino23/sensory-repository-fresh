import { useState, useEffect } from 'react';
import axios from '../api/axios';

const RadioInput = ({
  label,
  value,
  checked,
  setter,
}: {
  label: string;
  value: string;
  checked: any;
  setter: any;
}) => {
  return (
    <label>
      <input
        type='radio'
        checked={checked === value}
        onChange={() => setter(value)}
      />
      <span>{label}</span>
    </label>
  );
};

interface UserInformation {
  UserInformation_Id: number;
  UserInformation_Name: string;
  UserType_Id: number;
  UserInformation_Password: string;
  UserInformation_Email: string;
  UserInformation_Description: string;
}

const ModeratorApplication = () => {
  const [siteModerator, setSiteModerator] = useState();
  const [role, setRole] = useState();
  const [moderator, setModerator] = useState({
    name: '',
    username: '',
    availability: '',
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

  const submitApplication = () => {
    const applicationObject = {
      application: {
        User_Id: userId, 
        UserType_Id: 3,
        Application_Content: `${moderator.name}|${moderator.username}|${siteModerator}|${moderator.availability}|${role}`
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

  const onInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setModerator((prevModerator) => ({
      ...prevModerator,
      [name]: value,
    }));
    setContent(`${moderator.name}|${moderator.username}|${siteModerator}|${moderator.availability}|${role}`);
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setContent(`${moderator.name}|${moderator.username}|${siteModerator}|${moderator.availability}|${role}`);
    submitApplication();
  };

  return (
    <div style={{ padding: 50 }}>
      <div className='wrapper'>
        <div className='cards'>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className='card_header'>
                <legend style={{ textAlign: 'center' }}>
                  Moderator Application
                </legend>
              </div>
              <div className='card-body'>
                Full Name:&nbsp;
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
                <div>
                  <h6 style={{ marginTop: '10px' }}>
                    Have you ever been a moderator on a website?:
                  </h6>
                  <RadioInput
                    label='Yes'
                    value='yes'
                    checked={siteModerator}
                    setter={setSiteModerator}
                  />
                  <RadioInput
                    label='No'
                    value='no'
                    checked={siteModerator}
                    setter={setSiteModerator}
                  />
                </div>
                When are you usually available as a moderator?&nbsp;
                <br />
                <input
                  type='text'
                  name='availability'
                  onChange={onInputChange}
                  required
                  style={{ marginTop: '10px' }}
                />
                <br />
                <div>
                  <h6 style={{ marginTop: '10px' }}>
                    Do you understand the role of a moderator for SensAware?:
                  </h6>
                  <RadioInput
                    label='Yes'
                    value='yes'
                    checked={role}
                    setter={setRole}
                  />
                  <RadioInput
                    label='No'
                    value='no'
                    checked={role}
                    setter={setRole}
                  />
                </div>
                <button type='submit' style={{ width: '470px', display: 'block', margin: '0 auto' }}>
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

export default ModeratorApplication;
