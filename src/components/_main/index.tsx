import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApplicationState } from '../../store';
import * as TodosActions from '../../store/todos/actions';

import { UserSessionState } from '../../store/userSession/types';
import HeaderComponent from '../header';
import TodosComponent from '../todos';
import AddTodoComopnent from '../addTodo';


interface StateProps {
    userSessionState: UserSessionState
}

class MainComponent extends Component<StateProps> {

    render() {
        const { userSessionState } = this.props;
        return (
          <div className="main-container">
            <HeaderComponent />
            { userSessionState.data && <AddTodoComopnent /> }
            { userSessionState.data && <TodosComponent /> }
          </div>
        )
    }
}

const mapStateToProps = ({ userSessionState }: ApplicationState) => ({
    userSessionState
});


const mapDispatchToProps = dispatch => bindActionCreators(TodosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);