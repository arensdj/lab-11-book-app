DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  bookshelf VARCHAR(255)
);

INSERT INTO books (author, title, isbn, image_url, description, bookshelf) VALUES('Tom Clancy', 'Hunt for Red October', '12345', 'https://i.imgur.com/J5LVHEL.jpg', 'A story about the Red October', 'One');