import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css'

import { ApplicationState } from '../../store';
import { Todo, TodosState } from '../../store/todos/types';
import * as TodoActions from '../../store/todos/actions';

import moment from 'moment';
import ToughnessComponent from '../toughness';
import CompletenessComponent from '../completeness';


interface StateProps {
    todosState: TodosState
}

interface DispatchProps {
    deleteTodoRequest(todo: Todo): void,
    alterTodoRequest(todo: Todo): void
}

interface OwnProps {
    todo: Todo
}

interface LocalState {
    todoSnapshot: Todo,
    allowSave: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class TodoComponent extends Component<Props, LocalState> {

    constructor(props) {
        super(props);
        this.state = {
            todoSnapshot: null,
            allowSave: false
        }
    }

    handleModelChange(key, value) {
        const todoSnapshot = Object.assign(this.state.todoSnapshot, { [key]: value });
        this.setState(() => ({ todoSnapshot }))
    }

    cloneTodo(todo) {
        this.setState({ todoSnapshot: Object.assign({}, todo) })
    }

    componentDidMount() {
        this.cloneTodo(this.props.todo);
    }

    componentWillUpdate(nextProps: Props, nextState: LocalState) {
        const { todo, todosState } = this.props;
        const { allowSave } = this.state;
        const _todo = JSON.stringify(todo);
        const _todoSnapshot = JSON.stringify(nextState.todoSnapshot);
        // If model is differnt show save botton
        if (_todo !== _todoSnapshot && !allowSave) {
            this.setState({ allowSave: true })
        } else if (_todo === _todoSnapshot && allowSave) {
            this.setState({ allowSave: false })
        }
        // TODO * simplify to logic
        if (!nextProps.todosState.loading && todosState.loadingTodo === todo.id && !nextProps.todosState.error && _todo !== _todoSnapshot) {
            this.cloneTodo(nextProps.todo);
        }
    }

    render() {
        const { todo, deleteTodoRequest, todosState, alterTodoRequest } = this.props;
        const { todoSnapshot, allowSave } = this.state;
        return (
            <div>
                {
                    todoSnapshot &&
                    <div className={`todo ${todoSnapshot.isCompleted ? 'completed' : 'incompleted'}`} >
                        <div className="dates">
                            <div> Create at: <br /> {moment(todoSnapshot.created).format('L LTS')}</div>
                            <div> Update at: <br /> {moment(todoSnapshot.updated).format('L LTS')}</div>
                        </div>
                        <form className="form" onSubmit={(event) => { event.preventDefault(); alterTodoRequest(todoSnapshot) }}>
                            <input style={{ width: '100%' }} type="text" placeholder="Todos name" value={todoSnapshot.text} required onChange={(event) => this.handleModelChange('text', event.target.value)} />
                            <div className="details">
                                <CompletenessComponent value={todoSnapshot.isCompleted} onChange={(value) => { this.handleModelChange('isCompleted', value) }}></CompletenessComponent>
                                <ToughnessComponent value={todoSnapshot.urgency} complete={todoSnapshot.isCompleted} onChange={(value) => { this.handleModelChange('urgency', value) }} ></ToughnessComponent>
                            </div>
                            <div className="footer">
                                {allowSave && <div> <button type="submit">Save</button> <button onClick={() => this.cloneTodo(todo)}>Cancel</button> </div>}
                                {!allowSave && <button onClick={() => deleteTodoRequest(todo)}>Delete</button>}
                            </div>
                        </form>
                        {todosState.errorDetails === todo.id && <div className="error"> Oops!! </div>}
                    </div>
                }
            </div>

        )
    }
}

const mapStateToProps = ({ todosState }: ApplicationState) => ({ todosState });


const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);