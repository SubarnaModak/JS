const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
let tasks = [];
let editingTaskId = null; 
addTaskBtn.addEventListener('click', () => {
  if (editingTaskId === null) {
    addTask();
  } else {
    updateTask(editingTaskId);
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = ''; 
  saveTasks(); 
}

function updateTask(taskId) {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, text: taskText } : task
  );

  editingTaskId = null; 
  addTaskBtn.textContent = 'Add Task'; 
  taskInput.value = ''; 
  renderTasks();
  saveTasks();
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed'); 
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.classList.add('complete');
    completeBtn.addEventListener('click', () => toggleComplete(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editTask(task.id));

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
  });
}

function toggleComplete(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
  saveTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
  saveTasks();
}

function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    taskInput.value = task.text; 
    editingTaskId = taskId; 
    addTaskBtn.textContent = 'Update Task'; 
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

window.onload = loadTasks;
