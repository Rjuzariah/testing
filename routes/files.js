
var express = require('express');
var mongo = require('mongodb');
var router = express.Router();

var monk = require('monk');
var db = monk('192.168.1.99:27017/test_db');
// var conn = db.connection;

//mongosee connection
// var mongoose = require('mongoose');
// var db = new mongo.Db('test_db', new mongo.Server("192.168.1.99", 27017));

app = express();


var collection = db.get('files');
var formidable = require("formidable");
var fs = require('fs');
var Grid = require('gridfs-stream');
// var Grid = require('gridfs');

router.get('/files',function(req, res) {
  
	collection.find({}, function(err, files){
		if (err) res.json(500, err);
		else res.json(files);
	});
});

router.post('/files', function(req, res) {
	// var gfs = Grid(db, mongo);
	//1
    // req.pipe(gfs.createWriteStream({
    //     filename: '1.png'
    // }));
    // res.send("Success! Picture Uploaded.");

	//2
	// 	var writestream = gfs.createWriteStream({
	//         filename: 'mongo_file.txt'
	//     });
	// 	writestream.on('close', function (file) {
	// 		callback(null, file);
	// 		});
	// 	fs.createReadStream('/Users/Ishak/Pictures/1.txt').pipe(writestream);

	//3
	// var writestream = gfs.createWriteStream({
    //     filename: "1.txt",
    //     mode:'w',
    //     content_type:'plain/text',
    //     metadata:"",
    // });
    // fs.createReadStream("/Users/Ishak/Pictures/1.txt").pipe(writestream);
    // res.send("Success! Picture Uploaded.");

	//4
	// var source='C:/Users/Ishak/Pictures/1.txt';
	// gfs.fromFile({filename: 'hello.txt'}, source, function (err, file) {
    // console.log('saved %s to GridFS file %s', source, file._id);
    // gfs.readFile({_id: file._id}, function (err, data) {
    //   console.log('read file %s: %s', file._id, data.toString());
    // });

	//5
	var form = new formidable.IncomingForm();
    form.uploadDir = "public/uploads/";
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (!err) {
            // console.log('Files Uploaded: ' + files.file)
            grid.mongo = mongoose.mongo;
            var gfs = Grid(db, mongo);
            var writestream = gfs.createWriteStream({
                filename: '1.txt'
            });
            fs.createReadStream("C:/Users/Ishak/Pictures").pipe(writestream);
        }
    });
    form.on('end', function () {
        res.send('Completed');
    });

//   });




});

// router.post('/files', function(req,res)
// {
//   console.log(req.body);
// //   db.once('open', function () {
//     console.log('open');
//     var gfs = Grid(db, mongo);
//  
//     // streaming to gridfs
//     //filename to store in mongodb
//     var writestream = gfs.createWriteStream({
//         filename: "2.png"
//     });
//     fs.createReadStream("/Users/Ishak/Pictures/1.png")
//     .pipe(writestream)
// 	.on('error', function(error) {
//        console.log(error);
//     }).
//     on('finish', function() {
//       console.log('done!');
//     });
//  
// 	// streaming from gridfs 
// 	// var readstream = gfs.createReadStream({
// 	// filename: '1.png'
// 	// });

// 	// try{
// 	    writestream.on('close', function (file) {
// 	        // do something with `file`
// 	        console.log(file.filename + 'Written To DB');
//     	});



// 		// var options = {filename : '1.png'}; //can be done via _id as well 
		
// 		// gfs.exist(options, function (err, found) {
// 		//   if (err) return handleError(err);
// 		//   found ? console.log('File exists') : console.log('File does not exist');
// 		// });

// 		var files = {
// 			"_id" : "58eee3143c8a7e6600eb4e18",
// 			"name" : "file01.jpg"
// 		};
// 		res.json(files);
// 	// }
// 	// catch(err){
// 	// 	console.log(err);
// 	// }


// //   });

// //   var gfs = Grid(db);
// //  
// //     // streaming to gridfs
// //     //filename to store in mongodb
// //     var writestream = gfs.createWriteStream({
// //         filename: req.body.filename
// //     });
// //     fs.createReadStream(req.body.path).pipe(writestream);
// //  
// //     writestream.on('close', function (file) {
// //         // do something with `file`
// //         console.log(file.filename + 'Written To DB');
// //     });


// //   collection.insert({
// //     binary: req.body,
// //   },function(err, files)
// //   {
// //     if(err) res.json(500,err)
// //     else res.json(files);
// //   })
// });
module.exports = router;
