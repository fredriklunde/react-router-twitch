import React from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';


const AuthService = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100)
    },
    logout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
  }

  const Private = () => (
    <div> This is a private page </div>
  );

  class Login extends React.Component {
    state = {
      redirectToPreviousRoute: false
    };
  
    login = () => {
      AuthService.authenticate(() => {
        this.setState({ redirectToPreviousRoute: true });
      });
    };
  
    render() {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { redirectToPreviousRoute } = this.state;
  
      if (redirectToPreviousRoute) {
        return <Redirect to={from} />;
      }
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
  }

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
                    <li><Link to='/private'> Private </Link></li>
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <SecretRoute path="/streams/new" isSignedIn={isSignedIn} exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delete/:id" exact component={StreamDelete} />
                        <Route path="/streams/:id" exact component={StreamShow} />  
                        <Route path="/login" exact component={Login} />  
                        <SecretRoute path='/private' isSignedIn={isSignedIn} component={Private} />
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
