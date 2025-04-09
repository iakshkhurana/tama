function deleteTodo(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`) || '[]');
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    localStorage.setItem(`todos_${currentUser}`, JSON.stringify(filteredTodos));
    loadTodos();
}