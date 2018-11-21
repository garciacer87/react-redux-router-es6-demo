import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <p>Whoops! Sorry, there is nothing to see here.</p>
      <p><Link to="/">Back to Home</Link></p>
    </div>
  );
};

export default NotFoundPage;
