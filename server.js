var express = require('express');
var app = express();
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

// Middleware
var jwtCheck = jwt({
  secret: rsaValidation(),
  algorithms: ['RS256'],
  issuer: "https://dev-nur3x3bv.us.auth0.com",
  audience: 'longmire.com'
});

var guard = function(req, res, next){
  switch(req.path){
    case '/' : {
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }

    case '/fanfiction' : {
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }

    case '/author': {
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }

    case '/category': {
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }

    case '/pending': {
      var permissions = ['admin'];
      console.log(req.user.scope);
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
  }
}

app.use(jwtCheck); 
app.use(guard);

// Error Handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({message: "Missing or invalid token."});
  }
});

// Root
app.get('/', function(req, res) {
  res.send('Hello from Root! Endpoints include /fanfiction, /author, /category')
})

// fanfiction API endpoint
app.get('/fanfiction', (req, res) => {
  // list of fanfiction, authors and category
  var fanfictions = [
    {title: 'Longmire Fanfiction 1', author: 'Tiffany Lynn', category: 'Longmire', link: 'http://www.google.com'},
    {title: 'Longmire Fanfiction 2', author: 'Tiffany Lynn', category: 'Longmire', link: 'http://www.google.com'},
    {title: 'Longmire Fanfiction 3', author: 'Douglas', category: 'Longmire', link: 'http://www.google.com'},
    {title: 'Yellowstone Fanfiction 1', author: 'Tiffany Lynn', category: 'Yellowstone', link: 'http://www.google.com'},
    {title: 'Yellowstone Fanfiction 2', author: 'Douglas', category: 'Yellowstone', link: 'http://www.google.com'},
  ]
  
  // Send Response as a JSON array
  res.json(fanfictions);
})

// Authors API endpoint
app.get('/author', (req, res) => {
  // list of authors
  var authors = [
    {name: 'Tiffany Lynn', bio: "This is the author's bio.", avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cassidy_Freeman_Oct_2014_%28cropped%29.jpg'},
    {name: 'Douglas', bio: "This is the author's bio.", avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lou_Diamond_Phillips_at_the_Chiller_Theatre_Expo_2017.jpg/220px-Lou_Diamond_Phillips_at_the_Chiller_Theatre_Expo_2017.jpg'}
  ]

  // Send Response as a JSON array
  res.json(authors);
})

// Categories API endpoint
app.get('/category', (req, res) => {
  // list of categories
  var categories = [
    {category: 'Longmire', avatar: 'https://upload.wikimedia.org/wikipedia/en/8/82/Longmire_intertitle.png'},
    {category: 'Yellowstone', avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b8/YellowstoneTitleScreen.png'}
  ]

  // Send Response as a JSON array
  res.json(categories);
})

// Pending Fanfiction API endpoint
app.get('/pending', (req, res) => {
  // list of pending fanfiction
  var pending = [
    {title: 'Longmire Fanfiction 4', author: 'Tiffany Lynn', category: 'Longmire', link: 'http://www.google.com'},
    {title: 'Longmire Fanfiction 5', author: 'Douglas', category: 'Longmire', link: 'http://www.google.com'}
  ]

  // Send Response as a JSON array
  res.json(pending);
})

// Launch API
app.listen(8080, () => {
  console.log("The server is live!")
});