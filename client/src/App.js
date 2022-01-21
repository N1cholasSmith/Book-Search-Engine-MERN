import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// setting up apollo client to talk to the backend
const client = new ApolloClient({
  // server
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Conneting to ApolloProvider Client so anything below the client in the tree can use the query hook
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </ApolloProvider>
  );
}

export default App;
