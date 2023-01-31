import ArticleList from '../components/ArticleRepository/ArticleListAdmin';
import ArticleContextProvider from '../contexts/ArticleContext';

function Article() {
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

export default Article;