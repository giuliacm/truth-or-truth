import React, { Fragment, useContext } from 'react';
import MenuBar from './MenuBar';

const Games = () => {
  console.log('rendering games');
  return (
    <Fragment>
      <MenuBar username={'Giulia'} />
      games
    </Fragment>
  );
};

export default Games;
