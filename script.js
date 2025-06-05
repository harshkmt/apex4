// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// To-Do App Functionality
document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    loadTodos();

    // Add todo
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todoItem = {
                id: Date.now(),
                text: todoText,
                completed: false
            };

            saveTodoToLocalStorage(todoItem);
            renderTodoItem(todoItem);
            todoInput.value = '';
        }
    }

    function renderTodoItem(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        if (todo.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-todo">×</button>
        `;

        li.querySelector('span').addEventListener('click', function() {
            toggleTodoCompletion(todo.id);
        });

        li.querySelector('.delete-todo').addEventListener('click', function() {
            removeTodo(todo.id);
        });

        todoList.appendChild(li);
    }

    function saveTodoToLocalStorage(todo) {
        let todos = getTodosFromLocalStorage();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodosFromLocalStorage() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    function loadTodos() {
        const todos = getTodosFromLocalStorage();
        todos.forEach(todo => renderTodoItem(todo));
    }

    function toggleTodoCompletion(id) {
        let todos = getTodosFromLocalStorage();
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        refreshTodoList();
    }

    function removeTodo(id) {
        let todos = getTodosFromLocalStorage();
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
        refreshTodoList();
    }

    function refreshTodoList() {
        todoList.innerHTML = '';
        loadTodos();
    }
});

// Product Listing Functionality
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');

    // Sample product data
    const products = [
        { id: 1, name: 'Smartphone', category: 'electronics', price: 599, rating: 4.5, image: 'Smartphone.png' },
        { id: 2, name: 'Laptop', category: 'electronics', price: 999, rating: 4.8, image: 'Laptop.png' },
        { id: 3, name: 'T-Shirt', category: 'clothing', price: 19.99, rating: 4.2, image: 'T_sert.png' },
        { id: 4, name: 'Jeans', category: 'clothing', price: 49.99, rating: 4.0, image: 'Jense.png' },
        { id: 5, name: 'Coffee Table', category: 'home', price: 149.99, rating: 4.7, image: 'Coffie_table.png' },
        { id: 6, name: 'Desk Lamp', category: 'home', price: 29.99, rating: 4.3, image: 'Lamp.png' },
        { id: 7, name: 'Headphones', category: 'electronics', price: 199.99, rating: 4.6, image: 'Headphone.png' },
        { id: 8, name: 'Sneakers', category: 'clothing', price: 79.99, rating: 4.4, image: 'shoes.png' }
    ];

    // Initial render
    renderProducts(products);

    // Event listeners for filters
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);

    function filterProducts() {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const sortOption = sortBy.value;

        let filteredProducts = [...products];

        // Filter by category
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        // Filter by price
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (priceRange.endsWith('+')) {
                filteredProducts = filteredProducts.filter(product => product.price >= min);
            } else {
                filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
            }
        }

        // Sort products
        switch (sortOption) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default sorting (by ID)
                filteredProducts.sort((a, b) => a.id - b.id);
        }

        renderProducts(filteredProducts);
    }

    function renderProducts(productsToRender) {
        productsContainer.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productsContainer.innerHTML = '<p>No products found matching your criteria.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-rating">Rating: ${product.rating}/5</p>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
    }
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});