const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    image:{type:String,required:true},
    rating:{type:Number,required:true},
    learners:{type:String,required:true},
    duration:{type:String,required:true},
    price:{type:String,required:true}
});
module.exports=mongoose.model("Course",courseSchema);