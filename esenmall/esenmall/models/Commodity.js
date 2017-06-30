var mongoose=require('mongoose');
var Commodity=mongoose.model("Commodity",{
	title:String,
	brand:String,
	model:String,
	price:String,
	describe:String,
	mainpic:String,
	images:Array,
	id:String
})
module.exports=Commodity;