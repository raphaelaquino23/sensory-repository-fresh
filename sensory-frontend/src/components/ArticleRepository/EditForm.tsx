import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import ArticleService from "../../services/ArticleService";

const EditForm = ({theArticle} : { theArticle: any}) =>{
	const [newArticle, setNewArticle] = useState({
    name: "",
    description: "",
    category: "",
    url: "",
    publishedBy: "",
  });

  const onInputChange = (e:any) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const { name, description, category, url, publishedBy } = newArticle;

  const handleSubmit = (e:any) => {
    e.preventDefault();
		const articleObject = {
			article: {},
			articleInformation:{
				ArticleInformation_Id: theArticle.ArticleInformation_Id,
				ArticleInformation_Name: name,
				ArticleTopic_Id: 1, 
				ArticleInformation_Description: description,
				ArticleInformation_Url: url,
				ArticleInformation_PublishedBy: publishedBy,
				ArticleInformation_Image: 'default.png'
			},
			articleStats:{
				ArticleStats_Upvotes: 0,
				ArticleStats_Clicks: 0,
				ArticleStats_Downloads: 0,
			}
		};
		ArticleService.update(articleObject).then((returnedArticle:any) => returnedArticle);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Article Name *"
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
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Category *"
          name="category"
          value={category}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Article URL *"
          name="url"
          value={url}
          onChange={(e) => onInputChange(e)}
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
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Edit Article
      </Button>
    </Form>
  );
}

export default EditForm;