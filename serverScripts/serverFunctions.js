var requires = require('./requires.js')
module.exports = {
	openFileAppend:function(path, callback){
		fs.open(path, 'a', function(err, fd){
			databaseFunctions.handleErrRes(err)
		} )
	},

	readFile:function(filename, callback){
		// Asynchronous read
		fs.readFile(filename, function (err, data) {
		   if (err) {
		      return console.error(err);
		   }
		   callback(data)
		   console.log("Asynchronous read: " + data.toString());
		});

	},

	verifyUserLogedIn:function(res){
		if(!userSession.loggedIn) {
		res.redirect('/')
		}else{
			return true
		}
	},
	makeRandomString:function(exponent){
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+`~!@#$%^&*()_+[]{}|/?.,<>"
		chars = chars.split('')
		var x = 0
		var randomString = []
		for(x;x<exponent;x++){
			var rand = Math.floor(Math.random() * (chars.length));
				rand = chars[rand]
				randomString.push(rand)
		}
		return randomString.join('')
	},
	getIndex:function(req, res){
		// if (req.cookies.sessionID) {
		// 		var readStream = fs.createReadStream(app.get('dirname')+'/views/matchup.html');
		// 	    readStream.pipe(res);
		// }else{
		// databaseFunctions.writeToMongo('userSessions', data)
		var readStream = fs.createReadStream(app.get('dirname')+'/views/index.html');
	    readStream.pipe(res);
	    // console.log('response set cookie header  :  '+res.get('set-cookie'))	
	
		// }
		},
	serveClientState:function(req, res){
		if(req.cookies.sessionID){
			res.send({'loggedIn':true})
		}else{
			res.send({'loggedIn':false})
		}
	},
	logOutUser:function(req, res){
		res.clearCookie('sessionID', { path: '/' });
		req.session.destroy(function(err){
			if(err){
				console.log('err: '+err)
			}else{
				console.log('Session Destroyed!')
			}
		})
		res.redirect('/')
	}
		
}