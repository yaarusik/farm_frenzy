const { text } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 5000;
const dataURL = process.env.MONGO_CONNECTION_STRING;

app
.use(express.static(__dirname))
.set('views', __dirname)
.set('view engine', 'ejs');

const Schema = mongoose.Schema; 
const userScheme = new Schema({
    name: String,
    password: String
});
const User = mongoose.model("User", userScheme);

mongoose.connect(dataURL);
const connect = mongoose.connection;
module.exports = connect;

app.get('/', (req, res) => res.render('index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.post('/', (req, res) => {
  const reqParams = url.parse(req.url, true).query;
  let userInfo = '';
  try {
    userInfo = connect.db.collection('users').find({name: reqParams.name});
  } catch (err) {
    userInfo = '';
    console.log(err);
    console.log(connect.db.collection('users'));
  }

  if (reqParams.type == 'signup'){
    if (userInfo == ''){
      const user = new User({
        name: reqParams.name,
        password: reqParams.password
      });

      user.save();
    } else {
      res.status(501).send({ error: 'Already has account' });
    }
  } else if (reqParams.type == 'signin'){

  } else if (reqParams.type == 'put'){

  } else if (reqParams.type == 'get'){

  }

  res.send(userInfo);
});