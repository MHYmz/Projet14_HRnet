import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loader;
