import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className='app-header'>
    <Link to="/" className="header-logo-link">
        <img 
          src="/logo_HRnet.webp" 
          alt="HRnet Logo" 
          width={50} 
          height={50} 
          className="header-logo"
          loading="eager" 
          />
        </Link>
      <h1 className="header-title">HRnet</h1>
    </header>
  );
}
