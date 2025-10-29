# todoListResplandecer

Documentação detalhada do projeto "todoListResplandecer" — uma lista de tarefas simples usada como material didático para aulas.

## Visão geral

Este projeto é uma aplicação de lista de tarefas (To‑Do List) escrita com HTML, CSS e JavaScript puros. O objetivo principal é demonstrar conceitos básicos de DOM, eventos, persistência no navegador (localStorage) e manipulação dinâmica de elementos para uso em sala de aula.

Principais características:
- Adicionar tarefas (via botão ou Enter)
- Editar tarefas inline
- Excluir tarefas (com confirmação)
- Persistência local usando `localStorage` (chave: `tasks`)

## Estrutura do projeto

Raiz do projeto:

- `index.html` — página principal (carrega `/css/styke.css` e `/js/index.js`).
- `README.md` — esta documentação.
- `css/styke.css` — estilos principais (observação: o nome tem um possível erro de digitação, "styke").
- `css/Untitled-1.css` — arquivo CSS adicional (não referenciado em `index.html`).
- `js/index.js` — implementação da lista de tarefas (variantes de nomes e abordagens).
- `js/index2.js` — versão alternativa/mais robusta que aguarda `DOMContentLoaded` e adiciona ícones/textos aos botões.
- `img/icons/` — ícones usados pela interface.

## Como executar (modo rápido)

Opção 1 — abrir localmente:
- Basta abrir `index.html` com um navegador (duplo clique no arquivo). Entretanto, alguns navegadores bloqueiam requisições a caminhos absolutos; recomenda-se usar um servidor local.

Opção 2 — servidor local simples (recomendado):
```bash
# no terminal, na pasta do projeto
python -m http.server 8000
# ou, se preferir node (serve)
npx serve .
```
Depois, abra `http://localhost:8000` no navegador.

## IDs e classes importantes (DOM)

- `#taskInput` — campo de texto para escrever a nova tarefa.
- `#addTaskButton` — botão para adicionar a tarefa.
- `#taskList` — elemento `ul` que contém as tarefas (cada tarefa é um `li`).
- `#taskInputFiltro` / `#filtroTaskButton` — UI de filtro (presente no HTML, porém sem implementação de filtro no JS principal).

## Como os dados são armazenados

As tarefas são guardadas no `localStorage` do navegador sob a chave `tasks` como um JSON contendo um array de strings. Exemplo de conteúdo salvo:

```json
["Comprar leite", "Enviar relatório", "Estudar JS"]
```

Contrato pequeno (inputs / outputs / erros):
- Entrada: texto da tarefa (string não vazia).
- Saída: novo item na lista do DOM; `localStorage` atualizado com o array de strings.
- Modo de erro: entradas vazias são ignoradas; exclusão requer confirmação do usuário.

## Fluxo e funções principais (resumo técnico)

- carregarTarefas / loadTasks: lê `localStorage.getItem('tasks')`, faz JSON.parse (ou `[]` se nulo) e cria elementos no DOM para cada item.
- criarTarefa / createTaskElement: constrói o `li`, cria `span` com o texto, botões de editar/excluir, e adiciona eventos.
- addTarefa / addTask: lê o valor do input, chama criarTarefa e salva no localStorage.
- editarTarefa / editTask: substitui o `span` por um `input` para edição inline; salva na perda de foco (`blur`) ou ao pressionar Enter.
- excluirTarefa / deleteTask: pede confirmação e remove o `li` do DOM; em seguida chama salvarTarefas / saveTasks.
- salvarTarefas / saveTasks: itera pelos `li` em `#taskList` e grava um array de strings em `localStorage` (JSON.stringify).

Observações de implementação:
- `js/index.js` usa variáveis globais e funções declaradas no escopo global.
- `js/index2.js` faz a mesma funcionalidade, porém usa `document.addEventListener('DOMContentLoaded', ...)` para garantir que os elementos existam antes de capturá-los. Também adiciona conteúdo (✎ e ✖) nos botões e é, em prática, mais seguro em cenários onde o carregamento do script pode ocorrer antes do DOM.

Bug conhecido (a ser corrigido):
- Em `js/index.js`, a função `salvarTarefas()` faz `Array.from(taskList.children)...` mas a variável definida no início do arquivo é `listaTarefas` (`const listaTarefas = document.querySelector('#taskList')`). Isso causa um erro de referência (`taskList` não definida). Solução: trocar `taskList` por `listaTarefas` dentro de `salvarTarefas()` ou unificar o nome da variável.

## Acessibilidade e usabilidade

- Botões e inputs têm textos e títulos; porém, recomenda-se adicionar `aria-label`s e usar elementos `button` com textos claros para leitores de tela.
- Adicionar foco visível via CSS (outline) para navegadores que usam teclado.

## Testes manuais rápidos

1. Abra a página.
2. Digite uma tarefa em `#taskInput` e pressione Enter ou clique em `Adicionar Tarefa`.
3. Verifique se a tarefa aparece na lista e permanece após recarregar a página.
4. Clique no ícone de editar, modifique o texto e pressione Enter; confirme que o `localStorage` foi atualizado.
5. Clique em excluir e confirme para remover; verifique `localStorage` novamente.

## Sugestões de melhorias (próximos passos)

- Corrigir o bug de variável citado acima.
- Implementar filtro funcional (`#taskInputFiltro`) para buscar por texto.
- Suportar tarefas com status (pendente/concluída) e possibilidade de marcar como concluída.
- Permitir ordenação, prioridade e datas de vencimento.
- Substituir armazenamento local por backend (API + sincronização) para persistência entre dispositivos.
- Adicionar testes automatizados (Jest + jsdom para funções de DOM) e linting (ESLint).
- Melhorar a experiência mobil e acessibilidade (WCAG).

## Como contribuir

1. Faça um fork do repositório.
2. Crie uma branch com a sua feature: `git checkout -b feat/nova-feature`.
3. Faça commits pequenos e descritivos.
4. Abra um Pull Request explicando o que foi alterado e por quê.

## Licença

Coloque aqui a licença desejada (por exemplo MIT). Se não houver definição, adicione um arquivo `LICENSE` com a licença escolhida.

---

Se quiser, eu posso:
- aplicar a correção automática do bug em `js/index.js` agora;
- unificar o comportamento para usar apenas `js/index2.js` e atualizar `index.html` para referenciar essa versão;
- adicionar um exemplo de testes automatizados simples.

Diga qual dessas ações prefere que eu execute a seguir.
