import { loadTodos} from './todos/load.js';
import { completeTodo} from './todos/complete.js';
import { deleteTodos} from './todos/delete.js';

let isSigningUp = false;
let isAddingTodo = false;

// Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    isSigningUp = true;

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        document.getElementById('response-message').innerText = 'Username already exists';
        isSigningUp = false;
        return;
    }
    
    // Add new user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('response-message').innerText = 'Signup successful, please sign in';
    document.getElementById('signup-component').style.display = 'none';
    document.getElementById('signin-component').style.display = 'block';
    isSigningUp = false;
});

// Signin Form Submission
document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store current user in localStorage
        localStorage.setItem('currentUser', username);
        
        document.getElementById('signin-component').style.display = 'none';
        document.getElementById('todo-container').style.display = 'block';
        document.getElementById('response-message').innerHTML = 
            `Logged in successfully. <a href="#" id="logout-link">Logout</a>`;
        
        loadTodos();

        // Add event listener for the logout link
        document.getElementById('logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser'); // Clear current user
            document.getElementById('todo-container').style.display = 'none';
            document.getElementById('signin-component').style.display = 'block';
            document.getElementById('response-message').innerText = '';
        });
    } else {
        document.getElementById('response-message').innerText = 'Invalid username or password';
    }
});

// Toggle between Signup and Signin
document.getElementById('show-signin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-component').style.display = 'none';
    document.getElementById('signin-component').style.display = 'block';
});

document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signin-component').style.display = 'none';
    document.getElementById('signup-component').style.display = 'block';
});

document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (isAddingTodo) return;
    isAddingTodo = true;

    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (!todoText) {
        isAddingTodo = false;
        return;
    }

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        isAddingTodo = false;
        return;
    }

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
    
    todoInput.value = '';
    loadTodos();
    isAddingTodo = false;
});