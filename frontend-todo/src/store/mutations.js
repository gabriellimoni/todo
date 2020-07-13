const mutSetLoading = (state, loading) => state.loading = loading
const mutAddTodo = (state, todo) => state.todos.push(todo)
const mutUpdateTodo = (state, todo) => {
  const old_todo_index = state.todos.map(todo => todo.id).indexOf(todo.id)
  state.todos.splice(old_todo_index, 1, todo)
}
const mutRemoveTodoById = (state, todo_id) => {
  const old_todo_index = state.todos.map(todo => todo.id).indexOf(todo_id)
  state.todos.splice(old_todo_index, 1)
}
const mutSetEditingTodo = (state, todo) => state.editing_todo = todo
const mutSetMode = (state, mode) => state.mode = mode

export default {
    addTodo: mutAddTodo,
    removeTodoById: mutRemoveTodoById,
    updateTodo: mutUpdateTodo,
    setEditingTodo: mutSetEditingTodo,
    setMode: mutSetMode,
    setLoading: mutSetLoading,
}
