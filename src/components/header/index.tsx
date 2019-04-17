import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';

import { ApplicationState } from '../../store';
import { UserSession, UserSessionState } from '../../store/userSession/types';

import * as UserSessionActions from '../../store/userSession/actions';


interface StateProps {
    // userSessionState: UserSessionState;
    userSessionState: UserSessionState
}

interface DispatchProps {
    loginRequest(errorRate?: number): void;
    updateErrorRate(errorRate: number): void;
    logoutRequest(): void;
}

type Props = StateProps & DispatchProps;

class HeaderComponent extends Component<Props> {

    async componentDidMount() {
        const { loginRequest, logoutRequest } = this.props;
        await loginRequest();
        setTimeout(() => {
            // logoutRequest();
        }, 5000)
    }

    render() {
        const { userSessionState } = this.props;
        return (
            <div>
                <div className="header"> {userSessionState.data ? userSessionState.data.sessionId : 'Not Logged'} </div>

                {userSessionState.data && <div className="header"> {userSessionState.data.errorRate} </div>}
            </div>
        )
    }
}

const mapStateToProps = ({ userSessionState }: ApplicationState) => ({
    userSessionState
});


const mapDispatchToProps = dispatch => bindActionCreators(UserSessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);