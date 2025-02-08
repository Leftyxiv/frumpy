import React, { useState, useEffect } from 'react';
import './Header.css'; // Make sure to create this CSS file for styling
import FilterBar from '../FilterBar/FilterBar';
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ onCategoryChange, articleCount }) => {
  const [daysLeft, setDaysLeft] = useState(calculateDaysToTargetDate());
  function calculateDaysToTargetDate() {
    const now = new Date();
    const targetDate = new Date('2029-01-20');
    
    const timeDifference = targetDate - now;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  useEffect(() => {
    setDaysLeft(calculateDaysToTargetDate());
  }, [])

  return (
    <header className="timeline-header">
      {/* Top Bar: Navigation Links */}
      <div className="header-top-bar">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            {/* <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li> */}
          </ul>
        </nav>
      </div>

      {/* Middle Section: Image, Text, and Additional Links */}
      <div className="header-middle">
        <div className="header-logo">
          {/* Replace the src with your image path */}
          {/* <StaticImage
            src="./dumpster1.png"
            layout='constrained'
            loading="eager"
            // width={'30%'}
            quality={95}
            formats={["auto", "webp", "avif"]}
            alt=""
            // style={{ marginBottom: `var(--space-3)` }}
            style={{ width: "50%", marginBottom: "var(--space-3)" }}
        /> */}
        </div>
        <div className="header-main-content">
        <h1>
          The Frumpy Presidency is Going <span style={{ color: 'red' }}>Great</span>
        </h1>
          <div className="header-extra-links">
            <p><strong>Days spent golfing:</strong> 7</p>
            <p><strong>pardoned j6 rioters rearrested or killed by police:</strong> 5</p>
            <p id="countdown"><strong>Days left of this insanity:</strong> { daysLeft } </p>
            <p style={{ fontSize: "1em", lineHeight: "1.2", display: 'inline-block' }}>
              <span
                style={{
                  display: "inline-block",
                  height: "1em",
                  verticalAlign: "middle"
                }}
                >
              Check me out on{" "}
                <a
                  href="https://bsky.app/profile/magicmushies.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ whiteSpace: "nowrap" }}
                  >
                  <StaticImage
                    src="./bluesky.svg"
                    layout="constrained" // Constrained layout works well for responsive images.
                    loading="eager"
                    quality={95}
                    formats={["auto", "webp", "avif"]}
                    alt="BlueSky logo"
                    imgStyle={{ objectFit: "contain" }}
                    /* Here you can remove the width/height props to let CSS take over,
                    or adjust them as needed for Gatsby's image processing. */
                    style={{
                      height: "100%",
                      width: "5%",
                    }}
                    /> bluesky
                </a>
              </span>
            </p>
            <p style={{ 'font-size': '10px' }}>Know of an article that's not one of the { articleCount } listed here? email it to me admin@thetrumppresidencyisgoinggreat.com</p>


          </div>
        </div>
      </div>

      <FilterBar onCategoryChange={ onCategoryChange } />
    </header>
  );
};

export default Header;
