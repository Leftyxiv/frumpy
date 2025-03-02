import React from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { StaticImage } from "gatsby-plugin-image";

import './ShareButtons.css';

const ShareButtons = ({ entry }) => {
  // Make sure we're using window only after component mounts
  const [shareUrl, setShareUrl] = React.useState('');

  React.useEffect(() => {
    // Ensure the ID is being used correctly
    console.log('Entry ID in ShareButtons:', entry.id); // Debug log
    setShareUrl(`${window.location.origin}/post/${entry.id}/`);
  }, [entry.id]);

  if (!shareUrl) return null;

  const handleBskyShare = () => {
    // Bluesky uses a simple URL scheme for sharing
    const bskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(entry.title + '\n' + shareUrl)}`;
    window.open(bskyUrl, '_blank');
  };

  return (
    <div className="share-buttons">
      <TwitterShareButton url={shareUrl} title={entry.title}>
        <span className="share-icon">
          <i className="fab fa-twitter"></i>
        </span>
      </TwitterShareButton>

      <FacebookShareButton url={shareUrl} quote={entry.title}>
        <span className="share-icon">
          <i className="fab fa-facebook"></i>
        </span>
      </FacebookShareButton>

      <button 
        className="share-icon bsky-share"
        onClick={handleBskyShare}
      >
        <StaticImage
          src="./Header/bluesky.svg"
          alt="Share on Bluesky"
          className="bsky-icon"
          width={16}
          height={16}
        />
      </button>

      <button 
        className="copy-link"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          // Optional: Add a toast notification here
        }}
      >
        <i className="fas fa-link"></i>
      </button>
    </div>
  );
};

export default ShareButtons;