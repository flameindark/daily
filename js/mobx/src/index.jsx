import {observable, action, computed} from 'mobx'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'

class Todo {
    id = Math.random();
    @observable title = '';
    @observable finished =  false;

    constructor(title) {
        this.title = title;
    }
    @action.bound toggle() {
        this.finished = !this.finished
    }
}

class Store {
    @observable todos = []
    @action.bound createTodo(title) {
        this.todos.unshift(new Todo(title))
    }
    @action.bound removeTodo(todo) {
        this.todos.remove(todo)
    }
    @computed get left() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

var store = new Store();

@observer 
class TodoList extends Component {
    // static PropTypes = {
    //     store: PropTypes.shape({
    //         createTodo: PropTypes.func,
    //         todos: PropTypes.array
    //     }).isRequired
    // };
    state = {
        inputValue: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();

        let store = this.props.store;
        let value = this.state.inputValue;
        store.createTodo(value);
        this.setState({inputValue: ''})
    }
    handleChange = (e) => {
        let inputValue = e.target.value;
        this.setState({
            inputValue
        })
    }
    render() {
        const store = this.props.store;
        const todos = store.todos;
        return <div className="todo-list">
            <header>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} className="input" placeholder="what to be finished" value={this.state.inputValue}/>
                </form>
            </header>
            <ul>
                {todos.map(todo => {
                    return <li key={todo.id} className="todoItem">
                        <TodoItem  todo={todo}/><span className="delete" onClick={e=>store.removeTodo(todo)}>X</span>
                    </li>
                })}
            </ul>
            <footer>{store.left} items(s) unfinished</footer>
        </div>
    }
}

@observer
class TodoItem extends Component {
    // static PropTypes = {
    //     todo : PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         title: PropTypes.string.isRequired,
    //         finished: PropTypes.bool.isRequired
    //     }).isRequired
    // }
    handleClick = e => {
        this.props.todo.toggle();
    }
    render() {
        const todo = this.props.todo;
        return <React.Fragment>
            <input type="checkbox" className="toggle" checked={todo.finished} onClick={this.handleClick}/>
            <span className="title">{todo.title}</span>
        </React.Fragment>
    }
}

ReactDOM.render(<TodoList store={store}/>, document.querySelector('#app'))