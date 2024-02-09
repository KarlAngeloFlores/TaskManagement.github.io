    let inputTodo = document.querySelector(".input-todo");
    const addButton = document.querySelector(".add-btn");

    let div_todo_list = document.getElementById('js_todo_list');
    let div_progress_list = document.querySelector(".js-progress-list");
    let div_completed_list = document.querySelector(".js-completed-list");

    let todoArray = JSON.parse(localStorage.getItem('todo')) || [];
    let progressArray = JSON.parse(localStorage.getItem('progress')) || [];
    let completedArray = JSON.parse(localStorage.getItem('completed')) || [];
    
    //localStorage.setItem('todo', JSON.stringify(todoArray));
    //localStorage.setItem('progress', JSON.stringify(progressArray));
    //localStorage.setItem('completed', JSON.stringify(completedArray));


    let dateInput = document.querySelector(".todo-date");

    let html = '';

    let task_name;
    let due_date;

    function addTodo() {

        if(inputTodo.value !== '' && dateInput !== '') {

            task_name = inputTodo.value;
            due_date = dateInput.value;

            todoArray.push({

                name: task_name,
                date: due_date
            });
        
            localStorage.setItem('todo', JSON.stringify(todoArray));
            localStorage.getItem('todo');

            inputTodo.value = '';
            dateInput.value = '';
        } else {
            alert('Add Task First');
        }

    }

    function renderArray() {

        let todoListHTML = '';

        for(let i = 0; i < todoArray.length; i++) {
            
            let todoObject = todoArray[i];

                html = `
                <div class = "task-div">

                <div class = "task-name" contenteditable="true" oninput="updateTaskName(${i}, this);
                localStorage.setItem('todo', JSON.stringify(todoArray));">${todoObject.name}</div>`;
 
                if(todoObject.date) {
                    html += `<div class = "task-date">${todoObject.date}</div>`
                }
                    
                html += `<button class = "remove-btn" id = "btn_remove" onclick="
                moveToProgress(${i});

                localStorage.setItem('todo', JSON.stringify(todoArray));
                localStorage.setItem('progress', JSON.stringify(progressArray));


                ">Do now
                </button>

                <button class = "delete-button" onclick = "
            
                todoArray.splice(${i}, 1)[0];
                renderArray();

                localStorage.setItem('todo', JSON.stringify(todoArray));

                "><img src = "trash-icon.png" alt = "trash" class = "trash-icon"></button>
                
                </div>`;
                
                todoListHTML += html;
                         
    }

        div_todo_list.innerHTML = todoListHTML;

    }

    


    addButton.addEventListener('click', function() {

        addTodo();
        renderArray();

    });

    function progressTask() {

        let progressListHTML = '';

        for(let x = 0; x < progressArray.length; x++) {

            let progressObject = progressArray[x];
            let progressName = progressObject.name;
            let progressDate = progressObject.date;

            html = `
            <div class = progress-div>
                <div class = "progress-name" contenteditable="true" oninput = "updateProgressName(${x}, this);
                localStorage.setItem('progress', JSON.stringify(progressArray));
                ">${progressName}</div>`

                if(progressDate) {
                    html += `<div class = "progress-date">${progressDate} </div>`
                }              
            
                html += `
                <button class = "completed-button" id = "btn_completed" onclick="
                
                moveToCompleted(${x});
                
                localStorage.setItem('progress', JSON.stringify(progressArray));
                localStorage.setItem('completed', JSON.stringify(completedArray));

                ">Completed
                </button>

                

                <button class = "delete-button" onclick = "
            
                progressArray.splice(${x}, 1)[0];
                progressTask();
                
                localStorage.setItem('progress', JSON.stringify(progressArray));
                localStorage.getItem('progress');

                "><img src = "trash-icon.png" alt = "trash" class = "trash-icon"></button>

                </div>
                `
                       
            progressListHTML += html;

        }
        
    div_progress_list.innerHTML = progressListHTML;
        
    }

    function completedTask() {

        let completedListHTML = '';
    
        for (let y = 0; y < completedArray.length; y++) {
            let completedObject = completedArray[y];
            let completedName = completedObject.name;
            let completedDate = completedObject.date;
    
            let html = `
                <div class="completed-div">
                    <div class="completed-name" contenteditable = "true" oninput = "updateCompletedName(${y}, this);
                    localStorage.setItem('completed', JSON.stringify(completedArray));">${completedName}</div>`;


            if (completedDate) {
                html += `<div class="completed-date">${completedDate}</div>
                
                `;
            }


            html += `<button class = "delete-button" onclick = "
            
            completedArray.splice(${y}, 1)[0];
            completedTask();
            localStorage.setItem('completed', JSON.stringify(completedArray));
            localStorage.getItem('completed');

            "><img src = "trash-icon.png" alt = "trash" class = "trash-icon"></button>
            </div>`;
    
            completedListHTML += html;
        }
    
        div_completed_list.innerHTML = completedListHTML;


    }

    function moveToProgress(index) {
        progressArray.push(todoArray.splice(index, 1)[0]);
        progressTask();
        renderArray();
    }

    function moveToCompleted(index) {
        completedArray.push(progressArray.splice(index, 1)[0]);
        progressTask();
        completedTask();
    }

    function updateTaskName(index, element) {
        
        todoArray[index].name = element.innerText;
    }

    function updateProgressName(index, element) {
        progressArray[index].name = element.innerText;
    }

    function updateCompletedName(index, element) {
        completedArray[index].name = element.innerText;
        
    }

    renderArray();
    progressTask();
    completedTask();