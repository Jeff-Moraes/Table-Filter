const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5555, function() {
  console.log('listening on 5555');
});

app.get('/', (req, res) => {
  res.json({ message: "ok"});
});