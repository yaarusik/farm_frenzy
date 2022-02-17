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

      res.status(200).send('Создан новый пользователь с ником ' + reqParams.name);
    } else
      res.status(501).send({ error: 'Такой аккаунт уже зарегистрирован'});
    return;
  } else if (reqParams.type == 'signin'){
    if (!userInfo)
      res.status(501).send({ error: 'Такого пользователя не существует'});
    else if (userInfo.password === reqParams.password)
      res.status(200).send('Авторизация прошла успешно');
    else
      res.status(501).send({ error: 'Неверный логин и/или пароль'});
    return;
  } else if (reqParams.type == 'put'){

  } else if (reqParams.type == 'get'){

  }

  res.send(userInfo);
});