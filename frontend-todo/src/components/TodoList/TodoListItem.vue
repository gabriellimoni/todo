<template>
    <div class="todo-item">
        <div 
            class="todo-item-task" 
            @click="openEditTodo({...todo})"
            :class="{ 'is-completed': todo.status == 'done' }"
        >
            {{ todo.task }}
        </div>
        <div class="todo-item-status">
            <input type="checkbox" :checked="todo.status == 'done'" @click="toggleTodoStatus({...todo})">
            <button class="todo-item-status-button" @click="handleRemoveTodo({...todo})">Del</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        }
    },

    methods: {
        handleRemoveTodo (todo) {
            this.$store.dispatch('deleteTodo', todo)
        },

        openEditTodo (todo) {
            this.$store.commit('setEditingTodo', todo)
            this.$store.commit('setMode', 'update')
        },

        toggleTodoStatus (todo) {
            if (todo.status === 'pending') {
                todo.status = 'done'
            } else if (todo.status === 'done') {
                todo.status = 'pending'
            }
            
            this.$store.dispatch('updateTodoStatus', todo)
        }
    }
}
</script>

<style>
.todo-item {
    color: #444;
    font-size: 25px;
    margin: 2px 0;
    font-family: sans-serif;

    border: 1px solid #ddd;
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.todo-item > div {
    text-align: center;
}

.todo-item-task {
    flex: 1
}
.todo-item-status {
    flex: 0.5;
}

.is-completed {
    color: #888;
    text-decoration: line-through;
}

.todo-item-task {
    cursor: pointer;
    transition: .2s all;
    padding: 5px 0;
    border-radius: 5px;
}
.todo-item-task:hover {
    background: rgba(0,0,0, 0.1);
}

.todo-item-status {
    display: flex;
    justify-content: center;
    align-items: center;
}
.todo-item-status-button {
    background: #dd3333;
    color: #fafafa;
    border: none;
    border-radius: 5px;
    
    transition: .2s all;

    cursor: pointer;
}
.todo-item-status-button:hover {
    background: #bb3333;
}
.todo-item-status-button:active {
    background: #aa3333;
}
</style>