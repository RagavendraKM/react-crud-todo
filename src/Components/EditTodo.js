import React , { Component } from 'react'
import axios from 'axios'

class EditTodo extends Component {
    constructor(props){
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        this.onChangeTodoName = this.onChangeTodoName.bind(this)
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        
        this.state = {
            todo_name : '',
            todo_description : '',
            todo_responsible : '',
            todo_priority : '',
            todo_completed : false
        }
    }

    async componentDidMount() {
       await axios.get("http://localhost:4000/api/" + this.props.match.params.id)
        .then(res => {
            this.setState({
                todo_name : res.data.todo_name,
                todo_description : res.data.todo_description,
                todo_responsible : res.data.todo_responsible,
                todo_priority : res.data.todo_priority,
                todo_completed : res.data.todo_completed
            })
        }).catch(err => console.log(err))
        
        console.log("TodoList Name : " , this.state.todo_name)
        console.log("TodoList Description : ", this.state.todo_description)
        console.log("TodoList Responsible : " , this.state.todo_responsible)
        console.log("TodoList Priority : " , this.state.todo_priority)
        console.log("TodoList Completed : " , this.state.todo_completed)
    }
    
    onChangeTodoName(event) {
        console.log("name event", event)
        this.setState({
            todo_name : event.target.value
        })
    }
    
     onChangeTodoPriority(event) {
        this.setState({
            todo_priority : event.target.value
        })
    }
    
    onChangeTodoDescription(event) {
        this.setState({
            todo_description : event.target.value
        })
    }
    
    onChangeTodoResponsible(event) {
        this.setState({
            todo_responsible : event.target.value
        })
    }

    onChangeTodoCompleted(event) {
        console.log("event",event.target)
        this.setState({
            ...this.state,
            todo_completed : !this.state.todo_completed
        })
    }

    async deleteTodo(event) {
        event.preventDefault()

        const todo = {
            todo_name : this.state.todo_name,
            todo_description : this.state.todo_description,
            todo_responsible : this.state.todo_responsible,
            todo_priority : this.state.todo_priority,
            todo_completed  : this.state.todo_completed
        }

        await axios.post("http://localhost:4000/api/delete/" + this.props.match.params.id, todo)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        this.props.history.push('/');
    }
    
    async onSubmit(event) {
        event.preventDefault()
        
        console.log("TodoList Name : " , this.state.todo_name)
        console.log("TodoList Description : ", this.state.todo_description)
        console.log("TodoList Responsible : " , this.state.todo_responsible)
        console.log("TodoList Priority : " , this.state.todo_priority)
        console.log("TodoList Completed : " , this.state.todo_completed)
        
        const updatedTodo = {
            todo_name : this.state.todo_name,
            todo_description : this.state.todo_description,
            todo_responsible : this.state.todo_responsible,
            todo_priority : this.state.todo_priority,
            todo_completed  : this.state.todo_completed
        }
        
        await axios.post("http://localhost:4000/api/update/" + this.props.match.params.id, updatedTodo)
        .then(res => console.log(res.data))
        this.props.history.push('/');
    }
    
    render() {
        return(
            <div style={{marginTop: 10}}>
            <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Todo Name : </label>
                    <input type="text" className="form-control" 
                        value={this.state.todo_name} 
                        onChange={this.onChangeTodoName} required />
                </div>
                <div className="form-group">
                    <label>Todo Description : </label>
                    <input type="text" className="form-control" 
                    value={this.state.todo_description} 
                    onChange={this.onChangeTodoDescription} required />
                </div>
                <div className="form-group">
                    <label>Todo Responsible : </label>
                    <input type="text" className="form-control" 
                        value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible} required />
                </div>
                <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
               <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                        <button value="Delete Todo" className="btn btn-secondary" onClick={this.deleteTodo}>
                            Delete Todo</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditTodo