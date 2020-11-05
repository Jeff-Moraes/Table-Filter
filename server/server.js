const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect('mongodb+srv://tablefilter:tablefilter@cluster0.wtjse.mongodb.net/tablefilter?retryWrites=true&w=majority', {
    useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
})
.catch(error => console.error(error))

app.listen(5555, function() {
  console.log('listening on 5555');
});

app.get('/', (req, res) => {
  res.json({ message: "ok"});
});