const express = require('express');

// Cross-Origin Request Blocked
const cors = require('cors');

//.env config
require('dotenv').config();

const mongoose = require('mongoose');

const routers = require('./routers/routers');
const accountsRouters = require('./routers/accounts-routers');
const profileRouters = require('./routers/profile-routers');
const commentsRouters = require('./routers/comments-routers');

const MONGODBCONNECTION = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@cluster0.ypt9rds.mongodb.net/blogs?retryWrites=true&w=majority`;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);
app.use(accountsRouters);
app.use(profileRouters);
app.use(commentsRouters);

mongoose
  .connect(MONGODBCONNECTION)
  .then(() => {
    app.listen(8080);
    console.log('database is connect succesfully');
  })
  .catch(err => console.error(err));
