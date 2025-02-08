import React from 'react';
import PropTypes from 'prop-types';
import CATEGORIES from '../../utils/constants/categories';
import './FilterBar.css';

const FilterBar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-dropdown">
      <label htmlFor="category-filter" className='filter-label'>Filter by Category: </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {Object.keys(CATEGORIES).map((key) => (
          <option key={CATEGORIES[key]} value={CATEGORIES[key]}>
            {CATEGORIES[key].replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;