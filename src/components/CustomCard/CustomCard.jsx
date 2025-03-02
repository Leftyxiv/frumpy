// src/components/CustomCard.js

import React, { useState } from "react";
import { Link } from "gatsby";
import "./CustomCard.css"; // Create this CSS file for custom styles
import "./TimelineEntry.css";
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import categoryColors from './categoryColors';
import BlueskyEmbed from '../BskyEmbed/BluskyEmbed';
import BookmarkButton from '../BookmarkButton';
import ShareButtons from '../ShareButtons';

const CustomCard = ({ item }) => {
  let iconValue = '';
  if (item.faicon.startsWith('brand')) {
    iconValue = `fa-brands fa-${item.faicon.replace('brand-', '')}`;
  } else {
    iconValue = `fa-solid fa-${item.faicon}`;
  }
  let colorToUse = categoryColors[item.categories[0]];
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 300;
  
  const bodyText = item.body.replace(/<[^>]+>/g, ''); // Strip HTML tags for length check
  const isLongText = bodyText.length > MAX_LENGTH;
  
  return (
    <VerticalTimelineElement
    className="vertical-timeline-element"
    contentStyle={{ background: '#333333', color: '#fff' }}
    contentArrowStyle={{ borderRight: `7px solid  ${ colorToUse }` }}
    date={ `${item.categories.map((category) => category.replaceAll('-', ' ')).join(', ')}` }
    iconStyle={{ background: colorToUse, color: '#fff' }}
    key={ item.id }
    // icon={<FontAwesomeIcon icon={`fa-solid fa-${item.faicon}`} />}
    icon={<i className={ iconValue }></i>}
  >
    <div className='custom-card-content'>
    <Link to={`/post/${item.id}/`} className="entry-title-link">
      <h3 className="vertical-timeline-element-title">{ item.title }</h3>
    </Link>
    <h4 className="vertical-timeline-element-subtitle">{ item.datetime }</h4>
    <a href={ item.image.link } target="_blank" rel="noopener noreferrer">
    {/* {`${item.image.link}`}  */}
      <img
        className='card-image'
        src={ item.image.src }
        alt={ item.image.alt }
        style={{ marginBottom: '0px' }}
      />
    </a>
    <p className="custom-card-caption"><i>{ item.image.caption }</i></p>
    </div>
    <div className={`entry-body ${isExpanded ? 'expanded' : ''}`}>
      <div dangerouslySetInnerHTML={{ 
        __html: isExpanded ? item.body : item.body.slice(0, MAX_LENGTH) + '...' 
      }} />
      {isLongText && (
        <button 
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
    {item.links && (
      <div key={`div-${item.id}`} className="custom-card-links">
        {item.links.map((link, index) => (
          <>
          <a key={ `link-${ index }-${ item.id }` } href={link.href} target="_blank" rel="noopener noreferrer">
            {link.linkText}
          </a>
          <br />
          </>
        ))}
        <div className="entry-footer">
          <div className="footer-left">
            <ShareButtons entry={item} />
          </div>
          <span className="entry-date">{item.datetime}</span>
        </div>
      </div>
    )}
  </VerticalTimelineElement>
  );
};

export default CustomCard;