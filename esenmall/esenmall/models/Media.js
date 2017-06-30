var mongoose =require("mongoose")
var Media =mongoose.model("Media",{
	newstitle:String,
	newslink:String,
	newspic:String,
	img:String,
	id:String,
	mewstitle2:String,
	newslink2:String
})
module.exports=Media;