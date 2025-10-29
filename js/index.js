// VARIAVEIS GLOBAIS  CAPTURANDO ELEMENTOS DO DOM
const inputTarefa = document.querySelector('#taskInput');
const btnAdicionarTarefa = document.querySelector('#addTaskButton');
const listaTarefas = document.querySelector('#taskList');
const inputFiltro = document.querySelector('#taskInputFiltro');
const btnFiltro = document.querySelector('#filtroTaskButton');
const btnNewTaskButton = document.getElementById('newTaskButton');
const inputSection = document.querySelector('.inputSection');

// Carregar tarefas do localStorage quando a página carregar
    function carregarTarefas() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            criarTarefa(taskText);
        });
    }

// Criar elemento da tarefa
    function criarTarefa(taskText) {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Criar botões de editar e excluir
        const editButton = document.createElement('button');
       
        editButton.className = 'edit-btn';
        editButton.title = 'Editar tarefa';
        
        const deleteButton = document.createElement('button');

        deleteButton.className = 'delete-btn';
        deleteButton.title = 'Excluir tarefa';
        
        // Adicionar elementos ao li
        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        // Evento de edição
        editButton.addEventListener('click', () => editarTarefa(li, taskSpan));
        
        // Evento de exclusão
        deleteButton.addEventListener('click', () => excluirTarefa(li));

        listaTarefas.appendChild(li);
    }

    // Função para editar tarefa
    function editarTarefa(li, taskSpan){
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
                salvarTarefas();
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
    function excluirTarefa(li) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            li.remove();
            salvarTarefas();
        }
    }

     // Salvar tarefas no localStorage
    function salvarTarefas() {
        const tasks = Array.from(taskList.children).map(li => li.querySelector('span').textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function addTarefa() {
        const taskText = inputTarefa.value.trim();
        
        if (taskText !== '') {
            // Criar e adicionar novo elemento de lista
            criarTarefa(taskText);
            
            // Salvar no localStorage
            salvarTarefas();
            
            // Limpar o input
            inputTarefa.value = '';
            
            // Focar no input para adicionar nova tarefa
            inputTarefa.focus();
        }
    }


    // Adicionar tarefa quando o botão for clicado
    btnAdicionarTarefa.addEventListener('click', addTarefa);

    // Adicionar tarefa quando pressionar Enter no input
    inputTarefa.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTarefa();
        }
    });


    
    // Função para filtrar tarefas
    function filtrarTarefas(termoBusca) {
        const todasTarefas = listaTarefas.querySelectorAll('li');
        const termo = termoBusca.toLowerCase().trim();
        
        todasTarefas.forEach(tarefa => {
            const textoTarefa = tarefa.querySelector('span').textContent.toLowerCase();
            if (textoTarefa.includes(termo)) {
                tarefa.style.display = ''; // Mostra a tarefa
            } else {
                tarefa.style.display = 'none'; // Esconde a tarefa
            }
        });
    }

    // Evento de digitação no campo de filtro
    inputFiltro.addEventListener('input', (e) => {
        filtrarTarefas(e.target.value);
    });

    // Evento de clique no botão de filtro
    // btnFiltro.addEventListener('click', () => {
    //     filtrarTarefas(inputFiltro.value);
    // });

    
    // Adicionar evento de clique ao botão Nova Tarefa
    btnNewTaskButton.addEventListener('click', () => {
        if (inputSection.getAttribute('openNovaTarefa') === 'true') {
            inputSection.setAttribute('openNovaTarefa', 'false');
        } else {
            inputSection.setAttribute('openNovaTarefa', 'true');
        }
    });

    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        #inputSection {
            display: none;
            position: fixed;
            left: 50%;
            transform: translate(-50%, -100%);
            z-index: 1000;
        }
        @keyframes slideDown {
            from { transform: translate(-50%, -100%); }
            to { transform: translate(-50%, -50%); }
        }
    `;
    document.head.appendChild(style);
    // Carregar tarefas existentes
    carregarTarefas();