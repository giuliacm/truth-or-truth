import React, { Fragment } from 'react';
import MenuBar from './MenuBar';
import NoDataMessage from './NoDataMessage';
import { get } from 'lodash';

const Play = ({ userData = null, location = {} }) => {
  const questions = get(location, 'state.questions', []);
  const gameName = get(location, 'state.gameName', '');

  console.log(gameName);
  console.log(questions);
  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameName ? <NoDataMessage /> : <div>there's data</div>}
    </Fragment>
  );
};

export default Play;
