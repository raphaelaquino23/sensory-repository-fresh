import {useContext, useState, useEffect} from 'react';
import {ArticleContext} from '../../contexts/ArticleContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import FileDownload from 'js-file-download';
import Axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Article = ({article} : { article: any}) => {
	const {deleteArticle} = useContext(ArticleContext)
	const [show, setShow] = useState(false);
  const [articleUpvotes, setArticleUpvotes] = useState(0);
  // const [articler, setArticler] = useState('');
  const [articlerId, setArticleUserId] = useState('');
  const [articleId, setArticleId] = useState('');

		
  const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
  const navigate = useNavigate()
  
  // useEffect(() => {
  //    handleClose()
  // }, [article])

  // useEffect(() => {
  //   handleClose()
  //   axiosPrivate.get(`http://localhost:3081/api/articlestats/${article.ArticleInformation_Id}`).then((response) => {
  //     setArticleUpvotes(response.data.ArticleStats_Upvotes);
  //   })
  // })

  useEffect(() => {
    handleClose()
    axiosPrivate.get(`http://localhost:3081/api/articlestats/${article.ArticleInformation_Id}`).then((response) => {
      // setArticleUpvotes(response.data.ArticleStats_Upvotes);
   }) 
   axiosPrivate.get(`http://localhost:3081/api/article/${article.ArticleInformation_Id}`).then((response) => {
     setArticleUserId(response.data.User_Id);
     setArticleId(response.data.Article_Id);
   }) 
  //  axiosPrivate.get(`http://localhost:3081/api/userinformation/${articlerId}`).then((response => {
  //    setArticler(response.data.UserInformation_Name);
  //  }))
 })

  const handleUpvote = async (e:any) => {
    e.preventDefault();
    const res = await axiosPrivate.get(`http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`);
    const articleRes = await axiosPrivate.get(`http://localhost:3081/api/article/${article.ArticleInformation_Id}`);
    const upvoteObject = {
      article: {
        Article_Id: articleRes.data.Article_Id,
        ArticleStats_Id: articleRes.data.ArticleStats_Id,
      },
      user_Id: res.data,
    }
    await axiosPrivate.post('http://localhost:3081/api/articleUpvoteTracker', upvoteObject);
    // window.location.reload();
    console.log("hello" + articleUpvotes);
  }

  const handleArticleDetail = async (e:any) => {
    e.preventDefault();
    const getArticleId = await axiosPrivate.get(`http://localhost:3081/api/article/${article.ArticleInformation_Id}`);
    localStorage.setItem("article", article.ArticleInformation_Id);
    navigate(`/articledetail/`) 
  }

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
			{/* <td>{article.topic}</td> */}
			<td><Button onClick={(e)=>onClickChange(e)}>Download</Button></td>
      <td>
        {articleUpvotes}
      </td>
      <td>
      <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              Edit
            </Tooltip>
          }>
            <button onClick={handleUpvote}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xe8dc;</i></button>
        </OverlayTrigger>
      </td>
        <Modal show={show} onHide={handleClose} style={{width: "300px", alignItems: "center", marginLeft: "500px"}}>
        <Modal.Header>
          <Button variant="secondary" onClick={handleClose} style={{textAlign: "center", marginLeft: "10px"}}>
            Thank you for upvoting!
          </Button>
        </Modal.Header>
  	  </Modal>
  	</>
  )
}

export default Article;