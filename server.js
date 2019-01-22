'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.urlencoded({extended: true}));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// API Routes
// Renders the search form
app.get('/', newSearch);

// Creates a new search to the Google Boos API
app.post('/searches', createSearch);

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Render index page on page load
function newSearch(request, response) {
  response.render('pages/index');
}

// Helper functions

// Book constructor
function Book(info) {
  const placeHolderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title ? info.title : 'No Title Found';

}

// No API required

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log('body: ', request.body);
  console.log('search', request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }

  console.log('url: ', url);

  const bookSummary = [];

  return superagent.get(url)
    .then(apiResponse => {
      // console.log('ApiResponse: ', apiResponse);
      bookSummary.push(apiResponse.body.items.map(bookResult => {
        const summary = new Book(bookResult.volumeInfo);
        return summary;
      }));

      return bookSummary;
    })
    .then(resultsFromMap => {
      console.log('Results from map: ', resultsFromMap);
      console.log('Book summary: ', bookSummary);
      response.render('pages/searches/show', {bookSummary})
    })
}
