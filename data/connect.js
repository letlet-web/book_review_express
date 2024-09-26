const mongoose = require('mongoose');

async function dbConnect()
{
    mongoose.connect("mongodb://localhost:27017/bookslist");
  console.log("connected");
}

module.exports= dbConnect;