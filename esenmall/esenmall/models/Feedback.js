var mongoose=require("mongoose")
var Feedback=mongoose.model("Feedback",{
	title:String,
	content:String,
	name:String,
	sex:String,
	company:String,
	address:String,
	tel:String,
	fax:String,
	email:String,
	subtime:String
})
module.exports=Feedback;