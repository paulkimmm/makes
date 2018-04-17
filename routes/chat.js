var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
  if(!req.user)
  {
    console.log("not logged in");
    res.redirect('/');
  }
  else {
    models.Drink.find(function(err, data) {
      //console.log(data);
    	if (err) console.log(err);
    	else res.render('chat', {data: data});
    });
  }

};

exports.postDrink = function(req, res) {
  console.log(req.body);

  var drink = new models.Drink({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description.replace(/(?:\r\n|\r|\n)/g, '<br />'),
      comments: []
  });

  drink.save(function(err, data) {
    if (err) console.log(err);
    res.redirect('/chat');
  });
};

exports.postVotes = function(req, res) {
  console.log(req.body);

  var drinkName = req.body.drinkName;
  var upvotes = req.body.upvotes;
  var downvotes = req.body.downvotes;

  models.Drink.findOne({'name': drinkName}, function (err, drinkToUpdate) {
    drinkToUpdate.upvotes = upvotes;
    drinkToUpdate.downvotes = downvotes;
    drinkToUpdate.save(function (err) { if(err) console.log(err); });
  });

  /**
    { 'drinkName': gewjakl } do i just
  */

  // var vote = new models.Vote({
  //     'drinkID': req.body.name
  // });
  //
  // vote.save(function(err, data) {
  //   if (err) console.log(err);
  //   res.redirect('/chat');
  // });
};



exports.postComment = function(req, res) {
  //console.log(req.body);

  var Drink = mongoose.model('Drink');
  Drink.findOne({name: req.body.name}, function(err, doc){
    if(!err) {
      doc.comments.push({
        text: req.body.text
      });
      doc.save(function(err) {
        if(err) console.log(err);
        models.Drink.find(function(err, data) {
          console.log("previous page: " + req.body.name);
        	if (err) console.log(err);
        	else res.render('chat', {data: data, previous: req.body.name});
        });
      });
    }
  });
};
