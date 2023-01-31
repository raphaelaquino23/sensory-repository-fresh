import { useState } from 'react';

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

const ModeratorApplication = () => {
  const [siteModerator, setSiteModerator] = useState();
  const [role, setRole] = useState();
  const [moderator, setModerator] = useState({
    name: '',
    username: '',
    availability: '',
  });

  const onInputChange = (e: React.ChangeEvent<any>) => {
    //e returns an error
    setModerator({ ...moderator, [e.target.name]: e.target.value });
  };

  const { name, username, availability } = moderator;

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const data = { siteModerator, role };
    const json = JSON.stringify(data, null, 4);
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

export default ModeratorApplication;