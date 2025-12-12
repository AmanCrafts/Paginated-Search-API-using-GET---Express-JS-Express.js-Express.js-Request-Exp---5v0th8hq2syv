const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Already loaded the database (It's now a direct array)
const allArticles = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

app.get('/search', (req, res) => {
  // Extract query parameters
  const { name, limit = 5, page = 1 } = req.query;

  // Validate that name parameter exists and is not empty
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: "Search name parameter is required." });
  }

  // Filter articles by title (case-insensitive search)
  const searchTerm = name.toLowerCase();
  const filteredArticles = allArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm)
  );

  // Calculate pagination values
  const totalResults = filteredArticles.length;
  const limitNum = parseInt(limit);
  const pageNum = parseInt(page);
  const totalPages = Math.ceil(totalResults / limitNum);

  // Calculate start and end indices for pagination
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  // Get the paginated results
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Return the response with metadata and results
  res.status(200).json({
    currentPage: pageNum,
    totalPages: totalPages,
    totalResults: totalResults,
    articles: paginatedArticles
  });
});


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  module.exports = {app}
