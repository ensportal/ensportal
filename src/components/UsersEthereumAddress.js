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
        this.state = {
            ensName: "No Web3 Address Detected!",
            address: "0x0000000000000000000000000000000000000000"
        }

        this.getEnsName()
    }

    truncate(addr)
    {
        return `${addr.substring(0,6)}...${addr.substring(addr.length-4, addr.length)}`;
    }

    async getEnsName()
    {
        if(window.web3.currentProvider) {
            const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
            if(provider._web3Provider.selectedAddress !== undefined) {
                const ensName = await provider.lookupAddress(provider._web3Provider.selectedAddress).then(function(address) {
                    return address;
                })
                
                this.setState({
                    ensName: ensName,
                    address: provider._web3Provider.selectedAddress
                })
            }
        } 

        // if(this.state.address === null) {
        // an infinite loop on metamask address change and single page refresh
        //     console.log("RErunning");
        //     await this.getEnsName();
        // }
    }

    render()
    {
        return(
            <Container>
                <Address
                    address={this.state.address}
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