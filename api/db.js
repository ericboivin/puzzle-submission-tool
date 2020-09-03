var mongoose   = require('mongoose');

require('dotenv').config({path:'./config/dev_db.env'})

var uri = `${process.env.MLAB_URI}`;

mongoose.connect(uri,(err)=>{
if(err) throw err;
	console.log("DB Connected Successfully");
})
