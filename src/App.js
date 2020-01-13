import React, { Component } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import { light, dark } from '@mycrypto/ui'
import Header from './components/Header'
import Search from './components/Search'
import Footer from './components/Footer'
import ThemeSwitch from './components/ThemeSwitch'
import UsersEthereumAddress from './components/UsersEthereumAddress'

import { ethers } from 'ethers'

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
          theme_light: true,
          web3: {
            provider: null,
            signer: null,
            userAddress: null
          }
      };

      this.changeTheme = this.changeTheme.bind(this)
      this.getWeb3 = this.getWeb3.bind(this)
  }

  async componentDidMount()
  {
    await this.getWeb3();
  }

  async getWeb3()
  {
    if(window.web3) {
      const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
      this.setState({
        web3: {
          provider: provider,
          signer: provider.getSigner(0),
          userAddress: provider.provider.selectedAddress
        }
      });
    } else {
      const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/154ede9d229f4a1bb54f6fa80afbe920");
      this.setState({
        web3: {
          provider: provider,
          signer: null,
          userAddress: null
        }
      });      
    }
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
          {
            this.state.web3.userAddress !== null
            ?
              <AppContainer>
                <TopRight>
                  <ThemeSwitch changeTheme={this.changeTheme} theme_light={this.state.theme_light ? true : false}/>
                  <UsersEthereumAddress web3={this.state.web3} />
                </TopRight>
                <Header />
                <Search web3={this.state.web3} />
              </AppContainer>
            :
              <AppContainer>
                <Header />
                <p>No web3</p>
              </AppContainer>
          }
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;