import React from 'react';
import { AsyncStorage,View } from 'react-native';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import AUTH_TOKEN from './util/keys';
import FitnessApp from './FitnessApp';
import {GRAPHQL_ENDPOINT} from './util/keys';
import { setContext } from 'apollo-link-context';
import {SafeAreaView} from 'react-navigation';


let token;

const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT
});

export const getToken = async () => {
    if(token){
        return Promise.resolve(token);
    }
    token = await AsyncStorage.getItem(AUTH_TOKEN).valueOf();
};


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

const cache = new InMemoryCache({
    dataIdFromObject: object => object.key || null
});

export const client = new ApolloClient({
    link: httpAuthLink,
    cache: cache,
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


