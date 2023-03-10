import React, { useState } from 'react';
import './NewsSearch.css';

interface Article {
  url: string;
  title: string;
  publishedAt: string;
  source: { name: string };
}

const NewsSearch = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);

  const searchNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = '1242c215ec28489aa62aaec91b002d69'; // replace with your News API key
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const filteredArticles = data.articles.filter((article: Article) => {
      const lowerCaseTitle = article.title.toLowerCase();
      return !(
        lowerCaseTitle.includes('lgbt') ||
        lowerCaseTitle.includes('trans') ||
        lowerCaseTitle.includes('gay') ||
        lowerCaseTitle.includes('sex')
      );
    });
    setArticles(filteredArticles);
  };

  return (
    <div className="center">
      <div className="box">
        <form onSubmit={searchNews}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search News"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-bar"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Article Name</th>
              <th>Publisher</th>
              <th>Publishing Date</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.url} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>
                  <a href={article.url}>{article.title}</a>
                </td>
                <td>{article.source.name}</td>
                <td>{new Date(article.publishedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <p>No articles found</p>}
      </div>
    </div>
  );
};

export default NewsSearch;
