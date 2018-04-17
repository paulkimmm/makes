var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
    "twitterID": String,
    "token": String,
    "username": String,
    "displayName": String,
    "photo": String
});

//SocketIO Schema
var NewsFeedSchema = new Schema({
	"user": String,
	"message": String,
	"posted": Date
});

var CommentSchema = new Schema({
  // 'userID': { type: Schema.Types.ObjectId, ref: 'User' },
  "text" : String
});

var DrinkSchema = new Schema({
  "name": String,
  "upvotes" : { type: Number, default: 0 },
  "downvotes" : { type: Number, default: 0 },
  "type": String,
  "description": String,
  "comments": [CommentSchema]
});


exports.NewsFeed = mongoose.model('NewsFeed', NewsFeedSchema);
exports.User = mongoose.model('User', UserSchema);
exports.Drink = mongoose.model('Drink', DrinkSchema);
exports.Comment = mongoose.model('Comment', DrinkSchema);
// exports.Vote = mongoose.model('Vote', DrinkSchema);
