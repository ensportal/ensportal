import React, { Component } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers'

import { Address } from '@mycrypto/ui'

const Container = styled.div`
    padding: 1em;
    display: block;
    margin-top: 2em;
`;

class UsersEthereumAddress extends Component 
{
    constructor()
    {
        super()
        this.getEnsName()

        this.state = {
            ensName: null
        }
    }

    truncate(addr)
    {
        return `${addr.substring(0,6)}...${addr.substring(addr.length-4, addr.length)}`;
    }

    async getEnsName()
    {
        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const ensName = await provider.lookupAddress(provider._web3Provider.selectedAddress).then(function(address) {
            return address;
        })
        
        this.setState({
            ensName: ensName
        })
    }

    render()
    {
        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

        return(
            <Container>
                <Address
                    address={provider._web3Provider.selectedAddress}
                    title={this.state.ensName == null ? "Your Address" : this.state.ensName}
                    truncate={this.truncate}
                    isCopyable={false}
                    disableCopyableTooltip={true}
                />
            </Container>
        );
    }
}


export default UsersEthereumAddress;