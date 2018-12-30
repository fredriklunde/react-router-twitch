import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class SecretRoute extends React.Component {
    render() {
        const {
          isSignedIn,
          component: Component,
          ...rest
        } = this.props;
        
        return(
            <Route {...rest} render={(props) => (
                isSignedIn !== null
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                  }} />
            )} />
          );
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(SecretRoute);