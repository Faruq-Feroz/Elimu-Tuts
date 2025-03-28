const mongoose=require("mongoose");
const subjectSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    
    
});
module.exports=mongoose.model("Subjects",subjectSchema);