<h1 align="center">🐝 mememo</h1>

<h3 align="center">A powerful memo app for hard working bees.</h3>

<p align="center">mememo's core functionality includs notes, notebooks, tags, and favorites.
 With mememo's rich text editing, it is best for note taking and online diary.</p>

<p align="center"><a  href="https://mememo.herokuapp.com/">mememo Live Demo</a></p>

<img width="866" alt="Screen Shot 2022-05-06 at 6 31 31 PM" src="https://user-images.githubusercontent.com/97005157/167232667-8c150ab3-f8b6-42e7-aa5a-ed45a44bdf9c.png">
Splash page
<br><br>

<img
  style="width: 100%; margin: auto; display: block;"
  class="vidyard-player-embed"
  src="https://play.vidyard.com/DNPE6XneUjofbBCjsSbeGt.jpg"
  data-uuid="DNPE6XneUjofbBCjsSbeGt"
  data-v="4"
  data-type="inline"
/>
Click to play demo video.
<br><br>
![Screen Shot 2022-05-07 at 8 30 43 AM](https://user-images.githubusercontent.com/97005157/167261089-28e53377-24f6-44c2-b5b9-d8d56e79408e.png)

Organize your notes with colorful tags.
<br><br>
![Screen Shot 2022-05-07 at 8 49 07 AM](https://user-images.githubusercontent.com/97005157/167261811-e54dcd34-d417-4e23-a26a-06e5d813e5d0.png)
Organize notebooks by drag and drops

## mememo at a Glance

mememo is a full stack application that allows users to write, tag, and manage their notes. Users are require to sign up for an account to use any of the service. Organizing are much easier with mememo's multiple tags system. Favorite is a shortcut that allows user to sort their favorite notes in the desired order.

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

### Application Architecture

mememo is built on React and Redux frontend with Express backennd, using PostgresSQL as a database.

#### Techonologies Used

- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Javascript](https://www.javascript.com/)
- [PostgresSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Express.js](https://expressjs.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Conclusion and Next Steps

The next step for mememo is to broaden the functionality of notes, such as adding images, lists and reminders, even videos.

### Contact

<a href="https://www.linkedin.com/in/frances-huang-660607156"><img src="https://shields.io/badge/LinkedIn-blue?logo=linkedin" /></a> <a href="https://github.com/frances-y-h"><img src="https://shields.io/badge/GitHub-black?logo=github" /></a>
<a href="https://angel.co/u/frances-huang-lau"><img src="https://shields.io/badge/AngelList-gray?logo=angellist" /></a>
