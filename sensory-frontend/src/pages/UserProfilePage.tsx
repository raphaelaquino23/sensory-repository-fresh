import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const UserProfile = () => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  return (
    <div>
      <Row className='profileContainer' style={{ marginTop: '40px' }}>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div
                className='upload__image-wrapper'
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  style={{
                    marginBottom: '10px',
                    backgroundColor: '#8eb572',
                    height: '40px',
                    width: '300px',
                    color: '#fff',
                  }}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Select or Drop your image here
                </button>{' '}
                <br></br>
                {imageList.map((image, index) => (
                  <div key={index} className='image-item'>
                    <img src={image.dataURL} alt='' width='300' />
                    <div
                      className='image-item__btn-wrapper'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <button
                        onClick={() => onImageUpdate(index)}
                        style={{
                          backgroundColor: '#8eb572',
                          height: '40px',
                          width: '100px',
                          marginTop: '10px',
                          color: '#fff',
                        }}
                      >
                        Update
                      </button>{' '}
                      &nbsp;
                      <button
                        onClick={() => onImageRemove(index)}
                        style={{
                          backgroundColor: '#8eb572',
                          height: '40px',
                          width: '100px',
                          marginTop: '10px',
                          color: '#fff',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Col>
        <Col
          md={5}
          style={{
            marginTop: '40px',
            marginRight: '20px',
          }}
        >
          <Form>
            <Form.Group controlId='description'>
              <h1>Tell us something about yourself</h1>
              <Form.Control
                as='textarea'
                rows={9}
                placeholder='User bio'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <button
              type='submit'
              style={{
                backgroundColor: '#8eb572',
                height: '40px',
                marginTop: '10px',
                color: '#fff',
              }}
            >
              Submit
            </button>
          </Form>
          <p style={{ bottom: '0%', position: 'fixed' }}>
            Apply as a{' '}
            <a href='/moderator' style={{ color: 'blue' }}>
              moderator
            </a>{' '}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Apply as a{' '}
            <a href='/therapist' style={{ color: 'blue' }}>
              therapist
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
