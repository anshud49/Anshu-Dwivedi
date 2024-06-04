import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import './Bookshelf.css';
import Card from './Card';

function Bookshelf() {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || {};

    return (
        <div className="Bookshelf">
            <nav className="navbar">
                <Link style={{ textDecoration: 'none' }} to='/' className="nav-item">
                    <IoMdArrowRoundBack className='size arrow' />
                </Link>
                <div className="nav-item content">
                    <span className='size'>My Bookshelf</span>
                </div>
            </nav>

            <div className="bookshelf-container">
                {Object.keys(bookshelf).length === 0 ? (
                    <p>No books added to the bookshelf.</p>
                ) : (
                    <div className="cards-container">
                        {Object.values(bookshelf).map((book) => (
                            <Card
                                key={book.key}
                                title={book.title}
                                editionCount={book.editionCount}
                                isAdded={true} 
                                onAdd={() => {}} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bookshelf;
