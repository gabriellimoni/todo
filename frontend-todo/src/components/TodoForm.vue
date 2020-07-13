<template>
    <div class="todo-form">
        <input 
            class="todo-input-text"
            ref="task_name" 
            type="text" 
            v-model="todo.task" 
            @keyup.enter="handleInputEnter(todo)"
        >

        <button 
            class="save-todo-button"
            v-if="mode === 'create'" 
            @click="handleAddTodo(todo)"
        >
            Adicionar
        </button>
        <button 
            class="save-todo-button"
            v-else-if="mode === 'update'" 
            @click="handleUpdateTodo(todo)"
        >
            Atualizar
        </button>
        <button 
            class="cancel-todo-button"
            @click="close"
        >
            Cancelar
        </button>
    </div>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: true,
            description: 'If it is on "create" or "update" mode',
        },
        old_todo: {
            type: Object,
            required: false,
            description: 'If it is on "update" mode, this is required',
        }
    },

    created () {
        if (this.mode === 'update') {
            this.todo = {...this.old_todo}
        }
    },

    mounted () {
        this.$refs.task_name.focus()
    },

    data () {
        return {
            todo: {
                task: '',
                status: 'pending',
            }
        }
    },

    methods: {
        handleInputEnter (todo) {
            if (this.mode == 'create') {
                this.handleAddTodo(todo)
            } else if (this.mode == 'update') {
                this.handleUpdateTodo(todo)
            }
        },
        handleAddTodo (todo) {
            this.$store.dispatch('createTodo', todo)
            .then(this.close)
        },
        handleUpdateTodo (todo) {
            this.$store.dispatch('updateTodoTaskName', todo)
            .then(this.close)
        },

        close () {
            this.clear()
            this.$store.commit('setMode', 'create')
            this.$store.commit('setEditingTodo', null)
            this.$emit('close')
        },
        clear () {
            this.todo = {
                task: '',
                status: 'pending',
            }
        }
    },

    watch: {
        old_todo: function (old) {
            this.todo = {...old}
        }
    }
}
</script>

<style>
.save-todo-button, .cancel-todo-button {
    padding: 7px 15px;
    color: #fafafa;
    border: none;
    border-radius: 5px;

    cursor: pointer;
    margin: 7px;
}
.save-todo-button {
    background: blue;
}

.cancel-todo-button {
    background: transparent;
    color: grey
}

.todo-input-text {
    padding: 5px;
}
</style>
