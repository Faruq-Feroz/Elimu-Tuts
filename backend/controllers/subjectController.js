const Subjects=require("../models/subjects");

const getSubject=async(req,res)=>{
    try{
        const subjects=await Subjects.find();
        res.json(subjects);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
const getSubjectId=async(req,res)=>{
    try{
        const subject=await Subjects.findOne(req.params.id);
        if(!subject) return res.status(404).json({message:"Course not found"});
        res.json(subject);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
const addSubject=async(req,res)=>{
    try{
        const subject=new Subjects(req.body);
        await subject.save();
        res.status(201).json(subject);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

const updateSubject=async(req,res)=>{
    try{
        const updateSubject=await Subjects.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updateSubject){
            return res.status(404).json({message:"Subject not found"});
    }
        res.json(updateSubject);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
const deleteSubject=async(req,res)=>{
    try{
        const deletedSubject=await Subjects.findOneAndDelete(req.params.id);
        if(!deletedSubject) return res.status(404).json({message:"Subject not found"});
        res.json({message:"Course deleted successsfully"});
    }catch(err){
        res.status(500).json({error:err.nessage});
    }
};
module.exports={getSubject,getSubjectId,addSubject,updateSubject,deleteSubject};