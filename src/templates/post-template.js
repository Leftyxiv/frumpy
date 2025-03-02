import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import CustomCard from '../components/CustomCard/CustomCard';

import './post.css';

export default function PostTemplate({ data }) {
  const entry = data.allEntriesJson.nodes[0];
  
  return (
    <Layout>
      <CustomCard entry={entry} isFullPost={true} />
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    allEntriesJson(filter: { id: { eq: $id } }) {
      nodes {
        id
        title
        datetime
        body
        image {
          src
          alt
          caption
        }
        links {
          href
          linkText
        }
        categories
      }
    }
  }
`; 