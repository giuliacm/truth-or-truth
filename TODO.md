THURSDAY

- move/fix Create New Game button
- fix icons on smaller screen
- fix infinite rendering but also create new item not showing up in list (https://dmitripavlutin.com/react-useeffect-infinite-loop/#:~:text=()%20is%20used%3A-,useEffect(()%20%3D%3E%20setCount(count%20%2B%201),state%20update%20triggers%20re%2Drendering.)
- game name click to questions page

FRIDAY

- make games list larger
- no games message if no games to list, no questions message if no questions to list
- find another way to redirect with props. For MenuBar and games list

- add routes and pages
  - fix async return for routing for public
  - fix register as public component
  - only give userId and username to games
- register
  - make sure api works + new user exists
- games
  - rename page to HOME, rename in links and menu bar dropdown
  - APIs for deleting game and all referenced questions, permissions
- questions
  - test APIs
- permissions
  - create permissions database
  - APIs for adding user to a game
  - modify APIs to delete all permissions when game gets deleted
- clean up env variables
- deploy
