// Function to add a new todo
export function addTodo(todoText) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    // Get todos from localStorage
    const todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`) || '[]');
    
    // Add new todo
    const newTodo = {
        id: Date.now().toString(),
        title: todoText,
        completed: false
    };
    
    todos.push(newTodo);
    localStorage.setItem(`todos_${currentUser}`, JSON.stringify(todos));
    
    return newTodo;
} 