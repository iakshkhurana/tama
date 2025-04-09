// Function to complete a todo
export function completeTodo(id, completed) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`) || '[]');
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex !== -1) {
        todos[todoIndex].completed = completed;
        localStorage.setItem(`todos_${currentUser}`, JSON.stringify(todos));
        return true;
    }
    
    return false;
}