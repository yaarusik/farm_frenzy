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

app.post('/', async function(req, res) {
  const reqParams = url.parse(req.url, true).query;
  let userInfo = await User.findOne({name: reqParams.name}).exec();

  if (reqParams.type == 'signup'){
    if (!userInfo){
      const user = new User({
        name: reqParams.name,
        password: reqParams.password
      });

      user.save();

      res.status(200).send('new User with name ' + reqParams.name);
    } else {
      res.status(501).send({ error: 'Already has account', userInfo: userInfo});
    }
    return;
  } else if (reqParams.type == 'signin'){

  } else if (reqParams.type == 'put'){

  } else if (reqParams.type == 'get'){

  }

  res.send(userInfo);
});