const express = require('express');
var fs = require('fs');

const app = express();
const bodyParser = require('body-parser');
const res = require('express/lib/response');

app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
    fs.readFile("./client/index.html","utf-8",(err,data)=>{
        res.end(data)
    })
})
app.get('/styles.css',(req,res)=>{
    fs.readFile("./client/styles.css","utf-8",(err,data)=>{
        res.end(data)
    })
})
app.get("/script.js",(req,res)=>{
    fs.readFile("./client/script.js","utf-8",(err,data)=>{
        res.end(data)
    })
})
app.post("/save",(req,res)=>{
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        var todo = [];
        if(data.length > 0){
            todo = JSON.parse(data)
        }
        todo.push(req.body)
        fs.writeFile('./db.txt',JSON.stringify(todo),(err)=>{
            if(err)
                res.end("error!!");
            else
                res.end();
        })
    })
})
app.post("/edit",(req,res)=>{
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        var todo = []
        todo = JSON.parse(data)
        console.log(todo)
        todo.forEach((val) => {
            if(val.todo.id == req.body.todo)
            val.todo.check = !val.todo.check
            // console.log('second'+val)
        });
        fs.writeFile('./db.txt',JSON.stringify(todo),(err)=>{
            if(err)
                res.end('error');
            else    
                res.end();
        })
    })

})
app.get('/todo',(req,res)=>{
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        var todo = data.length ? JSON.parse(data) : []
        // console.log(todo);
        res.json(todo);
    })
})

app.listen(3000,()=>{
console.log('Connected to Server!')
})