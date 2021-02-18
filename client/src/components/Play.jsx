import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';

const Play = ({ userData, gameId }) => {
  // const classes = useStyles();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/questions',
      withCredentials: true,
      params: { gameId },
    })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        setQuestions([]);
      });
  }, []);

  const noData = (
    <div>
      Oops! Looks like you have no data! Return to the Games menu to create a
      game.
    </div>
  );

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameId && noData}
    </Fragment>
  );
};

export default Play;
