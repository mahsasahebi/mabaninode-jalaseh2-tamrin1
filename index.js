const http=require("http");
const moment=require("moment");
const fs=require("fs");
const path=require("path");
const eventEmitter=require("events");
const { EventEmitter } = require("stream");

const server=http.createServer(async (req,res)=>{
    if(req.url==="/")
    fs.readFile(path.join(__dirname,"index.html"),(err,data)=>{
        if(err)
            console.log(err);
        else
        {
             res.write(data);
             res.end();
        }

        })
    else if(req.url==="/api/current-time"){
        console.log(getCurrentTime());
        res.write(await getCurrentTime());
        res.end();
    }
    else if(req.url==="/api/person"){
        
        res.writeHead(200,{"Content-Type":"application/json"});
        
        const emitter=new EventEmitter();
        emitter.on("personReady",(person)=>{
            res.end(JSON.stringify(person));
                 
        });
        setTimeout(()=>{
            emitter.emit("personReady",{"id":1,"fname":"mahsa","lname":"sahebi","age":32});
        },2000);

        
    }
})
        
        
                

        

async function getCurrentTime(){
    return moment().format('YYYY-MM-DD hh:mm:ss');
}

server.listen(3000,()=>{console.log("server is running on port 3000");});