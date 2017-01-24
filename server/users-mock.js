module.exports = function(app, options){
  var express = require('express');
  var router = express.Router();
  var server = options.server;
  var api = options.api;
  var type = options.type;
  var location = server + api + type;
  var id_counter = options.id_counter;
  var mock_data = options.mock_data;
 
  function findIndex(id) {
    var index = 0;
    while (mock_data.data[index] !== undefined && mock_data.data[index].id != id) {
      ++index;
    }
    return index;
  }
 
  router.get('/', function(req, res) {
    var response = {
      "links": {
        "self": location
      }
    };
    response.data = mock_data.data;
    res.status(200).location(location
    ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
  });
 
  router.post('/', function(req, res) {
    ++id_counter;
    var response =  {
      "links": {
        "self": location +"/"+ id_counter
      },
      "data": {
        "type": type,
        "id": id_counter,
        "attributes": {}
      }
    }
    response.data.attributes = req.body.data.attributes;
    if(req.body.data.relationships !== undefined) {
      response.data.relationships = req.body.data.relationships;
    }
    mock_data.data[mock_data.data.length] = response.data;
    res.status(201).location(location +"/"+ id_counter
    ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
  });
 
  router.get('/:id', function(req, res) {
    var index = findIndex(req.params.id);
    if(mock_data.data[index] !== undefined ) {
      var response = {"links": {
        "self": location + "/" + req.params.id
      }};
      response.data = mock_data.data[index];
      res.status(200).location(location + "/" + req.params.id
      ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
    } else {
      var response = {
        "errors" : [{
          "status" : "404",
          "title" : "Not Found",
          "detail" : "Record with requested id was not found."        }]
      }
      res.status(404).location(location + "/" + req.params.id
      ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
    }
  });
 
  router.patch('/:id', function(req, res) {
    var index = findIndex(req.params.id);
    if(mock_data.data[index] !== undefined ) {
      var response = {"links": {
        "self": location + "/" + req.params.id
      }};
      for(var key in req.body.data.attributes) {
        if(req.body.data.attributes.hasOwnProperty(key)) {
          mock_data.data[index].attributes[key] = req.body.data.attributes[key]
        }
      }
      if(req.body.data.relationships !== undefined) {
        for(var key in req.body.data.relationships) {
          if(req.body.data.relationships.hasOwnProperty(key)) {
            mock_data.data[index].relationships[key] = req.body.data.relationships[key]
          }
        }
      }
      response.data = mock_data.data[index];
      res.status(200).location(location + "/" + req.params.id
      ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
    } else {
      var response = {
        "errors": [{
          "status": "404",
          "title": "Not Found",
          "detail": "Record with requested id was not found."
        }]
      }
      res.status(404).location(location + "/" + req.params.id
      ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
    }
  });
 
  router.delete('/:id', function(req, res) {
    var index = findIndex(req.params.id);
    if(mock_data.data[index] !== undefined ) {
      mock_data.data.splice(index, 1);
      res.status(204).end();
    } else {
      var response = {
        "errors" : [{
          "status" : "404",
          "title" : "Not Found",
          "detail" : "Record with requested id was not found."
        }]
      }
      res.status(404).location(location + "/" + req.params.id
      ).contentType("application/vnd.api+json; charset=utf-8").send(response).end();
    }
  });

  router.post('/users', function(req, res) {
    res.status(200);
  });
 
  app.use(api+type, require('body-parser').json({ type: 'application/vnd.api+json' }), router);
 
};