import ArticleList from '../components/ArticleRepository/ArticleListUserView';
import ArticleContextProvider from '../contexts/ArticleContext';

function ArticleUser() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <ArticleContextProvider>
            <ArticleList />
          </ArticleContextProvider>
        </div>
      </div>
    </div>
  );
}

export default ArticleUser;