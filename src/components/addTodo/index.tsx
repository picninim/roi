import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';

import './styles.css';

import { ApplicationState } from '../../store';
import * as TodoActions from '../../store/todos/actions';
import { Todo, TodosState, ErrorTypes } from '../../store/todos/types';


interface StateProps {
    todosState: TodosState
}

interface DispatchProps {
    createTodoRequest(todo: Todo): void;
}

interface LocalProps {
    addTodo: Todo;
}

type Props = StateProps & DispatchProps;

class AddTodoComponent extends Component<Props, LocalProps> {

    constructor(props) {
        super(props);
        this.state = {
            addTodo: {
                text: '',
                isCompleted: false,
                urgency: 1
            }
        }
    }

    // addTodo: Todo = {
    //     text: null,
    //     isCompleted: false,
    //     urgency: 1
    // }

    subimit(event) {
        const { createTodoRequest } = this.props;
        event.preventDefault();
        createTodoRequest(this.state.addTodo);
        this.resetModel();
    }

    resetModel() {
        this.setState(() => ({
            addTodo: {
                isCompleted: false,
                text: '',
                urgency: 1
            }
        }));
    }

    handleModelChange(key, value) {
        const addTodo = Object.assign(this.state.addTodo, { [key]: value });
        this.setState(() => ({ addTodo }))
    }

    async componentDidMount() {
    }

    render() {
        const { todosState } = this.props;
        const { addTodo } = this.state;
        return <div className="add-container">
            <div className="title"> The Unreliable TODO </div>
            <form className="form" onSubmit={this.subimit.bind(this)}>
                <div className="add-field">
                    <input type="text" placeholder="Add a todo here!" value={addTodo.text} required onChange={(event) => this.handleModelChange('text', event.target.value)} />
                </div>
                <div className="details">
                    <label className="input-holder">
                        Did you finished it?
                                <input type="checkbox" checked={addTodo.isCompleted} onChange={(event) => this.handleModelChange('isCompleted', event.target.checked)} />
                    </label>

                    <label className="input-holder">
                        {addTodo.isCompleted ? 'How tough it was?' : 'How tough it is?'}
                        <input className={'range-' + addTodo.urgency} type="range" required min="1" max="5" value={addTodo.urgency.toString()} onChange={(event) => this.handleModelChange('urgency', parseInt(event.target.value))} />
                        <div className={addTodo.urgency >= 5 ? 'redux' : null}>{addTodo.urgency >= 5 ? 'Redux-Saga Level' : addTodo.urgency}</div>
                    </label>
                </div>
                <button type="submit">
                    Add Todo
                        </button>
                {todosState.error === ErrorTypes.ADD && <div className="error"> I'm bevahing like a Spring Boot server right now, try again and think Node! </div>}
            </form>
        </div>;
    }
}

const mapStateToProps = ({ todosState }: ApplicationState) => ({
    todosState
});


const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoComponent);