const fname = document.getElementById("firstname")
const lname = document.getElementById("lastname")
const uname = document.getElementById("username")
const loginname = document.getElementById("lusername")
const loginpassword = document.getElementById("lpassword")
const login = document.getElementById('login')
const signup = document.getElementById('signup')

signup.addEventListener('click',()=>{
    const user = {
        'fname': fname.value,
        'lname': lname.value,
        'uname': uname.value,
        'password': password.value
    }
    var req = new XMLHttpRequest();
    req.open("post","/signup");
    req.setRequestHeader("Content-type","application/json")
    req.send(JSON.stringify({user: user}));
    req.addEventListener("load",()=>{
        if(req.status == 200)
        console.log("signed in"+ req.response)
    })
})
login.addEventListener('click',()=>{
    const user = {
        'uname': loginname.value,
        'password': loginpassword.value
    }
    var req = new XMLHttpRequest();
    req.open("post","/login");
    req.setRequestHeader("Content-type","application/json")
    req.send(JSON.stringify({user: user}));
    req.addEventListener("load",()=>{
        if(req.status == 200)
            console.log("Welcome "+req.response.user)
    })
})