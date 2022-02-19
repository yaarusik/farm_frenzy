const { text } = require('body-parser');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 5000;
const dataURL = process.env.MONGO_CONNECTION_STRING;

app
.use(express.static(path.join(__dirname, 'dist')))
.set('views', path.join(__dirname, 'dist'))
.set('view engine', 'ejs');

const Schema = mongoose.Schema; 
const userScheme = new Schema({
  name: String,
  password: String,
  levelInfo: [{ num: Number, state: String }],
  mapInfo: [{ categoryName: String, name: String, stage: Number }],
  coin: Number,
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
        password: reqParams.password,
        levelInfo: [],
        mapInfo: [],
        coin: 0,
      });
      user.save();
      res.status(200).send({ message: 'Создан новый пользователь с ником ' + reqParams.name} );
    } else
      res.status(200).send({ message: 'Такой аккаунт уже зарегистрирован'});
    return;

  } else if (reqParams.type == 'signin'){
    if (!userInfo)
      res.status(200).send({ message: 'Такого пользователя не существует'});
    else if (userInfo.password === reqParams.password)
      res.status(200).send({ message: 'Авторизация прошла успешно', levelInfo: userInfo.levelInfo, mapInfo: userInfo.mapInfo});
    else
      res.status(200).send({ message: 'Неверный пароль'});
    return;

  } else if (reqParams.type == 'put'){
    if (!userInfo)
      res.status(200).send({ message: 'Такого пользователя не существует'});
    else if (userInfo.password === reqParams.password){
      userInfo.levelInfo = JSON.parse(reqParams.level);
      userInfo.mapInfo = JSON.parse(reqParams.map);
      await userInfo.save();
      res.status(200).send({ message: 'Успешно доставлено'});
    } else
      res.status(200).send({ message: 'Неверный пароль'});
    return;
  }

  res.status(200).send({ message: 'Что-то пошло не так'});
});