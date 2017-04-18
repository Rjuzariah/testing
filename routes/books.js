
var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('192.168.1.99:27017/test_db')
var collection = db.get('books');
router.get('/books',function(req, res) {
  
	collection.find({}, function(err, books){
		if (err) res.json(500, err);
		else res.json(books);
	});
});

router.post('/books', function(req,res)
{
  collection.insert({
    name: req.body.name,
    decs : req.body.decs
  },function(err, books)
  {
    if(err) res.json(500,err)
    else res.json(books);
  })
})
module.exports = router;

// var Books = require('../models/books');
// var express = require('express');
// var router = express.Router();


// router.route('/books').get(function(req, res) {
//   Books.find(function(err, books) {
//     if (err) {
//       return res.send(err);
//     }

//     res.json(books);
//   });
// });

// module.exports = router;