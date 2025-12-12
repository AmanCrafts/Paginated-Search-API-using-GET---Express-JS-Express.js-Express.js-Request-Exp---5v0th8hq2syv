const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Already loaded the database (It's now a direct array)
const allArticles = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

app.get('/search', (req, res) => {

 // TODO: Implement the search and pagination logic here


});


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  module.exports = {app}
