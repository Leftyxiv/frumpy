const crypto = require(`crypto`);
const entries = require(`./content/entries.js`);
const entries2 = require(`./content/entries2.js`);

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
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.sourceNodes = async ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions;
  const entriesToMap = entries.concat(entries2)
                              .sort((a, b) => Number(b.sort_id) - Number(a.sort_id));

  if (!entries || !Array.isArray(entriesToMap)) {
    reporter.panic(`Entries data is missing or not an array!`);
    return;
  }

  reporter.info(`Starting to source ${entriesToMap.length} entries...`);

  for (const [index, entry] of entriesToMap.entries()) {
    const nodeId = createNodeId(`entries-${entry.id}`);

    const entryNode = {
      ...entry,
      id: nodeId,
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

    try {
      createNode(entryNode);
    } catch (error) {
      reporter.warn(`Failed to create node for entry ${entry.id}: ${error.message}`);
      continue;
    }

    if ((index + 1) % 500 === 0) {
      reporter.info(`Processed ${index + 1}/${entriesToMap.length} entries...`);
    }
  }

  reporter.info(`Successfully sourced ${entriesToMap.length} entries.`);
};