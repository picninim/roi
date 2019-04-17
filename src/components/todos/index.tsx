import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApplicationState } from '../../store';
import { Todo, TodosState } from '../../store/todos/types';

import * as TodosActions from '../../store/todos/actions';

import TodoComponent from '../todo';

interface StateProps {
    todosState: TodosState
}

interface DispatchProps {
    getAllRequest(): void
}

interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps;

class Todosomponent extends Component<Props> {

    printTodos(todos: Todo[]) {
        return todos.map( todo =>
            <TodoComponent key={todo.id} todo={todo} />
        )
    }

    async componentDidMount() {
        const { getAllRequest } = this.props;
        getAllRequest();
    }

    render() {
        const { todosState } = this.props;
        console.log(todosState.data);
        return (
            <div>
                {this.printTodos(todosState.data)}
            </div>

        )
    }
}

const mapStateToProps = ({ todosState }: ApplicationState) => ({
    todosState
});


const mapDispatchToProps = dispatch => bindActionCreators(TodosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todosomponent);