import {useContext, useState, useEffect} from 'react';
import {ArticleContext} from '../../contexts/ArticleContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm';
import UploadFile from './UploadFile';
import Filter from 'bad-words';
// import '../../index.css';

const Article = ({article} : { article: any}) => {
	const {deleteArticle} = useContext(ArticleContext)
	const [show, setShow] = useState(false);
		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

  const filter = new Filter();

  useEffect(() => {
     handleClose()
  }, [article])

  return (
    <>
    	<td>{article.ArticleInformation_Name ? filter.clean(article.ArticleInformation_Name) : ''}</td> 
      <td>{article.ArticleInformation_Description ? filter.clean(article.ArticleInformation_Description) : ''}</td>
      <td>{article.ArticleInformation_PublishedBy ? filter.clean(article.ArticleInformation_PublishedBy) : ''}</td>
      <td>{article.ArticleInformation_Url}</td>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Edit
            </Tooltip>
          }>
            <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Delete
          	</Tooltip>
          }>
            <button onClick={() => deleteArticle(article.ArticleInformation_Id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
        </OverlayTrigger>
                
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm theArticle={article} />
        </Modal.Body>
  	  </Modal>
  	</>
  )
}

export default Article;