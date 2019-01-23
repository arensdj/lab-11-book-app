'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

// Load Enviroment from .env file
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.urlencoded({extended: true}));

// Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// API Routes
// Renders the search form
app.get('/', newBookshelf);

app.get('/forms', newSearch);


// Creates a new search to the Google Boos API
app.post('/searches', createSearch);

// Catch-all
app.get('*', createErrorMiddleWare('Error(404) Page not found.'));

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
  this.isbn = info.industryIdentifiers[0].identifier;
  this.author = info.authors ? info.authors : 'No Author Found';
  this.description = info.description ? info.description : 'No Description provided.';
  this.bookshelf = 'One';
}

// function handleError(request, response){
//   console.error(request);
//   response.render('pages/error', {error: 'Page not found'});
// }

function addBook(request, response) {
  console.log(request.body);
  let {author, title, isbn, image_url, description, bookshelf} = request.body;

  let SQL = `INSERT INTO books(author, title, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6);`;
  
  let values = [author, title, isbn, image_url, description, bookshelf];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => createErrorMiddleWare(err));
}

function newBookshelf(request, response) {
  let SQL = `SELECT * FROM books;`;

  return client.query(SQL)
    .then(results => {
      console.log(results.rows);
      response.render('pages/index', {results: results.rows});
    })
    // .catch(createErrorMiddleWare('No data returned.'));
    .catch(error => {
      let checkError = createErrorMiddleWare(error);
      checkError(request, response);
    });
}


function createErrorMiddleWare(error){
  return function(request, response){
    response.render('pages/error', {error});
  }
}

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
      bookSummary.push(apiResponse.body.items.map(bookResult => {
        const summary = new Book(bookResult.volumeInfo);
        console.log('Book results: ', bookResult);
        return summary;
      }));

      return bookSummary;
    })
    .then(resultsFromMap => {
      console.log('Results from map: ', resultsFromMap);
      console.log('Book summary: ', bookSummary);
      response.render('pages/searches/show', {bookSummary});
    })
    .catch(error => {
      let checkError = createErrorMiddleWare(error);
      checkError(request, response);
    });
}
