import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type ArticleContextType = {
	addArticle?: any
	addArticleUser?: any
	addArticleStats?: any
	deleteArticle?: any
	sortedArticles?: any
	updateArticle?: any
}

export const ArticleContext = createContext<ArticleContextType>({}); //https://stackoverflow.com/questions/72316650/reactjs-with-typescript-template-usecontext-property-does-not-exists-on-type

const ArticleContextProvider = (props: any) => {
  const [articles, setArticles] = useState<any[]>([]);
  const history = useNavigate();

  useEffect(() => {
    setArticles(JSON.parse(localStorage.getItem('articles')!));
  }, []);

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  });

  const sortedArticles = articles.sort((a, b) => (a.ArticleInformation_Name < b.ArticleInformation_Name ? -1 : 1)); //https://stackoverflow.com/questions/44147937/property-does-not-exist-on-type-never

  const addArticle = (
    ArticleInformation_Name: string,
    ArticleInformation_Description: string,
    ArticleInformation_Url: string,
    ArticleInformation_PublishedBy: string
  ) => {
    setArticles([
      ...articles,
      {
        ArticleInformation_Name,
        ArticleInformation_Description,
        ArticleInformation_Url,
        ArticleInformation_PublishedBy,
      },
    ]);
    window.location.reload();
    history('/article');
  };

	const addArticleUser = (User_Id: number, ArticleInformation_Name: string, ArticleInformation_Description: string, ArticleInformation_Url: string, ArticleInformation_PublishedBy: string,
		ArticleStats_Upvotes: number, ArticleStats_Clicks: number, ArticleStats_Downloads: number) => {
		setArticles([...articles , {User_Id, ArticleInformation_Name, ArticleInformation_Description, ArticleInformation_Url, ArticleInformation_PublishedBy,
			ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads}])
		window.location.reload();
		history("/article");
	}

	const addArticleStats = (ArticleStats_Upvotes: number, ArticleStats_Clicks: number, ArticleStats_Downloads: number) => {
		setArticles([...articles , {ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads}])
		window.location.reload();
		history("/article");
	}

  const deleteArticle = (ArticleInformation_Id: number) => {
    setArticles(
      articles.filter(
        (article) => article.ArticleInformation_Id !== ArticleInformation_Id
      )
    );
    axios.delete(
      `http://localhost:3081/api/articleinformation/${ArticleInformation_Id}`
    );
    window.location.reload();
    history('/article');
  };

  const updateArticle = (
    ArticleInformation_Id: number,
    updatedArticle: string
  ) => {
    setArticles(
      articles.map((article) =>
        article.ArticleInformation_Id === ArticleInformation_Id
          ? updatedArticle
          : article
      )
    );
    window.location.reload();
    history('/article');
  };

  return (
  	<ArticleContext.Provider value={{sortedArticles, addArticle, deleteArticle, updateArticle, addArticleStats, addArticleUser}}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
