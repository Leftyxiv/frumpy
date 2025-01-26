import React, { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CustomCard from '../CustomCard/CustomCard';
import FilterBar from '../FilterBar/FilterBar';

// import './Timeline.css'; // Optional: for custom styling

const Timeline = ({ items }) => {
  const [filter, setFilter] = useState('');
  return <>
    <FilterBar onCategoryChange={setFilter} />
    <VerticalTimeline >
      { items
        .filter((item) => filter ? item.categories.includes(filter) : true)
        .map((item) => <CustomCard item={ item } />)
      }
    </VerticalTimeline>
  </>
};

export default Timeline;