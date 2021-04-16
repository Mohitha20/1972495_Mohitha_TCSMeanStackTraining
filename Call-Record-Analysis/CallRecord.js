const fs = require('fs');                      
let Data = fs.readFileSync('call_data.json')
let info = JSON.parse(Data);

let url = "mongodb://localhost:27017/meanstack";
let obj = require("mongoose");  // Load the Modules
obj.Promise = global.Promise;   // Creating the reference        
const mongooseDbOption = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
obj.connect(url, mongooseDbOption) // Ready to connect
let db = obj.connection;    // Connect to Database

db.on("error", (err) => console.log("Error " + err)) 
db.once("open", (err1, res) => {
    let CallRecordSchema = obj.Schema({
        _id:Number, 
        source:String, 
        destination:String, 
        sourceLocation:String, 
        destinationLocation:String, 
        callDuration:String, 
        roaming:String, 
        callCharge:String
    });

    let callData = obj.model("" , CallRecordSchema, "Data")
    callData.insertMany(info, (err, res) => {
        if(!err){
            console.log("Data has successfully sent to database")
        } else {
            console.log("error in storing data to database")
        }
        obj.disconnect();
    });
})