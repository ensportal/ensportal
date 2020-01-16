import React, { Component } from 'react';
import styled from 'styled-components';

import { Address } from '@mycrypto/ui'

const Container = styled.div`
    padding: 1em;
    display: block;
    margin-top: 2em;
`;
const Identifier = styled(Address)`
    // @todo - resizing
`

class UsersEthereumAddress extends Component 
{
    constructor()
    {
        super()
        this.state = {
            ensName: "",
            address: "0x0000000000000000000000000000000000000000"
        }
        this.getEnsName = this.getEnsName.bind(this)
    }

    async componentDidUpdate()
    {
        if(this.props.address === null) {
            return;
        }

        await this.getEnsName()
    }

    truncate(addr)
    {
        return `${addr.substring(0,6)}...${addr.substring(addr.length-4, addr.length)}`;
    }

    async getEnsName()
    {
        if(this.props.address === this.state.address) {
            return;
        }

        console.log(`Resolving ${this.props.address} address to ENS name`)
        const ensName = await this.props.web3.provider.lookupAddress(this.props.address).then(function(address) {
            return address;
        })

        this.setState({
            ensName: ensName,
            address: this.props.address
        })
    }

    render()
    {
        return(
            <Container>
                {
                    this.props.address !== null
                    ?
                        <Identifier
                            address={this.props.address}
                            title={this.state.ensName == null ? "Your Address" : this.state.ensName}
                            truncate={this.truncate}
                            isCopyable={false}
                            disableCopyableTooltip={true}
                        />
                    :
                        ``
                }
            </Container>
        );
    }
}


export default UsersEthereumAddress;