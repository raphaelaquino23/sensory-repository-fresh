import { Modal, Button, Alert} from 'react-bootstrap';
import { Key, useContext, useEffect, useState } from 'react';
import {ArticleContext} from '../../contexts/ArticleContext';
import Article from './ArticleUserView';
import AddForm from './AddForm';
import Pagination from './Pagination';
import axios from 'axios';
import { response } from 'express';
import { axiosPrivate } from '../../api/axios';

const ArticleList = () => {
	const {sortedArticles} = useContext(ArticleContext);

	const [listArticleInformation, setListArticleInformation] = useState([]);
	const [listArticleStats, setListArticleStats] = useState([]);

	const [showAlert, setShowAlert] = useState(false);
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [articlesPerPage] = useState(10)

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleSearchArticle = (event: React.ChangeEvent<any>) => {
		setSearch(event.target.value)
	}

	const handleShowAlert = () => {
		setShowAlert(true);
		setTimeout(()=> {
			setShowAlert(false);
		}, 2000)
	}

	useEffect(() => {
		handleClose();

		return () => {
			handleShowAlert();
		}
	}, [sortedArticles])

	useEffect(() => {
		axiosPrivate.get(`http://localhost:3081/api/articlestats`).then((response) => {
			setListArticleStats(response.data)
		})
		axiosPrivate.get(`http://localhost:3081/api/articleinformation`).then((response) => {
			setListArticleInformation(response.data);
		});
	}, []);

	const indexOfLastArticle = currentPage * articlesPerPage;
	const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
	const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
	const totalPagesNum = Math.ceil(sortedArticles.length / articlesPerPage);

	return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Article <b>Repository</b>
            </h2>
          </div>
        </div>
      </div>

      <input 
                className="inpt" 
                placeholder="Search" 
                style={{border: "2px solid black"}} 
                value={search} 
                onChange={handleSearchArticle}
      />

      <Alert show={showAlert} variant="success">
        Article Repository Updated Successfully!
      </Alert>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Published By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {listArticleInformation
            .filter((article: { ArticleInformation_Name: string, ArticleInformation_Description: string, ArticleInformation_PublishedBy: string }) => {
              if (article) {
                if (search === "") {
                  return article;
                } else if (
                  article.ArticleInformation_Name.toLowerCase().includes(
                    search.toLowerCase()
                  ) ||
                  article.ArticleInformation_Description.toLowerCase().includes(search.toLowerCase()) ||
                  article.ArticleInformation_PublishedBy.toLowerCase().includes(search.toLowerCase())
                ) {
                  return article;
                }
              }
            })
            .map(
              (
                article: { ArticleInformation_Id: Key | null | undefined }
              ) => (
                <tr key={article.ArticleInformation_Id}>
                  <Article article={article} />
                </tr>
              )
            )}
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentArticles={currentArticles}
        sortedArticles={sortedArticles}
      />
    </>
  );
}

export default ArticleList;