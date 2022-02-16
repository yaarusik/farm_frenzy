const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000

app
  .use(express.static(__dirname))
  .set('views', __dirname)
  .set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.get('/test', (req, res) => res.send('Back test'));
