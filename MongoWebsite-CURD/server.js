//load the required module
let app = require('express')();
let url = require("url");
let obj = require('mongoose')  
obj.Promise = global.Promise    
let uri = 'mongodb://localhost:27017/meanstack'
//to avoid warning
const mongooseDbOptions ={  
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//defining the schema
const CourseDetailsSchema = obj.Schema({
    _id:Number,
    name:String,
    description:String,
    cost:Number
})

class Course {
    constructor(id,name,desc,cost) {
        this._id = id;
        this.name = name;
        this.description = desc;
        this.cost = cost;
    }   
}
app.get("/",(req,res)=>{
    let name = url.parse(req.url,true).query.name;
    console.log(name);
    if(name == "Add-Course"){
        res.sendFile(__dirname+"/add.html")
    }else if(name == "Delete-Course"){
        res.sendFile(__dirname+"/delete.html");
    } else if(name == 'Update-Course'){
        res.sendFile(__dirname+"/update.html")
    } else{
        res.sendFile(__dirname+"/index.html")
    }
})
app.get("/storeCourseDetails",(req,res)=>{
    let data = url.parse(req.url,true).query;
    // retrieving data from body  of HTML
    let course = new Course(data.id,data.name,data.desc,data.cost);
    console.log(course)
    if(course._id != undefined){
        // connecting to database
        obj.connect(uri,mongooseDbOptions)   
        const db = obj.connection;
        var CourseModel = obj.model("",CourseDetailsSchema,'CourseDetails')
        CourseModel.create(course,(err,result)=>{
            if(!err){
                console.log('record successfully inserted '+result)
            } else{
                console.log(err)
            }
            obj.disconnect()
        })
    }
    res.sendFile(__dirname+"/index.html")
})
app.get("/deleteCourseDetails",(req,res)=>{    
        // retrieving data from body of HTML
    let id = url.parse(req.url,true).query.id;
    console.log(id);
    if(id != undefined){
        // connect to database
        obj.connect(uri,mongooseDbOptions)    
        const db = obj.connection;
        var CourseModel = obj.model("",CourseDetailsSchema,'CourseDetails')
        CourseModel.deleteOne({_id:id},(err,result)=> {
            if(!err){
                
                if(result.deletedCount>0){
                    console.log("record successfully deleted")
                } else{
                    console.log("Record is not present")
                }
            } else{
                console.log(err);
            }
            obj.disconnect()
        })
    }
    res.sendFile(__dirname+"/index.html")
})
app.get("/updateCourseDetails/",(req,res)=>{
    let data = url.parse(req.url,true).query;
    // retrieving data from body of HTML
    if(data.id != undefined){
        // connecting to database
        obj.connect(uri,mongooseDbOptions)   
        const db = obj.connection;
        var CourseModel = obj.model("",CourseDetailsSchema,'CourseDetails')
        CourseModel.updateOne({_id:Number(data.id)},{$set:{cost:Number(data.cost)}},(err,result)=>{
            if(!err){
                if(result.nModified>0){
                    console.log("record successfully updated")
                } else{
                    console.log("Record is not present")
                }
            }
            obj.disconnect()
        })
    }
    res.sendFile(__dirname+"/index.html")
})
app.get("/fetch",(req,res)=>{

    obj.connect(uri,mongooseDbOptions)    
    const db = obj.connection;
    var CourseModel = obj.model("",CourseDetailsSchema,'CourseDetails')
    CourseModel.find({},(err,result)=>{
        if(!err){
            res.json(result)
        }
    })
    
})
app.listen(9999,()=>console.log("Running on port 9999..!!"))