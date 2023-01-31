import { useState } from 'react';

const TherapistApplication = () => {
  const [therapist, setTherapist] = useState({
    name: '',
    username: '',
    workplace: '',
    license: '',
    regdate: '',
    valid: '',
  });

  const onInputChange = (e: React.ChangeEvent<any>) => {
    //e returns an error
    setTherapist({ ...therapist, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
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
