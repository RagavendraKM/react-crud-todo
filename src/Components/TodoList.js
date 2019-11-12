import React , { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../App.css';

const Todo = (props) =>
    <tr>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_name}</td>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            todos : []
        }
    }
    
    componentDidMount() {
        axios.get("http://localhost:4000/api")
        .then(result => {
            this.setState({ todos : result.data})
        })
    }

    todoList() {
       return this.state.todos.map((currentTodo,i) => {
           return <Todo todo={currentTodo} key={i} />
       })
    }
    
    render() {
        return(
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TodoList