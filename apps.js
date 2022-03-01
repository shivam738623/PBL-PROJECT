const port=8080
const path = require('path');
var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})




var app=express()
app.use('/', express.static(path.join(__dirname)))

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var username=req.body.username
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;
	

	var data = {
		"name": name,
		"username":username,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('logins.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
})
app.get('/login',function(req,res){
	res.set({
		'Access-control-Allow-Origin': '*'
		});
	return res.redirect('logins.html');
	})
	
app.post('/login', async function(req,res){
    var name = req.body.name;
	console.log(name)
	var password = req.body.password;
    const user =await db.collection('details').findOne({ name:name});
	console.log(user)
	if (!user) {
		console.log("FAIL")

	
	return res.redirect('temp.html');
	}
	if (password === user.password){
		return res.redirect('PROJECT1.html');
		// return res.redirect('Register.html');
		// return res.redirect('PROJECT1.html');
		
		
	}
});
console.log("server listening at port 3000");
app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});
