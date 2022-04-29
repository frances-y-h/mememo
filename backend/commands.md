## Generating Models

### Tag

npx sequelize model:generate --name Tag --attributes userId:integer,name:string,color:string

### Notebook

npx sequelize model:generate --name Notebook --attributes name:string,userId:integer

### Note

npx sequelize model:generate --name Note --attributes title:string,content:text,notebookId:integer,trash:boolean

### JoinNoteTags

npx sequelize model:generate --name JoinNoteTag --attributes noteId:integer,tagId:integer

### Favorite

npx sequelize model:generate --name Favorite --attributes userId:integer,num:integer,noteId:integer

## Seeds

npx sequelize seed:generate --name first-notebooks

## commands

npx dotenv sequelize db:drop
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all

# Heroku

git push heroku main:master
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all

### Check logs

heroku logs

### open a connection to the logs to continuously output to your terminal

heroku logs --tail

### open sitem

heroku open
