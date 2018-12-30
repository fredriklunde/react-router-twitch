import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';
import SecretRoute from './SecretRoute';


class App extends React.Component {
    render(){
        return(
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <SecretRoute path="/streams/new" exact component={StreamCreate} />
                        <SecretRoute path="/streams/edit/:id" exact component={StreamEdit} />
                        <SecretRoute path="/streams/delete/:id" exact component={StreamDelete} />
                        <Route path="/streams/:id" exact component={StreamShow} />  
                    </Switch>
                </div>
            </Router>
        </div>
    )
    }
   
}

export default App;
