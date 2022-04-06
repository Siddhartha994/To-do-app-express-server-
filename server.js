const express = require('express');
var fs = require('fs');

const path = require('path')
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'client')));

app.get('/home',(req,res,next)=>{
    fs.readFile('./client/home.html',"utf-8",(err,data)=>{
        res.send(data)
    })
})
app.post('/signup',(req,res,next)=>{
    var flag = true
    fs.readFile("./user.txt","utf-8",(err,data)=>{
        var username = req.body.user.uname
        var todo = data.length ? JSON.parse(data): []
        if(todo.length)
            todo.forEach((user,index,arr)=>{
                if(user.uname == username)
                    {
                        flag = false
                        res.statusCode = 403;
                        res.end();
                    }
            })
        
        if(flag){
            todo.push(req.body.user)
            fs.writeFile('./user.txt',JSON.stringify(todo),(err)=>{
            if(err)
                res.send("error!!");
            else{
                res.statusCode = 200;
	            res.setHeader('Content-Type', 'application/json');
	            res.json({status: 'Registration Successful!', user: req.body.user.uname});
            }
            })
        }

    })
})

app.use('/user',(req,res,next)=>{

})
app.get('/todo',(req,res)=>{
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        var todo = data.length ? JSON.parse(data) : []
        // console.log(todo);
        res.json(todo);
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
app.post("/remove",(req,res)=>{
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        var todo = []
        todo = JSON.parse(data)
        console.log(todo)
        todo.forEach((val,index) => {
            if(val.todo.id == req.body.todo)
                todo.splice(index,1)
        });
        fs.writeFile('./db.txt',JSON.stringify(todo),(err)=>{
            if(err)
                res.end('error');
            else    
                res.end();
        })
    })

})

app.listen(3000,()=>{
console.log('Connected to Server!')
})