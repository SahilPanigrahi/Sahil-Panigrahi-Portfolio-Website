const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');


dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

const dbName = "Personal-File";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });


  app.post('/', async (req, res) => {
    const db = client.db(dbName);
    const password = req.body
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);
    res.json({Sucess: true, result: findResult});
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

