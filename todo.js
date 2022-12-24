'use strict'
let todos = getSavedtodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function(e) {
  console.log(e.target.value)
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

document.querySelector('#todo-item').addEventListener('submit', function(e) {
  e.preventDefault()
  todos.push({
    text: e.target.elements.text.value,
    completed: false
  })

  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodos(todos, filters)
  e.target.elements.text.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', function(e){
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)
})
