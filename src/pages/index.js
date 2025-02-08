import * as React from "react"
import Timeline from '../components/timeline/Timeline'
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
// gatsby-browser.js

import '@fortawesome/fontawesome-free/css/all.min.css';

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


const IndexPage = ({ data }) => {
  const items = data.allEntriesJson.nodes;

  return (
    <div
      style={{ "backgroundColor": '#222222'}}
    >
      <Timeline items={items} />
    </div>
  );
};

export const query = graphql`
  {
  allEntriesJson {
    nodes {
      id
      title
      datetime
      image {
        src
        alt
        caption
      }
      body
      categories
      faicon
      links {
        href
        linkText
      }
    }
  }
}
`;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage