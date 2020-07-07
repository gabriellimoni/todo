import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'
import storage from '@/services/storage'

Vue.use(Vuex)

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

const actLoadTodos = async ({ commit }) => {
  commit('setLoading', true)
  const { data: todos } = await api.get('todos')
  todos.forEach(todo => commit('addTodo', todo))
  commit('setLoading', false)
}
const actCreateTodo = async ({ commit }, todo) => {
  commit('setLoading', true)
  const { data } = await api.post('todos', todo)
  commit('addTodo', data.todo)
  commit('setLoading', false)
}
const actUpdateTodoStatus = async ({ commit }, todo) => {
  commit('setLoading', true)
  const { data } = await api.patch(`todos/${todo.id}/status/${todo.status}`)
  commit('updateTodo', data.todo)
  commit('setLoading', false)
}
const actUpdateTodoTaskName = async ({ commit }, todo) => {
  commit('setLoading', true)
  const { data } = await api.patch(`todos/${todo.id}/name/${todo.task}`)
  commit('updateTodo', data.todo)
  commit('setLoading', false)
}
const actDeleteTodo = async ({ commit }, todo) => {
  commit('setLoading', true)
  const { data } = await api.delete(`todos/${todo.id}`)
  commit('removeTodoById', todo.id)
  commit('setLoading', false)
}
const actUploadTodoFile = async ({ commit }, file) => {
  commit('setLoading', true)
  const file_data = await storage.uploadFile(file)
  commit('setLoading', false)
  return file_data
}
const actUpdateTodoFiles = async ({ commit }, todo) => {
  commit('setLoading', true)
  const { data } = await api.patch(`todos/${todo.id}/files`, { files: todo.files })
  commit('updateTodo', data.todo)
  commit('setLoading', false)
}

export default new Vuex.Store({
  state: {
    loading: false,
    todos: [],
    editing_todo: null,
    mode: 'create',
  },
  mutations: {
    addTodo: mutAddTodo,
    removeTodoById: mutRemoveTodoById,
    updateTodo: mutUpdateTodo,
    setEditingTodo: mutSetEditingTodo,
    setMode: mutSetMode,
    setLoading: mutSetLoading,
  },
  actions: {
    loadTodos: actLoadTodos,
    createTodo: actCreateTodo,
    deleteTodo: actDeleteTodo,
    updateTodoStatus: actUpdateTodoStatus,
    updateTodoTaskName: actUpdateTodoTaskName,
    uploadTodoFile: actUploadTodoFile,
    updateTodoFiles: actUpdateTodoFiles,
  },
  modules: {
  }
})
