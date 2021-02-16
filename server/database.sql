CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username)
);

CREATE TABLE games(
  game_id SERIAL PRIMARY KEY,
  user_id SERIAL,
  name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id) 
);


CREATE TABLE questions(
  question_id SERIAL PRIMARY KEY,
  game_id SERIAL,
  user_id SERIAL,
  description VARCHAR(255),
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)  
);


CREATE TABLE permissions(
  permission_id SERIAL PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES users(user_id), 
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);