var todo = [];
const container = {
    id: new Date().getUTCMilliseconds(),
    add: addContainer,
    remove: removeContainer,
};
init();

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

    // right pane div
    var input = document.createElement('textarea');
    input.setAttribute('placeholder','enter your task');
    input.setAttribute('class','textbox')
    input.setAttribute('id','inputbox');
    rightPaneDiv.appendChild(input);
    
    // input.addEventListener("keyup",ev);
}

function ev(event){
    var keyCode = event.code;
    
    if(keyCode == 'Enter' && value !== ""){
        event.preventDefault();
        // add value to container 
        container.add;
        addtolocalstorage();
        // Get from localStorage
        let savedTodo = localStorage.getItem('todo');
        if(savedTodo !== null){
            todo = JSON.parse(savedTodo);
        }
        addtolocalstorage();
    }
}
function addContainer(){
    
    var input = document.getElementById('inputbox');
    var value = input.value;
    var leftDiv = document.getElementById('leftDiv');
    console.log(leftDiv);
    var box = document.createElement('div');
    var taskname = document.createElement('p');
    var check = document.createElement('checkbox');
    var button = document.createElement('button');
    var span = document.createElement('span');
    button.appendChild(span);
    box.appendChild(taskname);
    box.appendChild(check);
    box.appendChild(button);
    //close button 
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times'; 
    box.setAttribute('class','unitbox');
    check.setAttribute('type','checkbox');
    span.onclick = function(){
        this.remove;
    }
    taskname.innerHTML = value;   
    leftDiv.appendChild(box);
    value = "";
    
    todo.push(value);
    addtolocalstorage();
}
function removeContainer(){
    todo = todo.filter(function(){
        return this.id != id;
    });
    addtolocalstorage();
}

function addtolocalstorage(){
    localStorage.setItem('todo', JSON.stringify(todo));
}
