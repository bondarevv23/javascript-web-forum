var taskList = [];
var maxTasks = 0;

function addTask(event) {
    event.preventDefault();

    var newTaskInput = document.getElementById('new-task');
    var newTask = newTaskInput.value.trim();

    if (newTask === '') {
        return;
    }

    if (taskList.length >= maxTasks) {
        alert('Достигнуто максимальное количество задач на сегодня!');
        return;
    }

    taskList.push(newTask);
    newTaskInput.value = '';

    renderTaskTable();
}

function deleteTask(index) {
    taskList.splice(index, 1);
    renderTaskTable();
}

function renderTaskTable() {
    var taskTable = document.getElementById('task-table');
    taskTable.innerHTML = '';

    for (var i = 0; i < taskList.length; i++) {
        var taskRow = document.createElement('div');
        taskRow.classList.add("main__table-container-table-row")
        var taskWrap = document.createElement('div')
        var taskCell = document.createElement('div');
        taskCell.textContent = taskList[i];
        taskWrap.appendChild(taskCell);
        taskRow.appendChild(taskWrap);

        var actionCell = document.createElement('div');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        (function(index) {
            deleteButton.addEventListener('click', function() {
                deleteTask(index);
            });
        })(i);
        actionCell.appendChild(deleteButton);
        taskRow.appendChild(actionCell);

        taskTable.appendChild(taskRow);
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));
}

window.addEventListener('DOMContentLoaded', function() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        taskList = JSON.parse(savedTasks);
        renderTaskTable();
    }

    var form = document.getElementById('task-form');
    form.addEventListener('submit', addTask);

    var maxTasksInput = document.getElementById('max-tasks');
    maxTasksInput.addEventListener('change', function() {
        maxTasks = parseInt(maxTasksInput.value);
    });
});