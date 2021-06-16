const express = require('express');
const mongoose = require('mongoose');
//This is to make it look update

// const user = require('./routes/userRoutes');
const article = require('./routes/articleRoutes');
const { auth } = require('./middleware/auth');

const app = express();
// listen to port 3000
const { PORT = 3000 } = process.env;



//connect to mongodb servwe
mongoose.connect('mongodb://localhost:27017/finaldb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use('/user', auth, user);
app.use('/articles', article);
app.get('/', function (req, res) {
  res.send('Got a GET request')
})


app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
    console.log(`App listening at port ${PORT}`)
}) 
