<template>
  <div class="todo-page">
    <!-- Loading component -->

    <!-- Todo Form component -->
    <button 
      class="open-todo-form-button"
      v-if="show_new_todo_button" 
      @click="open_form = true"
    >
      Nova todo
    </button>
    <todo-form v-if="show_todo_form" :mode="mode" :old_todo="editing_todo" @close="open_form = false" />
    
    <!-- Todo List component -->
    <todo-list />
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default {
  name: 'Todo',

  components: {
    TodoForm,
    TodoList,
  },

  data () {
    return {
      open_form: false,
    }
  },

  created () {
    this.$store.dispatch('loadTodos')
  },

  computed: {
    show_new_todo_button: function () {
      if (this.editing_todo) return false
      if (this.show_todo_form) return false

      return true
    },
    show_todo_form: function () {
      if (this.editing_todo) return true
      if (!this.open_form) return false

      return true
    },
    loading: function () {
      return this.$store.state.loading
    },
    mode: function () {
      return this.$store.state.mode
    },
    editing_todo: function () {
      return this.$store.state.editing_todo
    },
  }
}
</script>

<style>
.todo-page {
  width: 500px;
  margin: auto;
}

.open-todo-form-button {
  padding: 7px 15px;
  background: green;
  color: #fafafa;
  border: none;
  border-radius: 5px;

  cursor: pointer;
}
</style>