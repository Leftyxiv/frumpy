// src/components/CustomCard.js

import React from "react";
import "./CustomCard.css"; // Create this CSS file for custom styles
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import categoryColors from './categoryColors';
import BlueskyEmbed from '../BskyEmbed/BluskyEmbed';

const CustomCard = ({ item }) => {
  let iconValue = '';
  if (item.faicon.startsWith('brand')) {
    iconValue = `fa-brands fa-${item.faicon.replace('brand-', '')}`;
  } else {
    iconValue = `fa-solid fa-${item.faicon}`;
  }
  let colorToUse = categoryColors[item.categories[0]];
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
    <h3 className="vertical-timeline-element-title">{ item.title }</h3>
    <h4 className="vertical-timeline-element-subtitle">{ item.datetime }</h4>
    <a href={ item.image.link } target="_blank" rel="noopener noreferrer">
      <img
        className='card-image'
        src={ item.image.src }
        alt={ item.image.alt }
        style={{ marginBottom: '0px' }}
      />
    </a>
    <p className="custom-card-caption"><i>{ item.image.caption }</i></p>
    </div>
    <p
      className="custom-card-text"
      dangerouslySetInnerHTML={{ __html: item.body }}
    />
    {item.links && (
      <div className="custom-card-links">
        {item.links.map((link, index) => (
          <>
          <a key={ `link-${ index }-${ item.id }` } href={link.href} target="_blank" rel="noopener noreferrer">
            {link.linkText}
          </a>
          <br />
          </>
        ))}
      </div>
    )}
  </VerticalTimelineElement>
  );
};

export default CustomCard;