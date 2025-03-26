const Course=require("../models/Course");

const getCourse=async(req,res)=>{
    try{
        const courses=await Course.find();
        res.json(courses);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
const getCourseId=async(req,res)=>{
    try{
        const course=await Course.findOne({id:reqparams.id});
        if(!course) return res.status(404).json({message:"Course not found"});
        res.json(course);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
const addCourse=async(req,res)=>{
    try{
        const course=new Course(req.body);
        await course.save();
        res.status(201).json(course);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

const updateCourse=async(req,res)=>{
    try{
        const updateCourse=await Course.findOneAndUpdate(
            {id:req.params.id},
            req.body,
            {new:true}
        );
        if(!updateCourse)return res.status(404).json({message:"Course not found"});
        res.json(updateCourse);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};
const deleteCourse=async(req,res)=>{
    try{
        const deletedCourse=await Course.findOneAndDelete({id:req.params.id});
        if(!deleteCourse) return res.status(404).json({message:"Course not found"});
        res.json({message:"Course deleted successsfully"});
    }catch(err){
        res.status(500).json({error:err.nessage});
    }
};
module.exports={getCourse,getCourseId,addCourse,updateCourse,deleteCourse};