const express=require("express");
const app=express()
const stuClass= require("./modals/class")
const student=require("./modals/student")
const bodyParser=require('body-parser')
app.use(express.urlencoded());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const mongoose=require("mongoose")
const port=5000
mongoose.connect('mongodb://localhost/10xmanagement');

mongoose.connection.once("open",()=>{
    console.log('connection established')
}).on('connectionError',(err)=>{
    console.log(err)
})
app.listen(port, ()=>console.log("app listening to server"))
app.post("/v1/myClass",async(req,res)=>{
    try {
        const data=await stuClass.create(req.body)
        const id=data.id;
        res.status(200).json({
            id
    })
    } catch (err) {
        res.json({
            message:err.message
        })
    }
})

app.post("/v1/myClass/:myClassId/students",async(req,res)=>{
    try {
        const data=await stuClass.find({_id:req.params.myClassId})
        if(data){
            const studentData=await student.create(req.body)
            res.json({
                studentData
            })
        }
        else{
            res.json(
                "not found"
            ) 
        }
        
    } catch (err) {
        res.json({
            message:err.message
        })
    }
})

app.get("/v1/myClass",async(req,res)=>{
    try {
        const classes=await stuClass.find()
        res.json({
            classes
        })
    } catch (e) {
        res.json({
            message:e.message
        })
    }
})

app.get("/v1/myClass/:myClassId",async(req,res)=>{
    try {
        const classes=await stuClass.findOne({_id:req.params.myClassId})
        res.json({
            classes
        })
    } catch (e) {
        res.json({
            error: "There is no class at that id"
        })
    }
})
app.get("/v1/myClass/:myClassId/students",async(req,res)=>{
    try {
        const classes=await student.find({classId:req.params.myClassId})
        res.json({
            classes
        })
    } catch (e) {
        res.json({
            error: "There are no students at this class"
        })
    }
})
app.get("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try {
        const classes=await student.find({classId:req.params.myClassId})
        if(classes) {
            const Student=await student.findOne({_id:req.params.studentId})
            res.json({
                Student
            })
        }
        
    } catch (e) {
        res.json({
            error: "There is no student of that id"
        })
    }
})
app.put("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try {
        const classes=await student.find({classId:req.params.myClassId})
        if(classes) {
            const Student=await student.updateOne({_id:req.params.studentId},req.body)
            res.status(204).json({
            })
        }
        
    } catch (e) {
        res.json({
            error: "There is no student of that id"
        })
    }
})
app.delete("/v1/myClass/:myClassId",async(req,res)=>{
    try {
        const classes=await stuClass.deleteOne({_id:req.params.myClassId})
        res.status(204).json({})
    } catch (e) {
        res.json({
            error: "There is no task at that id"
        })
    }
})

app.delete("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try {
        const classes=await student.find({classId:req.params.myClassId})
        if(classes) {
            const Student=await student.deleteOne({_id:req.params.studentId})
            res.status(204).json({
            })
        }
        
    } catch (e) {
        res.json({
            error: "There is no task at that id"
        })
    }
})