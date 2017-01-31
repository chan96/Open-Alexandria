var tokenGen = require("../utils/tokengen.js");

function User(userID, timeExpire, isAdmin){
	this.userID = userID;
	this.timeExpire = timeExpire;
	this.isAdmin = isAdmin;
}

var userList = {};

//Token will be the key of the map

module.exports = {

	addUserToMap: function(userID, ttl, isAdmin){
		var genToken = tokenGen.token();
		var currentTime = Date.now();
		currentTime += ttl;
		var timeExpire = new Date(currentTime);
		this.addToNewUserList(genToken, userID, timeExpire, isAdmin);
		return genToken;
	},

	addToNewUserList : function(token, userID, timeExpire, isAdmin){
		if(!this.checkToken(token)){
			userList[token] = new User(userID, timeExpire, isAdmin);
		}
		return false
	},

	removeUser : function (token){
		if(this.checkToken(token)){
			var userID = userList[token].userID;
			delete userList[token];
			return userID;
		}
		return false;
	},


	checkToken : function(token){
		if(userList.hasOwnProperty(token)){
			return true;
		}
		return false;
	},

	checkTokenTTL: function(token){
		if(this.checkToken(token)){
			var currentTime = Date.now();
			if(currentTime > userList[token].timeExpire){
				this.removeUser(token);
				return false;
			}
			return true;
		}
		return false;

	},

	checkUserAlive: function(token){
		console.log(token);
		if(this.checkToken(token) && this.checkTokenTTL(token)){
			return true;
		}
		return false;
	},

	checkUserAdmin: function(token){
		if(this.checkUserAlive(token)){
			return userList[token].isAdmin;	
		}		
		return false;
	},

	getUserID: function(token){
		if(this.checkUserAlive(token)){
			var currentUserID = userList[token].userID
				return currentUserID;
		}
		return false;	
	},

	/** Checks and recycles storage space when new user is created.
	 *
	 *
	 */

};
