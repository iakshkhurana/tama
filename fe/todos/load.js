function loadTodos() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`) || '[]');
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${todo.title}</span>`;
        
        if (todo.completed) {
            li.style.textDecoration = 'line-through';
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => {
            completeTodo(todo.id, !todo.completed);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteTodo(todo.id);
        };

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}