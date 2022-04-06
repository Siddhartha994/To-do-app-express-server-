// init();
const ipbox = document.getElementById('inputbox');
const leftDiv = document.querySelector('#main'); 

//add to array if 'enter'
ipbox.addEventListener('keyup',function(event){
    
    var keyCode = event.code;
    var input = document.getElementById('inputbox');
    var value = input.value;

    if(keyCode == 'Enter' && value !== ''){
        // console.log('hello');
        event.preventDefault();
        // add value to container 
        addtoArray(ipbox.value);
        ipbox.value = '';
    }
});

function renderBoxes(todo){
    leftDiv.innerHTML = '';
        todo.forEach(function(data){
            // console.log("ola"+data.todo)
            var box = document.createElement('div');
            var taskname = document.createElement('p');
            var check = document.createElement('input');
            var button = document.createElement('button');
            var edit = document.createElement('button');

            box.appendChild(taskname);
            box.appendChild(check);
            box.appendChild(button);
            box.appendChild(edit);

            // attributes 
            box.setAttribute('class','unitbox');
            check.setAttribute('type','checkbox');
            check.setAttribute('class','check');
            button.setAttribute('class', 'close');
            edit.setAttribute('class','pencil');
            button.innerHTML = 'X';
            if(data.todo.check){
                taskname.setAttribute('class', 'checked')
                check.setAttribute('checked', 'checked');
            }
            //key for container 
            box.setAttribute('key', data.todo.id);
        taskname.innerHTML = data.todo.name;   
        leftDiv.appendChild(box);
        })
}
//listen for changes in box
leftDiv.addEventListener('click',(event)=>{
    var key = event.target.parentElement.getAttribute('key');
    // console.log('key: ' + event.target.className)
    if(event.target.className == 'check'){
        toggleCheckbox(key);
    }
    if(event.target.className == 'close')
    removeContainer(key);
    if(event.target.className == 'pencil')
        editName(key);
})

function addtoArray(value){
    const container = {
        id: new Date().getUTCMilliseconds(),
        name: value,
        check: false
    };
    addtolocalstorage(container);
}
function removeContainer(key){
    var req = new XMLHttpRequest();
    req.open("put","/edit");
    req.setRequestHeader("Content-type","application/json")
    req.send(JSON.stringify({todo: todo}));
}
function toggleCheckbox(id){
    var req = new XMLHttpRequest();
    req.open("post","/edit");
    req.setRequestHeader("Content-type","application/json")
    req.send(JSON.stringify({todo: id}));
    req.addEventListener("load",()=>{
        getFromLocalStorage();
    })
}
function addtolocalstorage(todo){
    var req = new XMLHttpRequest();
    req.open("post","/save");
    req.setRequestHeader("Content-type","application/json")
    req.send(JSON.stringify({todo: todo}));
    req.addEventListener("load",()=>{
        // console.log("hey"+todo)
    getFromLocalStorage();
    })
}
getFromLocalStorage();
function getFromLocalStorage(){
    var req = new XMLHttpRequest();
    req.open("get","/todo");
    req.send();
    req.addEventListener("load",()=>{
        var todo = JSON.parse(req.responseText);
        // console.log(todo);
        renderBoxes(todo);
    })
}
