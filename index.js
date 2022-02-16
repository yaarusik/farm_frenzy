const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000

app
  .use(express.static(__dirname))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/test', (req, res) => res.send('Back test'));
