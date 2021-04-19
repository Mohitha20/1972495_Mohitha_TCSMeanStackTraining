let app = require("express")()
let http = require("http").Server(app);
let io = require("socket.io")(http);

let obj = require('mongoose')   
obj.Promise = global.Promise    
let url = 'mongodb://localhost:27017/meanstack'
const mongooseDbOptions ={  
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const ChatLogSchema = obj.Schema({
    name:String,
    message:String
})

var sender;
var message;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on('connection',(socket)=>{
    console.log("Client connected to application.....");
    socket.on('name',(name)=>{
        console.log("Greetings "+name)
        sender = name;
    })
    socket.on('msg',(msg)=>{
        console.log("Your message: "+msg);
        message = msg;
        MsgSave();
    })
})

function MsgSave(){
    console.log(sender)
    console.log(message)
    if(sender!= undefined){
        obj.connect(url,mongooseDbOptions)    
        let db = obj.connection 
        db.on('error',(err)=>console.log(err))
        db.once('open',()=>{
            
            let Chat = obj.model("",ChatLogSchema,'ChatLog')

            
            let c1 = new Chat({name:sender,message:message})
            c1.save((err,result)=>{
                if(!err){
                    console.log('record sent to database successfully '+result)
                } else{
                    console.log(err)
                }
                obj.disconnect()
            })

        })
    }
}

http.listen(9999,()=>console.log('server running on port 9999'))