import {useContext, useState, useEffect} from 'react';
import {ArticleContext} from '../../contexts/ArticleContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm';
import { saveAs } from 'file-saver';
import ArticleService from "../../services/ArticleService";
import { axiosPrivate } from '../../api/axios';
import FileDownload from 'js-file-download';
import Axios from 'axios';

const Article = ({article} : { article: any}) => {
	const {deleteArticle} = useContext(ArticleContext)
	const [show, setShow] = useState(false);
		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
  useEffect(() => {
     handleClose()
  }, [article])


const onClickChange = (e:any) => {    
  e.preventDefault();
  Axios({
    url: `http://localhost:3081/api/getFile/${article.ArticleInformation_Id}`,
    method: "GET",
    responseType: "blob",
  }).then((res) => {
    FileDownload(res.data, `${article.ArticleInformation_Url}`);
  })
  //console.log(file);
};

  return (
    <>
    	<td>
				<a rel="noopener noreferrer" target="_blank">{article.ArticleInformation_Name} </a>
			</td> 
      <td>{article.ArticleInformation_Description}</td>
      <td>{article.ArticleInformation_PublishedBy}</td>
			<td>{article.topic}</td>
			<td><Button onClick={(e)=>onClickChange(e)}>Download</Button></td>

        <Modal show={show} onHide={handleClose}>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thank you for upvoting!
          </Button>
        </Modal.Footer>
  	  </Modal>
  	</>
  )
}

export default Article;