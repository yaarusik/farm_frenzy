const express = require('express')
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app
.use(express.static(__dirname))
.set('views', __dirname)
.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.get('/test', (req, res) => res.send(MONGO_CONNECTION_STRING));

mongoose.connect(MONGO_CONNECTION_STRING);
const connect = mongoose.connection;
connect.on('connected', function() {
  console.log('database is connected successfully');
});
connect.on('disconnected',function(){
  console.log('database is disconnected successfully');
})
connect.on('error', console.error.bind(console, 'connection error:'));
module.exports = connect;