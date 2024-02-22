let taskItems = [];
const todoInput = document.querySelector(".todoInput");
const completedTasks = document.getElementById("completedTasks");
const ongoingTasks = document.getElementById("ongoingTasks");


// ---
window.onload = () => {
  let storageTasks = localStorage.getItem('tasks');
  if (storageTasks !== null) {
    taskItems = JSON.parse(storageTasks);
  }

  loadTasks();
};

// ---
todoInput.onkeyup = ((e) => {
  let value = e.target.value.replace(/^\s+/, "")
  if(value && e.keyCode === 13){
    addTask(value)

    todoInput.value = ''
    todoInput.focus()
  }

});

// Adicionar Tarefa
function addTask(text) {
  taskItems.push({
    id: Date.now(),
    text,
    completed: false
  })

  saveAndLoadTasks()
}

// Remover Tarefa
function removeTask(id){
  taskItems = taskItems.filter(task => task.id !== Number(id))
  saveAndLoadTasks()
}

// Marcar Tarefa como Completa
function markAsCompleted(id){
  taskItems = taskItems.filter(task => {
    if(task.id === Number(id)){
      task.completed = true
    }
    return task
  })
  saveAndLoadTasks()
}

// Marcar Tarefa como Pendente
function markAsOngoing(id){
  taskItems = taskItems.filter(task => {
    if(task.id === Number(id)){
      task.completed = false
    }
    return task
  })
  saveAndLoadTasks()
}

// Salvar Tarefas no LocalStorage
function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(taskItems))
}

// Carregar Tarefas do LocalStorage
function loadTasks() {
  let ongoingTasksDiv = document.getElementById("ongoingTasks");
  let completedTasksDiv = document.getElementById("completedTasks");

  ongoingTasksDiv.innerHTML = '';
  completedTasksDiv.innerHTML = '';

  let ongoingTasks = taskItems.filter(task => !task.completed);
  let completedTasks = taskItems.filter(task => task.completed);

  if (ongoingTasks.length > 0) {
    ongoingTasks.forEach(task => {
      ongoingTasksDiv.appendChild(createTask(task));
    });
  } else {
    ongoingTasksDiv.innerHTML = '<div class="empty">Sem tarefas pendentes</div>';
  }

  if (completedTasks.length > 0) {
    completedTasksDiv.innerHTML = `<div class ="completedTitle">Tarefas Completas (${completedTasks.length} / ${taskItems.length})</div>`;
    completedTasks.forEach(task => {
      completedTasksDiv.appendChild(createTask(task));
    });
  } else {
    completedTasksDiv.innerHTML = '<div class ="completedTitle">Tarefas Completas (0 / 0)</div>';
  }
}

// Salvar e Carregar Tarefas
function saveAndLoadTasks(){
  saveTasks()
  loadTasks()
}

// Criar Tarefa no HTML
function createTask(task) {
  const taskDiv = document.createElement('div');
  taskDiv.setAttribute('data-id', task.id);
  taskDiv.className = 'taskItem';

  const taskTextSpan = document.createElement('span');
  taskTextSpan.innerHTML = task.text;

  const taskInputCheckbox = document.createElement('input');
  taskInputCheckbox.type = 'checkbox';
  taskInputCheckbox.checked = task.completed;
  taskInputCheckbox.onclick = (e) => {
    let id = e.target.closest('.taskItem').dataset.id;
    e.target.checked ? markAsCompleted(id) : markAsOngoing(id);
  }

  // Botão de Remover Tarefa
  const taskRemoveBTN = document.createElement('a');
  taskRemoveBTN.href = '#';
  taskRemoveBTN.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" ' +
    'width="25" height="25" fill="currentColor" class="bi bi-x" ' +
    'viewBox="0 0 16 16">' +
    '<path ' +
    'd="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">' +
    '</path>' +
    '</svg>';

  taskRemoveBTN.onclick = (e) => {
    let taskItem = e.target.closest('.taskItem');
    if (taskItem) {
      let id = taskItem.dataset.id;
      removeTask(id);
    }
  };

  taskTextSpan.prepend(taskInputCheckbox);
  taskDiv.append(taskTextSpan, taskRemoveBTN);

  return taskDiv;
}