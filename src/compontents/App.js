import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const SecretRoute = ({ component: Component, isSignedIn, ...rest }) => (
    <Route {...rest} render={(props) => (
        isSignedIn !== null
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
  );

  class App extends React.Component {
    render(){
        const isSignedIn = this.props.isSignedIn;
        return(
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <SecretRoute path="/streams/new" isSignedIn={isSignedIn} exact component={StreamCreate} />
                        <SecretRoute path="/streams/edit/:id" isSignedIn={isSignedIn} exact component={StreamEdit} />
                        <SecretRoute path="/streams/delete/:id" isSignedIn={isSignedIn} exact component={StreamDelete} />
                        <Route path="/streams/:id" exact component={StreamShow} />  
                    </Switch>
                </div>
            </Router>
        </div>
    )
    }
   
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(App);
