var requires = require('./serverScripts/requires.js');

app = express();



userSession={}

var server = http.createServer(app);

var sessionOptions = {
  store: new MongoStore({
    url:'mongodb://localhost:27017/teamBall'
      // db: 'users',
      // host: 'mongodb://localhost',
      // port: 27017
    }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
  	// secure:true
    maxAge:60000
  }
}
app.use(cookieParser('secret'))//before session
app.use(session(sessionOptions))

app.use(express.static('client'));
app.set('dirname', __dirname)

var port = 8080
server.listen( port, function () {
console.log('lisenign on port '+port+' Development')
})


app.get('/', function(req, res){

		var readStream = fs.createReadStream(app.get('dirname')+'/index.html');
	    readStream.pipe(res);
})
app.get('/*', function(req, res){
	res.redirect('/')
})
