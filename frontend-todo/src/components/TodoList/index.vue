<template>
    <div class="todo-list">
        <template v-for="todo of todos">
            <todo-list-item :key="todo.id" :todo="{...todo}" />
        </template>
    </div>
</template>

<script>
import TodoListItem from './TodoListItem'
export default {
    components: {
        TodoListItem,
    },
    computed: {
        todos: function () {
            return [...this.$store.state.todos]
        }
    }
}
</script>

<style>
.todo-list {
    width: 500px;
    margin: auto;
}
</style>