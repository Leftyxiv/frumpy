import React from 'react';
import { Link } from 'gatsby';
import CustomCard from '../components/CustomCard/CustomCard';
import '../components/layout.css';
import './post.css';

export default function PostTemplate({ pageContext }) {
  const { post } = pageContext;

  return (
    <div className="timeline-container">
      <div className="back-nav">
        <Link to="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Timeline
        </Link>
      </div>
      <div className="single-post-container">
        <CustomCard item={post} />
      </div>
    </div>
  );
} 