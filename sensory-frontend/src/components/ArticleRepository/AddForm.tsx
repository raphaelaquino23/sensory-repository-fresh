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
import Filter from 'bad-words';

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
  const filter = new Filter();

  const onInputChange = (e:any) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrMsg('');
  }, [newArticle]);


  //File is selected from the form here
	const onFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
    const temp = e.target.files[0].name.match(/\.([^\.]+)$/)[1];
    switch (temp) {
      case 'pdf':
        // alert('Allowed');
        break;
      default:
        // alert('The file type you have chosen is not allowed.');
        setSelectedFile(null);
    }
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
    try {
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
    } catch (e) {
      alert('The file type you have chosen is not allowed.');
    }
  };

  return (
   <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Article Name"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
          style={{width: "330px"}}
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
        <Form.Control
          as="textarea"
          placeholder="Article Description"
          rows={3}
          name="description"
          value={description}
          onChange={(e) => onInputChange(e)}
          required
          style={{width: "330px"}}
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
          id="idfile"
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
          style={{width: "330px"}}
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
      <Button variant="success" type="submit" style={{width: "330px"}}>
        Add New Article
      </Button>
    </Form>
  );

}
export default AddForm;