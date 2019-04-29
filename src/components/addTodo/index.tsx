import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';

import './styles.css';

import { ApplicationState } from '../../store';
import * as TodoActions from '../../store/todos/actions';
import { Todo, TodosState, ErrorTypes } from '../../store/todos/types';
import ToughnessComponent from '../toughness';
import CompletenessComponent from '../completeness';


interface StateProps {
    todosState: TodosState
}

interface DispatchProps {
    createTodoRequest(todo: Todo): void;
}

interface LocalState {
    addTodo: Todo;
}

type Props = StateProps & DispatchProps;

class AddTodoComponent extends Component<Props, LocalState> {

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

    subimit(event) {
        const { createTodoRequest } = this.props;
        event.preventDefault();
        createTodoRequest(this.state.addTodo);
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

    componentWillUpdate(nextProps: Props, nextState: LocalState) {
        const { todosState } = this.props;
        const { addTodo } = this.state;
        const _addTodo = JSON.stringify(addTodo);
        const nextAdTodo = JSON.stringify(nextState.addTodo);
        // *TODO Make a single loadingstate and error Handling
        if (todosState.loading && !nextProps.todosState.error && !nextProps.todosState.loadingTodo) {

            this.resetModel();
        }
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
                    <CompletenessComponent value={addTodo.isCompleted} onChange={(value) => { this.handleModelChange('isCompleted', value) }}></CompletenessComponent>
                    <ToughnessComponent value={addTodo.urgency} complete={addTodo.isCompleted} onChange={(value) => { this.handleModelChange('urgency', value) }} ></ToughnessComponent>
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