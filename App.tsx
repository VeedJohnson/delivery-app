import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'; //using apolloclient to fetch the data from the stepzen backend
import RootNavigator from './navigator/RootNavigator';

const client = new ApolloClient({
  uri: 'http://localhost:5001/api/eager-shark',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    //@ts-ignore - TailwindProvider
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
