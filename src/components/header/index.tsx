import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction } from 'redux';

import { ApplicationState } from '../../store';
import { UserSession, UserSessionState } from '../../store/userSession/types';

import * as UserSessionActions from '../../store/userSession/actions';
import { LoginBody } from '../../store/userSession/saga';


interface StateProps {
    // userSessionState: UserSessionState;
    userSessionState: UserSessionState
}

interface DispatchProps {
    loginRequest(body?: LoginBody): void;
    updateErrorRate(body?: LoginBody): void;
}

interface OwnProps {

}

type Props = StateProps & DispatchProps & OwnProps;

class HeaderComponent extends Component<Props> {

    async componentDidMount() {
        const { loginRequest, updateErrorRate } = this.props;
        await loginRequest();
        setTimeout(() => {
            console.log('asdasd');
            updateErrorRate({ errorRate: 2 });
        }, 5000)
        console.log(this.props.userSessionState);
    }

    render() {
        console.log(this.props);
        const { userSessionState } = this.props;
        return (
            <div>
                <div className="header"> {userSessionState.data ? userSessionState.data.sessionId : 'annomos'} </div>

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