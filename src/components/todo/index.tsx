import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApplicationState } from '../../store';
import { Todo } from '../../store/todos/types';


interface StateProps {
}

interface DispatchProps {
}

interface OwnProps {
    todo: Todo
}

type Props = StateProps & DispatchProps & OwnProps;

class TodoComponent extends Component<Props> {

    async componentDidMount() {
    }

    render() {
        const { todo } = this.props;
        return (
            <li> {todo.text} </li>
        )
    }
}

const mapStateToProps = ({ }: ApplicationState) => ({});


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);