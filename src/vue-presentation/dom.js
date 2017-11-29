var app = {
    init: function() { //js执行的入口
        this.initData() //初始化数据
        this.initView() //初始化界面，界面的展示和dom事件的添加
    },
    initData: function() {
        var TODO_ID_SEED = 0
        this.todoList = [] //所有要做的事情
        this.todo = function(thing, startTime) { //每个任务,此处定义了一个类
            return {
                id: ++TODO_ID_SEED,
                thing: thing,
                startTime: startTime
            }
        }
        this.$newForm = $('#newTodoForm')
        this.$addBtn = $('#addBtn')
        this.$todoList = $('#todoList')
    },
    initView: function() {
        this.toggleElement(this.$newForm, false)
        this.attachEvent()
    },
    toggleElement($element, isShow) {
        isShow ? $element.show() : $element.hide()
    },
    attachEvent: function() {
        var self = this
        this.$addBtn.on('click', function() {
            self.addTodoList()
        })
        this.$newForm.on('submit', function(e) {
            e.preventDefault()
            self.saveTodoList()
        })
        this.$todoList.on('click', '.deleteBtn', function(e) {
            self.deleteTodoList($(this).data("id"))
        })
    },
    addTodoList() {
        this.toggleElement(this.$newForm, true)
        this.toggleElement(this.$addBtn, false)
    },
    saveTodoList() {
        var thing = this.$newForm.find("[name=thing]").val(),
            startTime = this.$newForm.find("[name=startTime]").val()
        this.todoList.push(this.todo(thing, startTime))
        this.displayTodoList()
        this.toggleElement(this.$newForm, false)
        this.toggleElement(this.$addBtn, true)
    },
    deleteTodoList(id) {
        this.todoList = this.todoList.filter(function(todo) {
            return todo.id != id
        })
        this.displayTodoList()
    },
    displayTodoList() {
        var compiled = _.template('<li> <%= startTime %> &nbsp;&nbsp; <%= thing %>    &nbsp;&nbsp;    <button class="deleteBtn" data-id=<%= id %>>X</button></li>'),
            html = []
        this.todoList.forEach(function(todo) {
            html.push(compiled(todo))
        })
        this.$todoList.empty().append(html.join(''))
    }
}
app.init()
