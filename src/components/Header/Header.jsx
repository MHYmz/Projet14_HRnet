import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="header-logo">
        <Logo />
      </Link>
      <h1 className="header-title">HRnet</h1>
    </header>
  );
}
