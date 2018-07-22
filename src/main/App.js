import React from 'react';
import { css } from 'emotion';
import SelectPlayers from '../player/SelectPlayers';
import Gameboard from '../gameboard/Gameboard';

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
    <SelectPlayers />
    <Gameboard rows={10} columns={10} />
  </section>
);

export default App;
