import React from 'react';
import { css } from 'emotion';
import { Router } from '@reach/router';
import GameFormContainer from '../player';
import GameboardContainer from '../gameboard';

const containerStyle = css`
  @media (min-width: 992px) {
    margin: 0 auto;
    width: 41.875rem;
  }
`;

const titleStyle = css`
  font-size: 2rem;
  margin: 4.375rem 1rem;

  @media (min-width: 992px) {
    margin: 4.375rem 0;
  }
`;

const App = () => (
  <section className={containerStyle}>
    <h1 className={titleStyle}>Snakes and ladders...</h1>
    <Router>
      <GameFormContainer path="/" />
      <GameboardContainer path="/game" />
    </Router>
  </section>
);

export default App;
