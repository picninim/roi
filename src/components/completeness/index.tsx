import React, { Component } from 'react';

import './styles.css';


interface OwnProps {
    value: boolean,
    onChange?: (value) => any;
}


interface LocalState {
    errorRate: string;
}

export default class CompletenessComponent extends Component<OwnProps, LocalState> {

    componentDidMount() {
    }

    render() {
        const { value, onChange } = this.props;
        return (
            <label className="input-holder">
                Did you finish it?
                    <input type="checkbox" checked={value} onChange={(event) => onChange((event.target.checked))} />
            </label>
        )
    }
}