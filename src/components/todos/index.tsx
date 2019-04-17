import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApplicationState } from '../../store';
import { Todo, TodosState } from '../../store/todos/types';

import * as TodosActions from '../../store/todos/actions';

import TodoComponent from '../todo';
import { UserSessionState } from '../../store/userSession/types';



interface StateProps {
    todosState: TodosState
    userSessionState: UserSessionState
}

interface DispatchProps {
    getAllRequest(): void
}

interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps;

class Todosomponent extends Component<Props> {

    async componentDidMount() {
        const { getAllRequest } = this.props;
        getAllRequest();
    }

    render() {
        const { todosState, userSessionState } = this.props;
        console.log(todosState.data);
        return (
            userSessionState.data && <TodoComponent todo={{
                text: 'asdasd',
                urgency: 5,
                isCompleted: true
            }} />
        )
    }
}

const mapStateToProps = ({ todosState, userSessionState }: ApplicationState) => ({
    todosState, userSessionState
});


const mapDispatchToProps = dispatch => bindActionCreators(TodosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todosomponent);