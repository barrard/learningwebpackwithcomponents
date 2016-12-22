
module.exports={

	 postAJAX:function(route, data, callback){
		var xhr = new XMLHttpRequest();
		xhr.open('POST', route);
		// xhr.responseType = 'json';
		xhr.send(data);
		xhr.onreadystatechange = function () {
		  var DONE = 4; // readyState 4 means the request is done.
		  var OK = 200; // status 200 is a successful return.
		  if (xhr.readyState === DONE) {
		    if (xhr.status === OK){
		     	console.log(xhr.responseText); // 'This is the returned text.'
		     	callback(JSON.parse(xhr.responseText))
		    } else {
		      console.log('Error: ' + xhr.status); // An error occurred during the request.
		    }
		  }
		};
	},

	getAJAX:function(route, callback){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', route);
		// xhr.responseType = 'json';
		xhr.send();
		xhr.onreadystatechange = function () {
		  var DONE = 4; // readyState 4 means the request is done.
		  var OK = 200; // status 200 is a successful return.
		  if (xhr.readyState === DONE) {
		    if (xhr.status === OK){
		     	console.log(xhr.responseText); // 'This is the returned text.'
		     	callback(JSON.parse(xhr.responseText))
		    } else {
		      console.log('Error: ' + xhr.status); // An error occurred during the request.
		    }
		  }
		};
	},
	id:function(){
		console.log(module.id);
	}

}