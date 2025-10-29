document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    
    // Carregar tarefas do localStorage quando a página carregar
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Criar elemento de tarefa
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Criar botões de editar e excluir
        const editButton = document.createElement('button');
        editButton.textContent = '✎';
        editButton.className = 'edit-btn';
        editButton.title = 'Editar tarefa';
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.className = 'delete-btn';
        deleteButton.title = 'Excluir tarefa';
        
        // Adicionar elementos ao li
        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        // Evento de edição
        editButton.addEventListener('click', () => editTask(li, taskSpan));
        
        // Evento de exclusão
        deleteButton.addEventListener('click', () => deleteTask(li));
        
        taskList.appendChild(li);
    }

    // Função para editar tarefa
    function editTask(li, taskSpan) {
        const currentText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        
        // Substituir o span pelo input
        li.replaceChild(input, taskSpan);
        input.focus();
        
        // Função para salvar a edição
        function saveEdit() {
            const newText = input.value.trim();
            if (newText !== '') {
                taskSpan.textContent = newText;
                li.replaceChild(taskSpan, input);
                saveTasks();
            }
        }
        
        // Eventos para salvar a edição
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
    }
    
    // Função para excluir tarefa
    function deleteTask(li) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            li.remove();
            saveTasks();
        }
    }

    // Salvar tarefas no localStorage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.querySelector('span').textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            // Criar e adicionar novo elemento de lista
            createTaskElement(taskText);
            
            // Salvar no localStorage
            saveTasks();
            
            // Limpar o input
            taskInput.value = '';
            
            // Focar no input para adicionar nova tarefa
            taskInput.focus();
        }
    }

    // Carregar tarefas existentes
    loadTasks();

    // Adicionar tarefa quando o botão for clicado
    addTaskButton.addEventListener('click', addTask);

    // Adicionar tarefa quando pressionar Enter no input
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
