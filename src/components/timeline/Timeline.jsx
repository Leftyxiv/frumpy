import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CustomCard from '../CustomCard/CustomCard';

// import './Timeline.css'; // Optional: for custom styling

const Timeline = ({ items }) => {
  return <>
    <VerticalTimeline>
      { items.map((item) => <CustomCard item={ item } />)}
    </VerticalTimeline>
  </>
};

export default Timeline;