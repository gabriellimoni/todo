<template>
    <div class="todo-item">
        <div 
            class="todo-item-task" 
            @click="openEditTodo({...todo})"
            :class="{ 'is-completed': todo.status == 'done' }"
        >
            <img :if="todo_file_url" :src="todo_file_url" width="120">
            {{ todo.task }}
        </div>
        <div class="todo-item-status">
            <input type="checkbox" :checked="todo.status == 'done'" @click="toggleTodoStatus({...todo})">
            <button class="todo-item-icon-button" @click="handleSetTodoIcon">Add Icon</button>
            <button class="todo-item-status-button" @click="handleRemoveTodo({...todo})">Del</button>
        </div>

        <!-- hidden icon selector -->
        <input type="file" ref="icon_selector" @change="iconFileChosed" style="display: none;">
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

    computed: {
        todo_file_url: function () {
            if (this.todo.files) {
                return this.todo.files[0].url
            } else return false
        }
    },

    methods: {
        handleSetTodoIcon () {
            this.$refs.icon_selector.click()
        },

        iconFileChosed (event) {
            this.$store.dispatch('uploadTodoFile', event.target.files[0])
            .then(file => {
                this.todo.files = [file]
                return this.$store.dispatch('updateTodoFiles', this.todo)
            })
        },

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

<style scoped>
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

button {
    border: none;
    border-radius: 5px;
    transition: .2s all;
    cursor: pointer;
}

.todo-item-status-button {
    background: #dd3333;
    color: #fafafa;
}
.todo-item-status-button:hover {
    background: #bb3333;
}
.todo-item-status-button:active {
    background: #aa3333;
}
.todo-item-icon-button {
    margin: 0 3px 0 20px;
    background: orange;
    color: #fafafa;
}
.todo-item-icon-button:hover {
    background: orangered;
}
.todo-item-icon-button:active {
    background: peru;
}
</style>