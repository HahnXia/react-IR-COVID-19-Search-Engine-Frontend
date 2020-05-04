import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import MainPage from './pages/main-page/main-page.component';
import QueryPage from './pages/query-page/query-page.component';
import DocPage from './pages/doc-page/doc-page.component';

class App extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/query' component={QueryPage}/>
                <Route exact path='/doc' component={DocPage}/>
            </div>
        )
    }
}

export default App;
