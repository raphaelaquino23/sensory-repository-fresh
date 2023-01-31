import { Col, Row } from 'react-bootstrap';

const UserView = () => {
  return (
    <div>
      <Row className='userContainer' style={{ marginTop: '40px' }}>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          Image of the user <br />
          username
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '90px',
              backgroundColor: '#8eb572',
              height: '40px',
              width: '100px',
              color: '#fff',
            }}
          >
            Message
          </button>
        </Col>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
          }}
        >
          Bio of the user <br />
          <br />
        </Col>
      </Row>
    </div>
  );
};

export default UserView;
