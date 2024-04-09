document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDateTime = document.getElementById('task-datetime');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${index + 1}. ${task.description} - ${task.datetime}</span>
                <div>
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${index}, this)">
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const description = taskInput.value.trim();
        const datetime = taskDateTime.value.trim();
        if (description === '' || datetime === '') return;
        const task = {
            description,
            datetime,
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        taskInput.value = '';
        taskDateTime.value = '';
    });

    window.editTask = function(index) {
        const newDescription = prompt('Enter new task description:', tasks[index].description);
        if (newDescription !== null) {
            tasks[index].description = newDescription.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    };

    window.deleteTask = function(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    };

    window.toggleTaskCompletion = function(index, checkbox) {
        tasks[index].completed = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    };

    displayTasks();
});
