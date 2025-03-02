const crypto = require(`crypto`);
const entries = require(`./content/entries.js`);
const entries2 = require(`./content/entries2.js`);
const entries3 = require(`./content/entries3.js`);

// const entries = require('./content/entries');
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  
  // Using the already sorted entries from earlier in the file
  const entriesToMap = [...(await entries), ...(await entries2), ...(await entries3)]
    .sort((a, b) => {
      // Parse the datetime strings into Date objects
      const dateA = new Date(a.datetime.replace(' ', 'T'));
      const dateB = new Date(b.datetime.replace(' ', 'T'));
      // Sort in descending order (most recent first)
      return dateB - dateA;
    });

  console.log('Creating pages with these entries:', entriesToMap.map(e => e.id)); // Debug log
  
  entriesToMap.forEach(entry => {
    const path = `/post/${entry.id}/`;
    console.log('Creating page at path:', path); // Debug log
    
    createPage({
      path: path,
      component: require.resolve('./src/templates/post.js'),
      context: {
        post: entry,
      },
    });
  });
};

exports.sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions;
  const entriesToMap = [...(await entries), ...(await entries2), ...(await entries3)]
    .sort((a, b) => {
      // Parse the datetime strings into Date objects
      const dateA = new Date(a.datetime.replace(' ', 'T'));
      const dateB = new Date(b.datetime.replace(' ', 'T'));
      // Sort in descending order (most recent first)
      return dateB - dateA;
    });

  if (!entries || !Array.isArray(entriesToMap)) {
    reporter.panic(`Entries data is missing or not an array!`);
    return;
  }

  reporter.info(`Starting to source ${entriesToMap.length} entries...`);

  for (const entry of entriesToMap) {
    // Use the original ID instead of creating a new one
    const entryNode = {
      ...entry,
      // Keep the original ID
      id: entry.id,
      parent: null,
      children: [],
      internal: {
        type: `EntriesJson`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(entry))
          .digest(`hex`),
      },
    };

    createNode(entryNode);

    if ((entriesToMap.indexOf(entry) + 1) % 500 === 0) {
      reporter.info(`Processed ${entriesToMap.indexOf(entry) + 1}/${entriesToMap.length} entries...`);
    }
  }

  reporter.info(`Successfully sourced ${entriesToMap.length} entries.`);
};