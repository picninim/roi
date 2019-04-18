import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApplicationState } from '../../store';
import { Todo, TodosState, ErrorTypes } from '../../store/todos/types';

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

interface LocalState {
    sortBy: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class Todosomponent extends Component<Props, LocalState> {

    constructor(props) {
        super(props);

        this.state = {
            sortBy: 'created'
        }
    }

    sortby(a, b, key: string) {
        if (a[key] < b[key]) {
            return 1;
        }
        if (a[key] > b[key]) {
            return -1;
        }
        return 0;
    }

    printTodos(todos: Todo[]) {
        todos.sort((a, b) => this.sortby(a, b, this.state.sortBy));
        return todos.map(todo =>
            <TodoComponent key={todo.id} todo={todo} />
        )
    }

    async componentDidMount() {
        const { getAllRequest } = this.props;
        getAllRequest();
    }

    render() {
        const { todosState, getAllRequest } = this.props;
        const { sortBy } = this.state;
        return (
            <div>
                {
                    todosState.error === ErrorTypes.GET &&
                    <div className="todo">
                        <div className="error"> I'm really unreliable! try I can, luckly I bring your TODSs list </div>
                        <button onClick={() => { getAllRequest() }}> Try  </button>
                    </div>
                }
                <div className="sort">
                    <label>
                        Order by:
                        <select defaultValue={sortBy} onChange={(event) => this.setState({ sortBy: event.target.value })} >
                            <option value="created"> Created Date </option>
                            <option value="text"> Name </option>
                        </select>
                    </label>
                </div>
                {
                    todosState.error !== ErrorTypes.GET && todosState.data.length <= 0 &&
                    <div className="todo"> You don't have todos! Great go watch GOT! &#x1F60E; </div>
                }
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