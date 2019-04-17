import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';

import './styles.css';

import { ApplicationState } from '../../store';
import { UserSession, UserSessionState } from '../../store/userSession/types';

import * as UserSessionActions from '../../store/userSession/actions';
import { number } from 'prop-types';


interface StateProps {
    // userSessionState: UserSessionState;
    userSessionState: UserSessionState
}

interface DispatchProps {
    loginRequest(errorRate?: number): void;
    updateErrorRate(errorRate: number): void;
    logoutRequest(): void;
}

interface LocalState {
    errorRate: string;
}

type Props = StateProps & DispatchProps;

class HeaderComponent extends Component<Props, LocalState> {

    constructor(props) {
        super(props);
        
        this.state = {
            errorRate: ''
        }
    }

    async componentDidMount() {
        const { loginRequest, logoutRequest } = this.props;
        await loginRequest();
        setTimeout(() => {
            // logoutRequest();
        }, 5000)
    }

    render() {
        const { userSessionState, logoutRequest, loginRequest } = this.props;
        const { errorRate } = this.state;
        return (
            <div className="header">
                <div className="header-container">
                    <div> <span className="header-label">Session:</span> {userSessionState.data ? userSessionState.data.sessionId : 'Not Logged'} </div>
                    {userSessionState.data && <div> <span className="header-label">ErrorRate:</span> {userSessionState.data.errorRate} </div>}
                    <div>
                        {!userSessionState.data && <input value={errorRate} required onChange={ (event) => this.setState({errorRate: event.target.value}) } className="error-rate" placeholder="Error Rate?" type="number"/> }
                        <button className="button" onClick={ () => userSessionState.data  ? logoutRequest() : loginRequest( parseInt(errorRate)) }>
                            {userSessionState.data ? 'Logout' :  'Login'}
                        </button>
                    </div>
                   
                </div>
                {userSessionState.error && <div className="header-error"> Oops, did't work. Can you try again?</div>}
            </div>
        )
    }
}

const mapStateToProps = ({ userSessionState }: ApplicationState) => ({
    userSessionState
});


const mapDispatchToProps = dispatch => bindActionCreators(UserSessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);