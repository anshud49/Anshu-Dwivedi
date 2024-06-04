import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Card from './Card';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isAdded, setIsAdded] = useState(() => {
    return JSON.parse(localStorage.getItem('bookshelf')) || {} });
  const [error, setError] = useState(null);


  useEffect(() => {
    try {
      const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || {};
      setIsAdded(storedBookshelf);
    } catch (error) {
      console.error('Error loading bookshelf from localStorage:', error);
    }
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem('bookshelf', JSON.stringify(isAdded));
    } catch (error) {
      console.error('Error saving bookshelf to localStorage:', error);
    }
  }, [isAdded]);


  const handleAdd = (book) => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf'));
    console.log(storedBookshelf);
    setIsAdded((prevState) => ({
      ...prevState,
      [book.key]: {
        key: book.key,
        title: book.title,
        editionCount: book.edition_count,
      },
    
    }));    
  };


  const fetchBooks = useCallback(async () => {
    if (query.length > 2) {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setResults(data.docs);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setResults([]);
    }
  }, [query]);

 
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchBooks();
    }, 100);

    return () => clearTimeout(timerId);
  }, [query, fetchBooks]);

  return (
    <div className="Home">
      <nav className="navbar">
        <div className="search-container">
          <span>Search by book name:</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Link style={{ textDecoration: 'none' }} to="/mybookshelf" className="nav-item bookshelf-button">
          <button>My Bookshelf</button>
        </Link>
      </nav>
        
      <div className="adjust">
          <span >Search by book name:</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
     </div>

      {error && <div className="error">{error}</div>}

      <div className="cards-container">
        {results.map((book) => (
          <Card
            key={book.key}
            title={book.title}
            editionCount={book.edition_count}
            isAdded={!!isAdded[book.key]}
            onAdd={() => handleAdd(book)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
