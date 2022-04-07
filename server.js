const express = require('express');
var fs = require('fs');

const path = require('path')
const app = express();

const bodyParser = require('body-parser');
const res = require('express/lib/response');
var UserName
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
    fs.readFile('./client/home.html','utf-8',(err,data)=>{
        if(err)
            res.send(err)
        else
            res.send(data)
    })
})
app.get("/authScript.js",(req,res)=>{
    fs.readFile("./client/authScript.js","utf-8",(err,data)=>{
        res.end(data)
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
app.post('/login',(req,res,next)=>{
    fs.readFile("./user.txt","utf-8",(err,data)=>{
        var flag = true
        var username = req.body.user.uname
        var password = req.body.user.password
        UserName = username
        var users = data.length ? JSON.parse(data): []
        if(users.length)
            users.forEach((user,index,arr)=>{
                if(user.uname == username && user.password == password){
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    // res.json({status: 'Login Successful!', user: data});
                    
                    flag = false
                    res.redirect('/home')
                    next();
                }
            })
        if(flag){
            res.statusCode = 403;
            res.end()
        }
    })
})
app.use(express.static(path.join(__dirname,'client')));


app.get('/home',(req,res)=>{
    fs.readFile('./client/index.html','utf-8',(err,data)=>{
        res.send(data);
    })
})
app.get('/name',(req,res)=>{
    res.send({"name": UserName})
})
app.get('/todo',(req,res)=>{
    var todo = []
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        if(err)
            console.log(err)
        else{
            data = JSON.parse(data)
            // console.log(typeof data)
            data.forEach((val)=>{
                if(val.todo.user == UserName)
                    todo.push(val)
            })
            // console.log(todo);
            res.json(todo);
        }
    })
})
app.post("/save",(req,res)=>{
    fs.readFile("./db.txt","utf-8",(err,data)=>{
        var todo = [];
        if(data.length > 0){
            todo = JSON.parse(data)
        }
        req.body.todo.user = UserName
        // console.log('override'+UserName)
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
        // console.log(todo)
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
        // console.log(todo)
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
app.get("/logout",(req,res)=>{
    res.redirect('/')
})

app.listen(3000,()=>{
console.log('Connected to Server!')
})