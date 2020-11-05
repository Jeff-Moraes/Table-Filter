const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let productsCollection;

app.listen(5555, function() {
  console.log('listening on 5555');
});

app.get('/', (req, res) => {
  res.json({ message: "ok"});
});

async function setupProductsData() {

  await MongoClient.connect('mongodb+srv://tablefilter:tablefilter@cluster0.wtjse.mongodb.net/tablefilter?retryWrites=true&w=majority', {
    useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('tablefilter');
    productsCollection = db.collection('products')
  })
  .catch(error => console.error(error))

  try {
      productsCollection.deleteMany();

      let dataJson = JSON.parse(fs.readFileSync('./table_data.json', 'utf8'));

      let dataArray = Object.values(dataJson)
      let dataToInsert = [];

      for(let key in dataArray) {
        dataToInsert.push(dataArray[key]);
      }
      
      productsCollection.insertMany(dataToInsert)
      .then(result => {
        //creating index to be able to search with wildcards on all fields
        productsCollection.createIndex({ '$**': 'text' });
        console.log('Data setup successful');
      })
      .catch(error => console.error(error))
  } catch (err) {
    console.error(err)
  }
}

setupProductsData();

//search all products by given string (matches whole string)
app.get('/search', (req, res) => {
  let page = req.query.page === undefined ? 1 : parseInt(req.query.page);
  let limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit);
  let skip = limit * (page - 1);
  let searchText = req.query.search === undefined ? {} : { $text: { $search: req.query.search } };

  let sortById = { id: 1 };
  
  productsCollection.find(searchText).sort(sortById).skip(skip).limit(limit).toArray()
  .then(results => {
      res.json(results);
  })
  .catch(error => console.error(error))
});
