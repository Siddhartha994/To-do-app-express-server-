init();
const ipbox = document.getElementById('inputbox');
const leftDiv = document.querySelector('#main'); 
// console.log(leftDiv);
var todo = [];
function init(){
    var leftPaneDiv = document.createElement('div');
    var rightPaneDiv = document.createElement('div');
    
    // Partition with divs
    
    leftPaneDiv.setAttribute('id','leftDiv');   
    rightPaneDiv.setAttribute('id','rightDiv');  
    
    document.body.appendChild(leftPaneDiv);
    document.body.appendChild(rightPaneDiv);
    
    //left pane div
    var heading = document.createElement('h1');
    heading.innerHTML = 'Task List';
    leftPaneDiv.appendChild(heading);
    var subHeading = document.createElement('h3');
    subHeading.innerHTML = 'tasks';
    leftPaneDiv.appendChild(subHeading);
    var todocont = document.createElement('div');
    todocont.setAttribute('id','main');
    leftPaneDiv.appendChild(todocont);

    // right pane div
    var input = document.createElement('textarea');
    input.setAttribute('placeholder','enter your task');
    input.setAttribute('class','textbox')
    input.setAttribute('id','inputbox');
    rightPaneDiv.appendChild(input);
    
}
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
//listen for changes in box
leftDiv.addEventListener('click',(event)=>{
    var key = event.target.parentElement.getAttribute('key');
    console.log('key: ' + event.target.className)
    if(event.target.className == 'check'){
        toggleCheckbox(key);
    }
    if(event.target.className == 'close')
        removeContainer(key);
    if(event.target.className == 'pencil')
        editName(key);
})
function editName(key){
    var text;
    var person = prompt("Edit to-do", "");
    if (person == null || person == "")
        text = "";
    else 
        text = person;
    todo.forEach(data=>{
        if(data.id == key){
            if(text !== "")
            data.name = text;
        }
    })
    addtolocalstorage(todo);
}
function addtoArray(value){
    const container = {
        id: new Date().getUTCMilliseconds(),
        name: value,
        check: false
    };
    todo.push(container);
    addtolocalstorage(todo);
    
}
function renderBoxes(todo){
    leftDiv.innerHTML = '';
    todo.forEach(function(data){
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
        if(data.check){
            taskname.setAttribute('class', 'checked')
            check.setAttribute('checked', 'checked');
        }
        //key for container 
        box.setAttribute('key', data.id);
    taskname.innerHTML = data.name;   
    leftDiv.appendChild(box);
    })
    
}
function removeContainer(key){
    todo = todo.filter(t=>{
        return t.id != key;
    });
    console.log(todo);
    addtolocalstorage(todo);
}
function toggleCheckbox(id){
    todo.forEach(function(data){
        if(data.id == id)
            data.check = !data.check;
    });
    addtolocalstorage(todo);
}
function addtolocalstorage(todo){
    localStorage.setItem('todo', JSON.stringify(todo));
    renderBoxes(todo);
}
getFromLocalStorage();
function getFromLocalStorage(){
    // Get from localStorage
    let savedTodo = localStorage.getItem('todo');
    if(savedTodo)
    {
        todo = JSON.parse(savedTodo);
        renderBoxes(todo);
    }
}
