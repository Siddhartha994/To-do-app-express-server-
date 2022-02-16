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

    // right pane div
    var input = document.createElement('textarea');
    input.setAttribute('placeholder','enter your task');
    input.setAttribute('class','textbox')
    input.setAttribute('id','inputbox');
    rightPaneDiv.appendChild(input);

    input.addEventListener("keyup",ev);
}


function ev(event){
    var keyCode = event.code;
    var input = document.getElementById('inputbox');
    var value = input.value;
    
    if(keyCode == 'Enter' && value !== ""){
        event.preventDefault();
        // container 
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
    span.onclick = function(){
        this.parentElement.parentElement.remove();
    }
    
    box.setAttribute('class','unitbox');
    check.setAttribute('type','checkbox');
    
    taskname.innerHTML = value;
    
    var leftDiv = document.getElementById("leftDiv");
    leftDiv.appendChild(box);
        //push to array & then localStorage
        todo.push(value);
        localStorage.setItem('todo', JSON.stringify(todo));
        input.value = "";

    }
}
init();

// Get from localStorage
let savedTodo = localStorage.getItem('todo');
if(savedTodo !== null){
    todo = JSON.parse(savedTodo);
}

todo.forEach(function(value,index,arr){
    var box = document.createElement('div');
    var taskname = document.createElement('p');
    var check = document.createElement('checkbox');

    //close button 
    var button = document.createElement('button');
    var span = document.createElement('span');
    box.appendChild(taskname);
    box.appendChild(check);
    box.appendChild(button);
    taskname.innerHTML = value;
    //close
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times'; 
    button.appendChild(span);
    
    box.setAttribute('class','unitbox');
    check.setAttribute('type','checkbox');
    span.onclick = function(){
        this.parentElement.parentElement.remove();
        // arr = deleteTask(arr);
        arr.splice(index, 1);
        todo = arr;
        localStorage.setItem('todo', JSON.stringify(todo));
    }
    
    
    
    var leftDiv = document.getElementById("leftDiv");
    leftDiv.appendChild(box);
})
// deleteTask(arr) {
//     arr.filter(function(()))
// }