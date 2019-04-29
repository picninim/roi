import React, { Component } from 'react';

import './styles.css';


interface OwnProps {
    value: number,
    complete: boolean,
    onChange?: (value) => any;
}


interface LocalState {
    errorRate: string;
}

export default class ToughnessComponent extends Component<OwnProps, LocalState> {

    componentDidMount() {
    }

    render() {
        const { value, onChange, complete } = this.props;
        return (
            <label className="input-holder">
                {complete ? 'How tough was it?' : 'How tough is it?'}
                <input className={'range-' + value} type="range" required min="1" max="5" value={value.toString()} onChange={(event) => onChange(parseInt(event.target.value))} />
                <div className={value >= 5 ? 'redux' : null}>{value >= 5 ? 'Redux-Saga Level' : value}</div>
            </label>
        )
    }
}