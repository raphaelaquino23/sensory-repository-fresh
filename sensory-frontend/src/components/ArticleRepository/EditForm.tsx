import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import ArticleService from "../../services/ArticleService";

const EditForm = ({theArticle} : { theArticle: any}) =>{
	const [newArticle, setNewArticle] = useState({
    name: "",
    description: "",
    category: "",
    publishedBy: "",
  });
  const [selectedFile, setSelectedFile] = useState();

  const onInputChange = (e:any) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const onFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  const { name, description, category, publishedBy } = newArticle;

  const handleSubmit = async (e:any) => {
    e.preventDefault();
		
    const formData = new FormData();
    // formData.append("file", selectedFile);

    const articleObject = {
        article: {},
        articleInformation:{
          ArticleInformation_Name: name,
          ArticleTopic_Id: 1, 
          ArticleInformation_Description: description,
          ArticleInformation_PublishedBy: publishedBy
        },
        articleStats:{
          ArticleStats_Upvotes: 0,
          ArticleStats_Clicks: 0,
          ArticleStats_Downloads: 0,
        },
        // fileName: selectedFile.name
      };

    ArticleService.upload(formData).then((returnedThis:any) => returnedThis);
		ArticleService.create(articleObject).then((returnedArticle:any) => returnedArticle);
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
        />
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
        />
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
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Add New Article
      </Button>
    </Form>
  );
}

export default EditForm;