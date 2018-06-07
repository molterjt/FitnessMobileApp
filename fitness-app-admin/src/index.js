import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import WorkoutList from './components/WorkoutList';
import GroupFitClassList from './components/GroupFitClassList';
import ExerciseList from './components/ExerciseList';
import UserLIst from './components/UserLIst';
import CommentList from './components/CommentList';
import InstructorList from './components/InstructorList';
import TrainerList from './components/TrainerList';

const httpLink = new HttpLink({uri: "https://api.graph.cool/simple/v1/cjf6zsqxj3n420141z09rpv9j"});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path='/' component={App} />
                <Route exact path={'/workouts'} component={WorkoutList} />
                <Route exact path={'/exercises'} component={ExerciseList} />
                <Route exact path={'/groupfitclasses'} component={GroupFitClassList} />
                <Route exact path={'/userlist'} component={UserLIst} />
                <Route exact path={'/comments'} component={CommentList} />
                <Route exact path={'/instructors'} component={InstructorList} />
                <Route exact path={'/trainers'} component={TrainerList} />
            </div>
        </Router>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
