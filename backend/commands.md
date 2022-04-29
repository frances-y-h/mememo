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
