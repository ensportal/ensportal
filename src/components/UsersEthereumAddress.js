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
            ensName: "No Web3 Address Detected!",
            address: "0x0000000000000000000000000000000000000000"
        }

        this.getEnsName = this.getEnsName.bind(this)
    }

    async componentDidMount()
    {
        await this.getEnsName()
    }

    truncate(addr)
    {
        return `${addr.substring(0,6)}...${addr.substring(addr.length-4, addr.length)}`;
    }

    async getEnsName()
    {
        if(this.props.web3.userAddress !== undefined) {
            const ensName = await this.props.web3.provider.lookupAddress(this.props.web3.userAddress).then(function(address) {
                return address;
            })

            this.setState({
                ensName: ensName,
                address: this.props.web3.userAddress
            })
        }
    }

    render()
    {
        return(
            <Container>
                {
                    this.props.web3.userAddress !== undefined || this.props.web3.userAddress !== null
                    ?
                        <Identifier
                            address={this.state.address}
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