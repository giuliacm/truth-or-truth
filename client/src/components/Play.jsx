import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';
import NoDataMessage from './NoDataMessage';

const Play = ({ userData = null, gameId = null }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/questions',
      withCredentials: true,
      params: { gameId },
    })
      .then((res) => {
        console.log('in set question');
        console.log(res);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
        setQuestions([]);
      });
  }, []);

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameId ? <NoDataMessage /> : <div>there's data</div>}
    </Fragment>
  );
};

export default Play;
