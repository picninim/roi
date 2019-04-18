import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css'

import { ApplicationState } from '../../store';
import { Todo, TodosState } from '../../store/todos/types';
import * as TodoActions from '../../store/todos/actions';


interface StateProps {
    todosState: TodosState
}

interface DispatchProps {
    deleteTodoRequest(todo: Todo): void
}

interface OwnProps {
    todo: Todo
}

type Props = StateProps & DispatchProps & OwnProps;

class TodoComponent extends Component<Props> {

    async componentDidMount() {
    }

    render() {
        const { todo, deleteTodoRequest, todosState } = this.props;
        return (
            <div className={`todo ${todo.isCompleted ? 'completed' : 'incompleted'}`} >
                {todo.text}
                <button onClick={() => deleteTodoRequest(todo)}>Remove</button>
                {todosState.errorDetails === todo.id && <div className="error"> Oops!! </div>}
            </div>
        )
    }
}

const mapStateToProps = ({ todosState }: ApplicationState) => ({ todosState });


const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);