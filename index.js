const express = require('express');
const mongoose = require('mongoose');
// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

//connect to mongodb servwe
mongoose.connect('mongodb://localhost:27017/finaldb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
    console.log(`App listening at port ${PORT}`)
}) 
