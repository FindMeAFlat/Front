import React from 'react';

import './index.css';

function Welcome() {
  const welcomeSlogan = 'Find me a flat - make "looking for flat" great again!';
  return (
    <div className="welcome">
      <h1 className="slogan">{welcomeSlogan}</h1>
    </div>
  );
}

export default Welcome;
