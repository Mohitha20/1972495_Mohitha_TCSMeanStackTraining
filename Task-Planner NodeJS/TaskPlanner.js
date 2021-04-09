let http = require("http")
let url = require("url")
let fs = require("fs")
let port = 9999

let tasks = new Array()
fs.readFile("tp.json",(err,data)=>{
    if(!err){
        
        let tpString = data.toString()
        let tasksJson = JSON.parse(tpString)
        for (let i = 0;i<tasksJson.length;i++){
            tasks.push(tasksJson[i])
        }
    }})
let mainHTML = `
    
    <div>
    
        <h2>Task Planner</h2>
        <h3>Add Task</h3>
        <form action="/storeTask" method="get">
            <label>Employee Id: </label>
            <input type="text" name="empId"/><br>
            <label>Task Id: </label>
            <input type="text" name="taskId"/><br>
            <label>Task: </label>
            <input type="text" name="task"/><br>
            <label>Deadline: </label>
            <input type="text" name="deadline"/><br><br>
            <input type="submit" value="Add Task"/>
        </form>
        <br>

        <form action="/deleteTask" method="get">
            <h3>Delete Task</h3>
            <label>Task Id: </label>
            <input type="text" name="taskId"/>
            <input type="submit" value="Delete Task"/>
        </form>
        <br>
        <br>

        <form action="/displayTask">
            <h3>Tasks</h3>
            <input type="submit" value="Display All Tasks"/>
        </form>
        <br>
    </div>
    `


class Task {
    constructor(empId,taskId,task,deadline){
        this.empId = empId
        this.taskId = taskId
        this.task = task
        this.deadline = deadline
    }
}

let server = http.createServer((req,res)=>{
    console.log(req.url)
    if(req.url != '/favicon.ico') {
        res.setHeader("content-type","text/html")
        res.write(mainHTML)
        var pathInfo = url.parse(req.url,true).pathname

        if(pathInfo == '/storeTask'){
            let data = url.parse(req.url,true).query;
            
            let obj = new Task(data.empId,data.taskId,data.task,data.deadline)
            
            tasks.push(obj)
            
            let jsonData = JSON.stringify(tasks)
            
            fs.writeFileSync("tp.json",jsonData)
            console.log("file written")
            res.end()

        } else if(pathInfo == '/deleteTask'){
            let data = url.parse(req.url,true).query;
            let taskId = data.taskId
            let index = null;
            for (let i = 0;i<tasks.length;i++){
                if(tasks[i].taskId == taskId) {
                    index = i;
                }
            }  
            
            if (index == null) {
                console.log("No such task to delete")
            } else {
                
                console.log("Deleted Task:")
                console.log(tasks.splice(index,1))
                let jsonData = JSON.stringify(tasks)
                fs.writeFileSync("tp.json",jsonData)
                console.log("file updated - task removed")
            }
            res.end()    

        } else if (pathInfo == '/displayTask') {
    
            let tableHtml = `
                <table style="border:solid">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Task Id</th>
                            <th>Tasks</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>
                <tbody>
                `
            fs.readFile("tp.json",(err,data)=>{
                if(!err){
                    
                    let tpString = data.toString()
                    let tasksJson = JSON.parse(tpString) 
                    
                    for (let i = 0;i<tasksJson.length;i++){
                        tableHtml += `
                        <tr>
                            <td>${tasksJson[i].empId}</td>
                            <td>${tasksJson[i].taskId}</td>
                            <td>${tasksJson[i].task}</td>
                            <td>${tasksJson[i].deadline}</td>
                        </tr>
                        `
                    }                                 
                }
                tableHtml += `
                        </tbody>
                    </table>
                    `
                
                res.write(tableHtml)
                res.end()
            })
        }
        else if (pathInfo == '/') {
            res.end()
        } 
    }
    
})

server.listen(port,()=>console.log(`server running on port number ${port}`))