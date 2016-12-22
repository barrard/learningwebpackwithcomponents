var MongoClient = require('mongodb').MongoClient;
var helpers = require('./helpers.js')
var url = 'mongodb://localhost:27017/teamBall';



function insertIntoMongo(collection, data){
	data.serverTimeStamp = new Date()
	collection.insert(data, function(err, r){
		handleErrRes(err, function(r){console.log('succes '+r)})
	})

}

function findInMongo(data, cursorArray, col, callback){
	col.find().toArray(function(err, item){
		helpers.handleErrRes(err)
		for(var k in item){
	    	cursorArray.push(item[k])
			// console.log('This is the interation of k in items '+k+' : '+item[k])
		}
		callback(cursorArray)

	})
}



function rando(a){
	var myarray= [];
	for(var x=0;x<a;x++){
		var rand = Math.floor(Math.random() * (a + 1))
		if (myarray.indexOf(rand)===-1) {
			myarray.push(rand);
			console.log(x+1+" : "+rand)
		}else{
			console.log('already got '+rand+' at '+parseInt(myarray.indexOf(rand)+1))
			console.log(myarray.length)
			return
		}	
	}
}

module.exports={
	connectToMongo:function(callback){
		MongoClient.connect(url, function(err, db){
			helpers.handleErrRes(err)
				callback(db)
		})
	},
	writeToMongo:function(collection, data){
		this.connectToMongo(function(db){
			var col = db.collection(collection)
			insertIntoMongo(col, data)
		})

	},
	findInDatabase:function(collection, data, callback){
		var cursorArray=[]
		this.connectToMongo(function(db){
			var col = db.collection(collection)
			findInMongo(data, cursorArray, col, function(item){
				console.log('found in DB '+item.length)
				callback(item)
			})
		})
	},
	userLogin:function(data, callback){
		this.findInDatabase('users', data, function(item){
		if(data.password === item[0].password){
			// console.log('User is verified, set session!!')
			var userObj={'loggedIn':true}
			callback(userObj)
		}else{
			console.log('couldnt verify user')
			var userObj={'loggedIn':false, 'err':'Username and Password do not match'}
			callback(userObj)
		}
		})
	}
}