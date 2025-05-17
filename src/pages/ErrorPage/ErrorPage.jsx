import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
import Header from "../../components/Header/Header";

export default function ErrorPage() {
  return (
    <div>
        <Header />
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="go-home-button">
        Go Back to HomePage
      </Link>
    </div>
    </div>
  );
}
