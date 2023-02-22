import React, { useState } from 'react';

interface Article {
  url: string;
  title: string;
  // other article fields go here
}

function NewsSearch() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);

  const searchNews = async (e: any) => {
    e.preventDefault();
    const apiKey = '1242c215ec28489aa62aaec91b002d69';
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles);
  };

  return (
    <div>
      <form onSubmit={searchNews}>
        <label>
          Search News:
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {articles.length ? (
        <ul>
          {articles.map((article) => (
            <li key={article.url}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}

export default NewsSearch;