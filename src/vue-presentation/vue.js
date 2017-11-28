Vue.component('button-say', {
  template: '<button @click="say">click me to say some words</button>',
  props:{
    words:"Boolean"
  },
  methods: {
    say: function(){
      alert(this.words)
    }
  }
})
new Vue({
    el: "#app",
    config:{
      delimeter: [ "${","}"]
    },
    data: {
        isAddingTodo: false,
        TODO_ID_SEED: 0,
        originalModel: {
            id: 0,
            thing: "",
            startTime: "00:00"
        },
        model: null,
        todoList: []
    },
    methods: {
        addTodo: function() {
            this.isAddingTodo = true
        },
        saveTodoList: function() {
            this.todoList.push(Object.assign({}, this.model, {
                id: ++this.TODO_ID_SEED
            }))
            this.model = Object.assign({}, this.originalModel)
            this.isAddingTodo = false
        },
        deleteTodo(id) {
            this.todoList = this.todoList.filter(function(todo) {
                return todo.id != id
            })
        }
    },
    created() {
        this.model = Object.assign({}, this.originalModel)
    }
})
