'use strict'

let todos = [
  {
    text: 'Learn js during the day',
    completed: false
  },
  { 
    text: 'To work with fixes',
    completed: false
  },
  { 
    text: 'Wrote to Yura',
    completed: true
  },
  { 
    text: 'Check email',
    completed: false
  },
  { 
    text: 'Feed my cat',
    completed: true
  }
]

const filters = {
  searchText: '',
  hideCompleted: false
}

function renderTodos(todos, filters) {
  let filteredTodos = todos.filter(function (todo)  {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  // filteredTodos = filteredTodos.filter( function(todo) {
  //   if(filters.hideCompleted) {
  //     return !todo.completed
  //   } else {
  //     return true
  //   }
  // })

  const incompletedTodos = filteredTodos.filter((todoItem) => {
    return !todoItem.completed
  })
  
  document.querySelector('#todos').innerHTML = ''

  const summary = document.createElement('h1')
  summary.textContent = `You have ${incompletedTodos.length} things todo that are incompleted`
  document.querySelector('#todos').appendChild(summary)
  
  filteredTodos.forEach((todoItem) => {
    const todoParagraph = document.createElement('p')
    todoParagraph.textContent = todoItem.text
    document.querySelector('#todos').appendChild(todoParagraph)
  })
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

  renderTodos(todos, filters)
  e.target.elements.text.value = ''
})


document.querySelector('#hide-completed').addEventListener('change', function(e){
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)

})
