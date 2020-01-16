import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '@mycrypto/ui'

import MetaMaskPNG from '../images/metamask.png'

const Container = styled.div`
    padding: 1em;
`;
const ConnectButton = styled(Button)`
    display: block;
    margin-top: 0.5em;
`
const GetMetaMaskButton = styled(Button)`
    display: block;
    margin-top: 0.5em;

    > img {
        height: 30px;
        width: 30px;
        vertical-align: middle;
    }
`

class NoWeb3 extends Component 
{
    needToEnableWeb3()
    {
        if (typeof window.ethereum !== 'undefined') {
            return true;
        }
    }

    enabledWeb3ClientCopy()
    {
        return(
            <div>
                You need to enable your Web3 client
                <ConnectButton onClick={this.props.onClick}>Connect</ConnectButton>
            </div>
        )
    }

    getWeb3ClientCopy()
    {
        return(
            <div>
                You will need to get a Web3 client!
                <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                    <GetMetaMaskButton>
                        <img src={MetaMaskPNG} alt="MetaMask Logo" title="MetaMask" /> Get MetaMask
                    </GetMetaMaskButton>
                </a>
            </div>
        )
    }

    changeNetworkCopy()
    {
        return(
            <div>
                <p>You are on the wrong network! Please change to mainnet!</p>
            </div>
        )
    }

    render()
    {
        return(
            <Container>
                {
                    this.props.network === false
                    ? this.changeNetworkCopy()
                    : 
                        <div>
                            <h3>No Web3 detected :(</h3>
                            <div>
                                Please enable Web3 to use ENSPortal! {
                                    this.needToEnableWeb3() 
                                        ? this.enabledWeb3ClientCopy() 
                                        : this.getWeb3ClientCopy()
                                    }
                            </div>
                        </div>
                }
            </Container>
        );
    }
}


export default NoWeb3;