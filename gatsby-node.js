const crypto = require(`crypto`);
const entries = require(`./content/entries.js`);

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

  if (!entries || !Array.isArray(entries)) {
    reporter.panic(`Entries data is missing or not an array!`);
    return;
  }

  reporter.info(`Starting to source ${entries.length} entries...`);

  for (const [index, entry] of entries.entries()) {
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
      reporter.info(`Processed ${index + 1}/${entries.length} entries...`);
    }
  }

  reporter.info(`Successfully sourced ${entries.length} entries.`);
};

// exports.sourceNodes = async ({
//   actions,
//   createNodeId,
//   store,
//   cache,
//   reporter,
// }) => {
//   const { createNode } = actions;

//   // Iterate over each entry and create a node
//   for (const entry of entries) {
//     const nodeId = createNodeId(`entries-${entry.id}`);

//     // If your images are remote, you can download them using createRemoteFileNode
//     // Otherwise, skip this part or adjust accordingly
//     let fileNode = null;
//     if (entry.image && entry.image.src) {
//       try {
//         fileNode = await createRemoteFileNode({
//           url: entry.image.src, // The image URL
//           parentNodeId: nodeId, // The id of the parent node
//           createNode,
//           createNodeId,
//           cache,
//           store,
//           reporter,
//         });
//       } catch (error) {
//         reporter.warn(`Failed to download image for entry ${entry.id}: ${error.message}`);
//       }
//     }

//     // Create the entry node
//     createNode({
//       ...entry,
//       id: nodeId,
//       parent: null,
//       children: [],
//       internal: {
//         type: `EntriesJson`, // Custom node type
//         contentDigest: require(`crypto`)
//           .createHash(`md5`)
//           .update(JSON.stringify(entry))
//           .digest(`hex`),
//       },
//     });
//   }
// };


// exports.sourceNodes = async ({
//   actions,
//   createNodeId,
//   store,
//   cache,
//   reporter,
// }) => {
//   const { createNode } = actions;

//   // Iterate over each entry and create a node
//   for (const entry of entries) {
//     const nodeId = createNodeId(`entries-${entry.id}`);

//     // Create the entry node without handling images for now
//     createNode({
//       ...entry,
//       id: nodeId,
//       parent: null,
//       children: [],
//       internal: {
//         type: `EntriesJson`, // Custom node type
//         contentDigest: crypto
//           .createHash(`md5`)
//           .update(JSON.stringify(entry))
//           .digest(`hex`),
//       },
//     });
//   }

//   reporter.info(`Successfully sourced ${entries.length} entries.`);
// };