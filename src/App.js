import React, { Component } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import { light, dark } from '@mycrypto/ui'
import Header from './components/Header'
import Search from './components/Search'
import Footer from './components/Footer'
import ThemeSwitch from './components/ThemeSwitch'
import UsersEthereumAddress from './components/UsersEthereumAddress'
import NoWeb3 from './components/NoWeb3'
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

      let themeIsLight = localStorage.getItem('themeIsLight') !== null ? localStorage.getItem('themeIsLight') : true;
      themeIsLight = (themeIsLight == 'true' || themeIsLight === true) ? true : false;

      this.state = {
          theme_light: themeIsLight,
          web3: {
            provider: null,
            signer: null,
            userAddress: null
          }
      };

      this.changeTheme = this.changeTheme.bind(this)
      this.getWeb3 = this.getWeb3.bind(this)
  }

  changeTheme()
  {
    localStorage.setItem('themeIsLight', this.state.theme_light ? false : true)
    this.setState({
      theme_light: this.state.theme_light ? false : true
    });
  }

  async getWeb3()
  {
    if (typeof window.ethereum !== 'undefined') {
      let web3prov = new ethers.providers.Web3Provider(window.ethereum)
      try {
        await window.ethereum.enable()

        setTimeout(function() {
          console.log(`Enabled window.ethereum - userAddress ${web3prov.provider.selectedAddress}`);
          this.setState({
            web3: {
              provider: web3prov,
              signer: null,
              userAddress: web3prov.provider.selectedAddress
            }
          })
        }.bind(this), 1000)

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    } else if (typeof window.web3 !== 'undefined') {
      let web3prov = new ethers.providers.Web3Provider(window.web3)

      this.setState({
        web3: {
          provider: web3prov,
          signer: null,
          userAddress: web3prov.provider.selectedAddress
        }
      })

      return true

    } else {
      return false
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme_light ? light : dark}>
          <AppContainer>
              <TopRight>
                <ThemeSwitch changeTheme={this.changeTheme} theme_light={this.state.theme_light ? true : false}/>
                <UsersEthereumAddress web3={this.state.web3} address={this.state.web3.userAddress} />
              </TopRight>
              <Header />
              {
                this.state.web3.userAddress !== null
                ?
                  <Search web3={this.state.web3} />
                :
                  <NoWeb3 onClick={this.getWeb3} />
              }
            </AppContainer>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;