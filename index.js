// index.js
const server = require('server');
const { get, post, put, del } = server.router;
const { render } = server.reply;

// Load the logic from 'todo.js'
const todo = require('./todo.js');

// Render the homepage for `/`
const home = get('/', ctx => render('index.hbs'));

// Add some API endpoints
const api = [
  get('/todo', todo.read),
  post('/todo', todo.create),
  put('/todo/:id', todo.update),
  del('/todo/:id', todo.delete)
];

// Launch the server with those
module.exports = server(home, api);
