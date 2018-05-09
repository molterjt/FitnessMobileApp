import React from 'react';
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import { ApolloLink} from 'apollo-link';
import TabTabNavigator from './router';
import AUTH_TOKEN from './constants/auth';
import FitnessApp from './FitnessApp';
import {createRootNavigator} from './router'
import { setContext } from 'apollo-link-context';


let token;

const httpLink = new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjf6zsqxj3n420141z09rpv9j"
});

export const getToken = async () => {
    if(token){
        return Promise.resolve(token);
    }
    token = await AsyncStorage.getItem(AUTH_TOKEN).valueOf();
}


const authLink = setContext(async(req, {headers}) => {
    const token = await getToken();

    return{
        ...headers,
        headers: {
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const httpAuthLink = authLink.concat(httpLink);
export const client = new ApolloClient({
    link: httpAuthLink,
    cache: new InMemoryCache(),
});

/*
const middlewareAuthLink = new ApolloLink( (operation, forward) => {
    const token = AsyncStorage.getItem('token');
    const authorizationHeader = token ? `Bearer ${token}` : null;
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        },
    });
    return forward(operation);
});
*/

/*
const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);


const client = new ApolloClient({
   link: httpLinkWithAuthToken,
    cache: new InMemoryCache(),
});

*/

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <ApolloProvider client={client}>
            <FitnessApp/>
        </ApolloProvider>
    );
  }
}
export default App;


