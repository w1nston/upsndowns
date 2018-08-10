import React from 'react';
import { css } from 'emotion';
import { Router } from '@reach/router';
import GameFormContainer from '../player';
import GameboardContainer from '../gameboard';

const containerStyle = css`
  padding: 0 .6rem;

  @media (min-width: 992px) {
    margin: 0 auto;
    width: 33.5rem;
  }
`;

const titleStyle = css`
  @media (min-width: 992px) {
    margin: 3.5rem 0;
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
