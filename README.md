# lab-11-book-app
Lab 11 Book App

**Author**: Chris & Jasmin
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
Implement a basic full stack application for a book list which will include the ability to search the Google Books API, add books to a database, and then render those books from a PostgreSQL database. The user will have the ability to update the details of a book or remove it from the collection.
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->

## Getting Started
After you clone the repo, you will need to run 'npm i' in your console to install the dependencies. You will also need to create an .env file and add a PORT number.

PORT=3000

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
This application depends on express, superagent, and ejs. It reads incoming query parameters and uses a superagent 'get()' call to return data from an Google Books API, which is then parsed into an object and returned to the client. 
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
01-22-2019 10:00am - 
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->


Number and name of feature: ___#1 Setup_______________________

Estimate of time needed to complete: _30 mins____

Start time: _9:00____

Finish time: _9:45____

Actual time needed to complete: _45 mins____

Number and name of feature: _____#2 Set up forms___________

Estimate of time needed to complete: __30 mins___

Start time: __9:55___

Finish time: __10:05___

Actual time needed to complete: _10 MINUTES____

Number and name of feature: __#3__Browse Results_____________________

Estimate of time needed to complete: _45 minutes____

Start time: _10:05____

Finish time: _11:45____

Actual time needed to complete: __1:40___

Number and name of feature: ___#4 Error Handling____________

Estimate of time needed to complete: _1:00___

Start time: __12:00___

Finish time: __1:00___

Actual time needed to complete: _1:00____

Number and name of feature: _____#5 CSS Styling_____________

Estimate of time needed to complete: __1:30

Start time: __1:00___

Finish time: __1:45___

Actual time needed to complete: _1:45____

Number and name of feature: _____#6 Database setup_____________

Estimate of time needed to complete: _1:00

Start time: __9:00___

Finish time: __10:30___

Actual time needed to complete: _1:30____


Number and name of feature: _____#7 Display Bookshelf_______

Estimate of time needed to complete: _:45

Start time: __10:35___

Finish time: _11:20____

Actual time needed to complete: ___:45__

Number and name of feature: _____#8 Display Book Detail, Post Method 

Estimate of time needed to complete: _2:00

Start time: __11:30___

Finish time: _1:30____

Actual time needed to complete: ___2:00_

Number and name of feature: _____#9 Display Bookshelf, Get Method_______

Estimate of time needed to complete: _1:00

Start time: __10:35___

Finish time: _11:35___

Actual time needed to complete: ___1:00__

Number and name of feature: _____#10 Details View of Single Book

Estimate of time needed to complete: _1:00

Start time: __9:10___

Finish time: _______

Actual time needed to complete: ___1:00__

