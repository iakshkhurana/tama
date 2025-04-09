// Function to delete a todo
export function deleteTodo(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return false;
    
    const todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`) || '[]');
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    localStorage.setItem(`todos_${currentUser}`, JSON.stringify(filteredTodos));
    return true;
}