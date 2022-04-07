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
        if(req.status == 200){
            console.log("signed in"+ req.response)
            alert("Successfully Signed in !")
        }
        else if(req.status == 403){
            alert("User already exists")
        }
        else{
            alert("SignUp failed!")
        }
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
        if(req.status == 200){
            console.log("Welcome" +req.responseText)
            window.location.href = "/home"
        }
        else
            console.log("try logging again")
    })
})