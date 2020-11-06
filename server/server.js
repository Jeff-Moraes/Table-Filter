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

function getIntWithDefault(value, defaultValue) {
  let intValue = parseInt(value);
  return !isNaN(intValue) ? intValue : defaultValue;
}
//search all products by given string (matches whole string)
app.get('/search', async (req, res) => {
  let page = Math.max(getIntWithDefault(req.query.page, 1), 1);
  let limit = Math.max(getIntWithDefault(req.query.limit, 10), 1);
  let skip = limit * (page - 1);

  let searchProducts = req.query.searchProducts ? { $text: { $search: req.query.searchProducts } } : {}; 
  let selectedColor = req.query.selectedColor ? { color: req.query.selectedColor } : {}; 

  let searchText = { $and: [ searchProducts, selectedColor ] };
  let sortById = { id: 1 };

  try {
    let countAllSearchProducts = await productsCollection.countDocuments(searchText)
    let numberOfPages = Math.ceil(countAllSearchProducts / limit);
  
    let dataResult = await productsCollection.find(searchText).sort(sortById).skip(skip).limit(limit).toArray();
    
    res.json({dataResult, numberOfPages});
  } catch (error) {
    console.error(error)
  }
});

//search all products by given string (matches whole string)
app.get('/colors', (req, res) => {
  productsCollection.find({}).toArray()
    .then(results => {
      const colorOptionsFromTableData = [...new Set(results.map(product => product.color))].filter(color => color);
      res.json(colorOptionsFromTableData);
    })
    .catch(error => console.error(error))
});