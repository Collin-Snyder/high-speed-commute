# HIGH SPEED COMMUTE

High Speed Commute is an action-packed race to work against your boss. Get there first so she doesn't know you're late!

<img src="./high-speed-commute/src/assets/screenshots/wholegame.png" alt="Whole Game" title="Whole Game" width="700px">

<!-- ## In Action

<a href=#>Heroku Deployment Link</a> -->

## The Game

Uh oh! You woke up late again (you _knew_ you shouldn't have hit snooze that last time). Fortunately for you, your boss comes in to work later than you - but boy will she be mad if she arrives and you aren't there yet.

You grab a breakfast bar, brush your teeth while throwing on the last clean thing in your closet, and hurry out the door - the race to work begins! Now you've got to navigate your neighborhood's maze of streets to get there first.

Your car:

<img src="./high-speed-commute/src/assets/screenshots/playercar.png" alt="Player Car" title="Player Car" width="100px">

Your boss's car:

<img src="./high-speed-commute/src/assets/screenshots/bosscar.png" alt="Boss Car" title="Boss Car" width="100px">

The office:

<img src="./high-speed-commute/src/assets/screenshots/office.png" alt="Office" title="Office" width="100px">


### A couple of pointers:

- Watch out for changing stoplights - you can't run a red light in this town.

  <img src="./high-speed-commute/src/assets/screenshots/greenlight.png" alt="Green light" title="Green light" width="100px">     <img src="./high-speed-commute/src/assets/screenshots/yellowlight.png" alt="Yellow light" title="Yellow light" width="100px">     <img src="./high-speed-commute/src/assets/screenshots/redlight.png" alt="Red light" title="Red light" width="100px">

- Avoid school zones - you have no choice but to proceed through them slowly for safety.

  <img src="./high-speed-commute/src/assets/screenshots/schoolzone.png" alt="School Zone" title="School Zone" width="250px">

- If you can, grab some coffee on the way! The caffeine boost will turbocharge your driving.

  <img src="./high-speed-commute/src/assets/screenshots/coffee.png" alt="coffee" title="coffee" width="100px">


## The App

### Gameplay

Select from Easy, Medium, and Hard mode.

 <img src="./high-speed-commute/src/assets/gifs/gif-1.gif" alt="Gif 1" title="Gif 1" width="700px">

Start the race! The boss's speed depends on the difficulty mode.


<img src="./high-speed-commute/src/assets/gifs/gif-2.gif" alt="Gif 2" title="Gif 2" width="700px">
<br>
<img src="./high-speed-commute/src/assets/gifs/gif-3.gif" alt="Gif 3" title="Gif 3" width="700px">

Game outcomes: win or loss.

<img src="./high-speed-commute/src/assets/gifs/gif-4_3.gif" alt="Gif 4" title="Gif 4" width="700px">


[gif 5 - loss]

Pro tip - don't hit your boss.

[gif 6 - collision]

### Obstacles

Stoplights cycle on individual timers. You can run a yellow light, but you'll have to wait if you get caught at a red.

[gif 7 - stoplight demo]

Schoolzones slow down both you and your boss - safety first!

[gif 8 - schoolzone demo]

Grab a coffee if you have time - caffeination increases your speed for a short time!

[gif 9 - coffee demo]

### Design Mode

## Stack

<table>
  <tr>
  </tr>
  <tr>
    <td align="center">Front-end</td>
    <td align="center">Back-end</td>
  </tr>
  <tr>
    <!-- <td align="center"><img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="React" title="React" width="80px"/></td> -->
    <td align="center"><img src="./high-speed-commute/src/assets/logo-react.png" alt="React" title="React" width="80px"/></td>
    <td align="center"><img src="./high-speed-commute/src/assets/logo-node-express.png" alt="Node.js" title="Node.js" width="80px"/></td>
  </tr>
  <tr>
    <!-- <td align="center"><img src="https://freshpet.com/wp-content/uploads/2018/01/puppy_party_freshpet.jpg" alt="Puppy" title="Puppy" width="80px"/></td> -->
    <td align="center"></td>
    <td align="center"><img src="./high-speed-commute/src/assets/logo-postgres.png" alt="PostgreSQL" title="PostgreSQL" width="80px"/></td>
  </tr>
</table>

### Front-End
High Speed Commute was built with Javascript and vanilla React (create-react-app) on the front end. For this application I wanted to keep the technology simple to focus on the logic and data structure of the game.

Custom retro button styling and behavior was created using CSS while icons and pixel artwork was created in Adobe Illustrator.

### Back-End 
High Speed Commute uses Node.js and Express to create a server that interacts with a PostgreSQL database and provides all user, game, and level information to the React app.

### Deployment
[Coming eventually]

<!-- # Get started

How to run the app on localhost:

  - In first terminal window: 
    - git clone https://github.com/Collin-Snyder/high-speed-commute.git
    - cd
  -  -->


### Challenges
- In building High Speed Commute, I wanted to learn more about pathfinding algorithms used to move non-player characters, since the Boss character has to both find a working path to a given target and also navigate a maze in the process. Initially I attempted to implement

### Learnings
- ...

### Contributors

[Collin Snyder](https://github.com/Collin-Snyder)