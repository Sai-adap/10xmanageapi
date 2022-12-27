const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    class:{
        type:String,required:true
    },
    studentsCount:{
        type:Number,required:true,
    }
},{timestamps:true})
const studentModel= new mongoose.model("Student",studentSchema)
module.exports=studentModel