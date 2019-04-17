import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApplicationState } from '../../store';
import { Todo } from '../../store/todos/types';
import * as TodoActions from '../../store/todos/actions';


interface StateProps {
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
        const { todo, deleteTodoRequest } = this.props;
        return (
            <li onClick={() => deleteTodoRequest(todo)}> {todo.text} </li>
        )
    }
}

const mapStateToProps = ({ }: ApplicationState) => ({});


const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);