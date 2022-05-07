<h1 align="center">mememo</h1>

<h3 align="center">A powerful memo app for hard working bees.</h3>

<p align="center">mememo's core functionality includs notes, notebooks, tags, and favorites. 
 With mememo's rich text editing, it is best for note taking and online diary.</p>


<p align="center"><a  href="https://mememo.herokuapp.com/">mememo Live Demo</a></p>


<img width="866" alt="Screen Shot 2022-05-06 at 6 31 31 PM" src="https://user-images.githubusercontent.com/97005157/167232667-8c150ab3-f8b6-42e7-aa5a-ed45a44bdf9c.png">
Splash page
<br><br>
<!-- Put this wherever you would like your player to appear -->
<img
  style="width: 100%; margin: auto; display: block;"
  class="vidyard-player-embed"
  src="https://play.vidyard.com/DNPE6XneUjofbBCjsSbeGt.jpg"
  data-uuid="DNPE6XneUjofbBCjsSbeGt"
  data-v="4"
  data-type="inline"
/>
Click to play demo video.


## About the project

### Technologies used

* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Javascript](https://www.javascript.com/)
* [PostgresSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/)
* [Express.js](https://expressjs.com/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Contact
<a href="https://www.linkedin.com/in/frances-huang-660607156">Linkedin</a> | <a href="https://github.com/frances-y-h">Github</a>

### Getting started
1. Clone this repository
```
git clone git@github.com:frances-y-h/mememo.git
```
2. Install dependencies
```
npm install
```
3. Create a .env file based on the example with proper settings for your development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your .env file
5. Migrate and seed your database
```
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
6. Run `npm start` in folder "backend", then run `npm start` in folder "frontend"
7. Have fun!


