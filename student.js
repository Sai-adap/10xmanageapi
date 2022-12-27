const mongoose=require('mongoose')
const studentClsSchema=new mongoose.Schema({
    name:{type:String,required:true,},
    classId:{type:String,required:true,}
})
const studentClsModel= new mongoose.model("Classes",studentClsSchema)
module.exports=studentClsModel