/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  usersRouter.get('/', function(req, res) {
    res.send({
      'users': [
      {
        "id": 1,
        "name": "Jiangti"
      }]
    });
  });

  usersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  usersRouter.get('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/users', require('body-parser').json());
  app.use('/api/users', usersRouter);
};


// module.exports = function(app) {
//   require('../users-mock')(app, {
//     server: "http://localhost:4200",
//     api: "/api/",
//     type: "users",
//     id_counter: 1,
//     mock_data: {
//       "data": [{
//         "type": "users",
//         "id": "3",
//         "attributes": {
//           "title": "Dr",
//           "name": "Aphid Fig",
//           "gender": "F",
//           "active": false,
//         }
//       }]
//     }
//   });
// };