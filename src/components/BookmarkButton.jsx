import React, { useState, useEffect } from 'react';

const BookmarkButton = ({ entry }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if this entry is bookmarked on component mount
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(entry.id));
  }, [entry.id]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter(id => id !== entry.id);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } else {
      bookmarks.push(entry.id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button 
      className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={toggleBookmark}
      aria-label={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      <i className={`fas fa-bookmark ${isBookmarked ? 'filled' : 'outline'}`} />
    </button>
  );
};

export default BookmarkButton;
