import React, { Component } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { light, dark } from '@mycrypto/ui';
import Header from './components/Header';
import Search from './components/Search';
import Footer from './components/Footer';
import ThemeSwitch from './components/ThemeSwitch';

const AppContainer = styled.div`
  padding: 1em;
  background: ${props => props.theme.panelBackground};
  color: ${props => props.theme.text};
  min-height: 90vh;
`
const TopRight = styled.div`
  right: 1em;
  position: absolute;
`

class App extends Component {

  constructor()
  {
      super()
      this.state = {
          theme_light: true
      };

      this.changeTheme = this.changeTheme.bind(this);
  }

  async componentDidMount()
  {

  }

  changeTheme()
  {
    this.setState({
      theme_light: this.state.theme_light ? false : true
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme_light ? light : dark}>
        <AppContainer>
            <TopRight>
              <ThemeSwitch changeTheme={this.changeTheme} theme_light={this.state.theme_light ? true : false}/>
            </TopRight>
            <Header />
            <Search />
        </AppContainer>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;