const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const mongoString = process.env.MONGO_STRING;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Use CORS middleware to allow requests from all origins
app.use(cors());

// Define a Mongoose schema for problems
const problemSchema = new mongoose.Schema({
  name: String,
});

// Create a Mongoose model for problems
const Problem = mongoose.model('Problem', problemSchema);

app.get('/', async (req, res) => {
  try {
    // Retrieve all problems from the database
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    console.error('Error retrieving problems:', error);
    res.status(500).send('Error retrieving problems');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});