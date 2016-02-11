var express = require('express');
var passport = require('passport');
var Properties = require('../models/Property');
var User  = require('../models/User');
var router = express.Router();

router.get('/',  function(req, res, next) {
  Properties.find(function(error, data){
    if (error)
      res.send(error);
    res.render('properties', { 
      properties: data,
      title: 'express'
    });
  });
});



router.get('/:property_id', function(req, res, next) {

  var reqId = req.params.property_id;
  var relatedProperties;

  Properties.find(function(error, data){
    if (error)
      res.send(err);
    relatedProperties = data;
  });

  Properties.findById(reqId)
    .populate('posted_by')
    .exec(function(error, data){
       res.render('property', { 
         property: data,
         properties: relatedProperties,
         title: 'Express'
       });
    });
  // Properties.findById(reqId, function(error, data){
  //   if (error)
  //     res.send(error);
  //   res.render('property', { 
  //     property: data,
  //     properties: relatedProperties,
  //     title: 'Express'
  //   });
  // });
});


router.post('/:property_id/', function(req, res, next){
  var postId = req.body.property_id;
  var commentBody = req.body.comment_body;
  var userId = req.body.user_id;

  var comment = {
    author: userId,
    body: commentBody
  }

  Properties.findOneAndUpdate({
      "_id": postId
    },
    {
      $push: {
        "comments": comment
      }
    },
    {
      upsert: true
    },
    function(error, data){
      if (error)
        res.send(error);
      res.redirect('/properties/' + postId);
    }
  );
});


module.exports = router;
