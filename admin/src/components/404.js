import React from 'react';
import { Link } from 'react-router-dom';

export default function page404() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        className="text-center"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <h4> Page not found</h4>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}
