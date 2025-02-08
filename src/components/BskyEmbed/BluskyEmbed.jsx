import React from 'react';

const BlueskyEmbed = ({ postUrl }) => {
  return (
    <iframe
      src={`https://bskyx.app/embed/post?url=${postUrl}`}
      width="600"
      height="400"
      style={{ border: "none" }}
      allowFullScreen
      title="Bluesky Post Embed"
    ></iframe>
  );
}

export default BlueskyEmbed;