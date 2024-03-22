const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');


dotenv.config();


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

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




// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//     console.log('Connected to MongoDB');
//   }).catch(err => console.error('Error connecting to MongoDB:', err));
  
//   // Define MongoDB schema and model
//   const FormEntry = mongoose.model('FormEntry', {
//     user_name: String,
//     user_email: String,
//     user_project: String
//   });





// Handle form submission
// app.post('/submit-form', async (req, res) => {
//   try {
//     const { user_name, user_email, user_project } = req.body;
//     const newFormEntry = new FormEntry({
//       user_name,
//       user_email,
//       user_project
//     });
//     await newFormEntry.save();
//     res.status(201).send('Form data saved successfully');
//   } catch (error) {
//     console.error('Error saving form data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });







// // Middleware to parse JSON
// app.use(express.json());

// // Serve static files (optional, if you have static files to serve)
// app.use(express.static('public'));