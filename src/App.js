import React, { Component } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { light, dark } from '@mycrypto/ui';
import Header from './components/Header';
import Search from './components/Search';
import Footer from './components/Footer';

const AppContainer = styled.div`
  padding: 1em;
`

class App extends Component {

  async componentDidMount()
  {

  }

  render() {
    return (
      <ThemeProvider theme={light}>
        <AppContainer>
            <Header />
            <Search />
        </AppContainer>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;