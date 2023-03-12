import { Form, Button } from "react-bootstrap"
import {useEffect, useState} from 'react';
import ArticleService from "../../services/ArticleService";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SPACE_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;
const SPACE2_REGEX = /^[A-z][A-z0-9-.,?!'_ ]{3,150}$/;
const SPACE3_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;

const EditForm = ({theArticle} : { theArticle: any}) =>{
	const [newArticle, setNewArticle] = useState({
    name: "",
    description: "",
    category: "",
    url: "",
    publishedBy: "",
  });

  const [validName, setValidName] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validPublished, setValidPublished] = useState(false);
  const [articleFocus, setArticleFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const onInputChange = (e:any) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrMsg('');
  }, [newArticle]);

  const onFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  const { name, description, url, publishedBy } = newArticle;

  useEffect(() => {
    const result = SPACE_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = SPACE2_REGEX.test(description);
    setValidDescription(result);
  }, [description]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const v1 = SPACE_REGEX.test(name);
    const v2 = SPACE2_REGEX.test(description);
    const v3 = SPACE3_REGEX.test(publishedBy)
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry');
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile!);

		const articleObject = {
			article: {},
			articleInformation:{
				ArticleInformation_Id: theArticle.ArticleInformation_Id,
				ArticleInformation_Name: name,
				ArticleTopic_Id: 1, 
				ArticleInformation_Description: description,
				// ArticleInformation_Url: url,
				ArticleInformation_PublishedBy: publishedBy,
				ArticleInformation_Image: 'default.png'
			},
			articleStats:{
				ArticleStats_Upvotes: 0,
				ArticleStats_Clicks: 0,
				ArticleStats_Downloads: 0,
			},
      // fileName: selectedFile?.[name]
		};
    ArticleService.update(formData).then((returnedThis:any) => returnedThis);
		ArticleService.update(articleObject).then((returnedArticle:any) => returnedArticle);
    window.location.reload();
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
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={() => setArticleFocus(true)}
          onBlur={() => setArticleFocus(false)}
        />
        <p
          id='uidnote'
          className={
          articleFocus && name && !validName ? 'instructions' : 'offscreen'
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
      <Button variant="success" type="submit" style={{width: "340px"}}>
        Edit Article
      </Button>
    </Form>
  );
}

export default EditForm;