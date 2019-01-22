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
app.get('*', showError);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Render index page on page load
function newSearch(request, response) {
  response.render('pages/index');
}

// Helper functions

// Book constructor
function Book(info) {
  const placeHolderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.image = info.imageLinks.thumbnail ? info.imageLinks.thumbnail : placeHolderImage;
  this.title = info.title ? info.title : 'No Title Found';
  this.author = info.authors ? info.authors : 'No Author Found';
  this.description = info.description ? info.description : 'No Description provided.';

}

function showError(request, response){
  response.render('pages/error');
}
// function handleError(err, res){
//   //if (res) res.status(500).send('Sorry, something went wrong');
//   //res.render('pages/error');
// }

// No API required

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log('body: ', request.body);
  console.log('search', request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }


  console.log('url: ', url);

  const bookSummary = [];

  return superagent.get(url)
    .then(apiResponse => {
      //if(!apiResponse.body.items.length){
     //   throw 'Book or Author not found.';
     // }
     // else{
      bookSummary.push(apiResponse.body.items.map(bookResult => {
        const summary = new Book(bookResult.volumeInfo);
        console.log('Book results: ', bookResult);
        return summary;
      }));

      return bookSummary;
    })
    .then(resultsFromMap => {
     // if(!resultsFromMap){
     //   throw 'Book or Author not found.';
     // }
     // else{
        console.log('Results from map: ', resultsFromMap);
        console.log('Book summary: ', bookSummary);
        response.render('pages/searches/show', {bookSummary});
     // }
      
    })
    //.catch(error => handleError(error))
}
