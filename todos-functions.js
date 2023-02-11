'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos')
  try {
		return todosJSON ? JSON.parse(todosJSON) : []
	} catch (e) {
		return []
	}
}

// Save todos to localStorage
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

// //Remove todo from the list
function removeTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if(todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed
    return searchTextMatch && hideCompletedMatch
  })

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

  filteredTodos.forEach((todo) => document.querySelector('#todos').appendChild(generateTodoDOM(todo)))
}

const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id)
  if(todo) {
    todo.completed = !todo.completed
  }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
const todoEl = document.createElement('div')
todoEl.classList.add('todo-app__item')

const checkbox = document.createElement('input')
checkbox.classList.add('todo-app__item-status')

const checkboxContainer = document.createElement('label')
checkboxContainer.classList.add('todo-app__custom-container')

const customCheckbox = document.createElement('span')
customCheckbox.classList.add('todo-app__custom-checkbox')

const todoText = document.createElement('p')
todoText.classList.add('todo-app__item-link')

const removeButton = document.createElement('button')
removeButton.classList.add('todo-app__button-remove')

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = todo.completed
  checkboxContainer.appendChild(checkbox)
  todoEl.appendChild(checkboxContainer)
  checkboxContainer.appendChild(customCheckbox)
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  // Setup the todo text
  todoText.textContent = todo.text
  checkboxContainer.appendChild(todoText)

  // Setup the remove button
  // removeButton.textContent = 'x'
  todoEl.appendChild(removeButton)

  removeButton.addEventListener('click', () => {
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })
  return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2')
  summary.classList.add('todo-app__summary')
  summary.textContent = `You have ${incompleteTodos.length} todos left`
  return summary
}