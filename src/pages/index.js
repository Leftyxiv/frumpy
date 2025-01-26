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
      <h1>LOOK AT ME</h1>
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

/*
<div className={styles.textCenter}>
      <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      <p className={styles.intro}>
        <b>Example pages:</b>{" "}
        {samplePageLinks.map((link, i) => (
          <React.Fragment key={link.url}>
            <Link to={link.url}>{link.text}</Link>
            {i !== samplePageLinks.length - 1 && <> · </>}
          </React.Fragment>
        ))}
        <br />
        Edit <code>src/pages/index.js</code> to update this page.
      </p>
    </div>
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}${utmParameters}`}
          >
            {link.text} ↗
          </a>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      ))}
    </ul>
    {moreLinks.map((link, i) => (
      <React.Fragment key={link.url}>
        <a href={`${link.url}${utmParameters}`}>{link.text}</a>
        {i !== moreLinks.length - 1 && <> · </>}
      </React.Fragment>
    ))}
      */