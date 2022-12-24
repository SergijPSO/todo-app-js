//Getting saved todos
function getSavedtodos() {
	const todosJSON = localStorage.getItem('todos')

	if(todosJSON !== null) {
		return JSON.parse(todosJSON)
	} else {
		return []
	}
}

//Generate todos items in DOM
function generateTodoDom(todoItem) {
	const todoParagraph = document.createElement('p')
	if(todoItem.text.length > 0) {
		todoParagraph.textContent = todoItem.text
	}
	return todoParagraph
}

//Create summary
function createSummary(incompletedTodos) {
	const summary = document.createElement('h1')
  summary.textContent = `You have ${incompletedTodos.length} things todo that are incompleted`
  document.querySelector('#todos').appendChild(summary)
}

//Reneder todos
function renderTodos(todos, filters) {
  let filteredTodos = todos.filter( function(todo)  {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  const incompletedTodos = filteredTodos.filter((todoItem) => {
    return !todoItem.completed
  })
  
  document.querySelector('#todos').innerHTML = ''

	createSummary(incompletedTodos)
  
  filteredTodos.forEach((todoItem) => {
    const todoParagraph = generateTodoDom(todoItem)
    document.querySelector('#todos').appendChild(todoParagraph)
  })
}