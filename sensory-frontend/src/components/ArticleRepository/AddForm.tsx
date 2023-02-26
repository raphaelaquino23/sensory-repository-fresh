// @ts-nocheck
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ArticleService from "../../services/ArticleService";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const SPACE_REGEX = /^\s/;
const SPACE_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;
const SPACE2_REGEX = /^[A-z][A-z0-9-.,?!'_ ]{3,150}$/;
const SPACE3_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;

const AddForm = () => {

  // const errRef = useRef<HTMLParagraphElement>(null);

  const [newArticle, setNewArticle] = useState({
    name: "",
    description: "",
    category: "",
    publishedBy: "",
    url: "",
  });
  const [validArticle, setValidArticle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validPublished, setValidPublished] = useState(false);
  const [articleFocus, setArticleFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //File is to be placed here
	const [selectedFile, setSelectedFile] = useState();

  const onInputChange = (e:any) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrMsg('');
  }, [newArticle]);


  //File is selected from the form here
	const onFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  const { name, description, category, publishedBy, url } = newArticle;

  useEffect(() => {
    const result = SPACE_REGEX.test(name);
    setValidArticle(result);
  }, [name]);

  useEffect(() => {
    const result = SPACE2_REGEX.test(description);
    setValidDescription(result);
  }, [description]);

  useEffect(() => {
    const result = SPACE3_REGEX.test(publishedBy);
    setValidPublished(result);
  }, [publishedBy]);

  //this sends the file out
  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const v1 = SPACE_REGEX.test(name);
    const v2 = SPACE2_REGEX.test(description);
    const v3 = SPACE3_REGEX.test(publishedBy)
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry');
      return;
    }
    // const v1 = SPACE_REGEX.test(newArticle);
    // if (v1) {
    //   setErrMsg('Invalid Entry');
    //   return;
    // }
		
    const formData = new FormData();
    formData.append("file", selectedFile);

    const articleObject = {
        article: {},
        articleInformation:{
          ArticleInformation_Name: name,
          ArticleTopic_Id: 1, 
          ArticleInformation_Description: description,
          ArticleInformation_PublishedBy: publishedBy,
          ArticleInformation_Url: url
        },
        articleStats:{
          ArticleStats_Upvotes: 0,
          ArticleStats_Clicks: 0,
          ArticleStats_Downloads: 0,
        },
        fileName: selectedFile.name
      };
      setSuccess(true)
    ArticleService.upload(formData).then((returnedThis:any) => returnedThis);
		ArticleService.create(articleObject).then((returnedArticle:any) => returnedArticle);
    window.location.reload();
  };

  return (
   <Form onSubmit={handleSubmit}>
      <Form.Group>
        {/* <label htmlFor='newArticle'>
        <FontAwesomeIcon
          icon={faCheck}
          className={validArticle ? 'valid' : 'hide'}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validArticle || !name ? 'hide' : 'invalid'}
        />
        </label> */}
        <Form.Control
          type="text"
          placeholder="Article Name"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
          aria-invalid={validArticle ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setArticleFocus(true)}
          onBlur={() => setArticleFocus(false)}
        />
        <p
          id='uidnote'
          className={
          articleFocus && name && !validArticle ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
            Field must not be empty
        </p>
      </Form.Group>
      <Form.Group>
      {/* <label htmlFor='newArticle'>
        <FontAwesomeIcon
          icon={faCheck}
          className={validDescription ? 'valid' : 'hide'}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validDescription || !description ? 'hide' : 'invalid'}
        />
        </label> */}
        <Form.Control
          as="textarea"
          placeholder="Article Description"
          rows={3}
          name="description"
          value={description}
          onChange={(e) => onInputChange(e)}
          required
          aria-invalid={validDescription ? 'false' : 'true'}
          aria-describedby='dcnote'
          onFocus={() => setArticleFocus(true)}
          onBlur={() => setArticleFocus(false)}
        />
        <p
          id='dcnote'
          className={
          articleFocus && description && !validDescription ? 'instructions' : 'offscreen'
          }
        >
        <FontAwesomeIcon icon={faInfoCircle} />
          Field must not be empty
        </p>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="file"
          formEncType="multipart/form-data"
          placeholder="file"
          name="file"
          accept=".pdf"
          onChange={(e) => onFileChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Published By"
          name="publishedBy"
          value={publishedBy}
          onChange={(e) => onInputChange(e)}
          required
          aria-invalid={validPublished ? 'false' : 'true'}
          aria-describedby='pbnote'
          onFocus={() => setArticleFocus(true)}
          onBlur={() => setArticleFocus(false)}
        />
        <p
          id='pbnote'
          className={
          articleFocus && publishedBy && !validPublished ? 'instructions' : 'offscreen'
          }
        >
        <FontAwesomeIcon icon={faInfoCircle} />
          Field must not be empty
        </p>
      </Form.Group>
      <Button variant="success" type="submit">
        Add New Article
      </Button>
    </Form>
  );

}
export default AddForm;

// import { Form, Button } from "react-bootstrap";
// import { useState, Fragment } from "react";
// import Message from './Message';
// import Progress from './Progress';
// import ArticleService from "../../services/ArticleService";
// import axios from "../../api/axios";

// const AddForm = () => {

//   const [newArticle, setNewArticle] = useState({
//     ArticleInformation_Name: "",
//     ArticleInformation_Description: "",
//     ArticleInformation_Category: "",
//     ArticleInformation_PublishedBy: "",
//   });
// 	const [file, setFile] = useState({ArticleInformation_Url: ""})
// 	const [filename, setFilename] = useState('Choose File');
//   const [uploadedFile, setUploadedFile] = useState({});
//   const [message, setMessage] = useState('');
//   const [uploadPercentage, setUploadPercentage] = useState(0);

//   const onInputChange = (e:any) => {
//     setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
//   };

// 	const onFileChange = (e:any) => {
//     setFile(e.target.files[0]);
// 		setFilename(e.target.files[0].name);
//   };

//   const { ArticleInformation_Name, ArticleInformation_Description, ArticleInformation_Category, ArticleInformation_PublishedBy } = newArticle;
// 	const { ArticleInformation_Url } = file;

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
// 		const formData = new FormData();
//     formData.append('file', file as unknown as string);
// 		formData.append('newArticle', newArticle as unknown as string);

//     try {
//       const res = await axios.post('http://localhost:3081/api/article', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         // onUploadProgress: progressEvent => {
//         //   setUploadPercentage(
//         //     parseInt(
//         //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
//         //     )
//         //   );
//         // }
//       });
      
//       // Clear percentage
//       setTimeout(() => setUploadPercentage(0), 10000);

//       const { fileName, filePath } = res.data;

//       setUploadedFile({ fileName, filePath });

//       setMessage('File Uploaded');
//     } catch (err: any) {
//       if (err.response.status === 500) {
//         setMessage('There was a problem with the server');
//       } else {
//         setMessage(err.response.data.msg);
//       }
//       setUploadPercentage(0)
//     }
// 		// const formData = new FormData();
// 		// formData.append('newArticle', newArticle as unknown as string);
// 		// formData.append('file', file as unknown as any);

// 		// try {
// 		// 	const res = await axios.post('http://localhost:3081/api/article', formData, {
// 		// 		headers: {
// 		// 			'Content-Type': 'multipart/form-data'
// 		// 		}
// 		// 	})
// 		// } catch (err) {
// 		// 	console.log(err)
// 		// }
		
// 		// const articleObject = {
// 		// 	article: {},
// 		// 	articleInformation:{
// 		// 		ArticleInformation_Name: name,
// 		// 		ArticleTopic_Id: 1, 
// 		// 		ArticleInformation_Description: description,
// 		// 		ArticleInformation_Url: url,
// 		// 		ArticleInformation_PublishedBy: publishedBy,
// 		// 		ArticleInformation_Image: 'default.png'
// 		// 	},
// 		// 	articleStats:{
// 		// 		ArticleStats_Upvotes: 0,
// 		// 		ArticleStats_Clicks: 0,
// 		// 		ArticleStats_Downloads: 0,
// 		// 	}
// 		// };
// 		// ArticleService.create(articleObject).then((returnedArticle) => console.log(returnedArticle));
//   };

// 	return (
//     <Fragment>
//       {message ? <Message msg={message} /> : null}
//       <Form onSubmit={handleSubmit}>
// 			<Form.Group>
//          <Form.Control
//            type="text"
//            placeholder="Article Name *"
//            name="ArticleInformation_Name"
//            value={ArticleInformation_Name}
//            onChange={(e) => onInputChange(e)}
//            required
//          />
//        </Form.Group>
//        <Form.Group>
//          <Form.Control
//            as="textarea"
//            placeholder="Article Description"
//            rows={3}
//            name="ArticleInformation_Description"
//            value={ArticleInformation_Description}
//            onChange={(e) => onInputChange(e)}
//         />
//        </Form.Group>
//         <Form.Group>
//          <Form.Control
//            type="text"
//            placeholder="Category *"
//            name="ArticleInformation_Category"
//            value={ArticleInformation_Category}
//            onChange={(e) => onInputChange(e)}
//            required
//          />
// 				 </Form.Group>
//         <div className='custom-file mb-4'>
//           <input
//             type='file'
//             className='custom-ArticleInformation_Url-input'
//             id='customFile'
//             onChange={onFileChange}
//           />
//           <label className='custom-file-label' htmlFor='customFile'>
//             {filename}
//           </label>
//         </div>
// 				<Form.Group>
//          <Form.Control
//           type="text"
//           placeholder="Published By"
//           name="ArticleInformation_PublishedBy"
//           value={ArticleInformation_PublishedBy}
//           onChange={(e) => onInputChange(e)}
//         />
//       </Form.Group>

//         {/* <Progress percentage={uploadPercentage} /> */}

//         <input
//           type='submit'
//           value='Upload'
//           className='btn btn-primary btn-block mt-4'
//         />
//       </Form>
//       {/* {uploadedFile ? (
//         <div className='row mt-5'>
//           <div className='col-md-6 m-auto'>
//             <h3 className='text-center'>{uploadedFile.fileName}</h3>
//             <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
//           </div>
// 					<button onClick="{downloadFile}">Download</button>
//         </div>
//       ) : null} */}
//     </Fragment>
//   );
// };

// export default AddForm;