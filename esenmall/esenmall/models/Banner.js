var mongoose=require('mongoose');
var Banner=mongoose.model("Banner",{
	id:String,
	img:String
})
module.exports=Banner;