import React, { Component } from 'react'
import styled from 'styled-components'
import { Drawer, Heading } from '@mycrypto/ui'

import Confetti from 'react-confetti'


import LogoMyCrypto from '../images/compatible/mycrypto.png'
import LogoAmbo from '../images/compatible/ambo.png'
import LogoEtherscan from '../images/compatible/etherscan.png'
import LogoAragon from '../images/compatible/aragon.png'
import LogoMetaMask from '../images/compatible/metamask.png'
import LogoTruffle from '../images/compatible/truffle.png'

const Container = styled(Drawer)`
    padding: 0.5em 2em;
`
const Text = styled.p`
    padding: 0.5em;
    color: ${props => props.theme.text}
`
const CompatibleExamples = styled.div`

    > img {
        height: 100px;
        width: 100px;
        display: inline-block;
        padding: 0.5em;
    }
`

class DomainBought extends Component 
{
    constructor()
    {
        super()
        this.confettiCan = React.createRef();
    }

    render()
    {
        return(
            <Container headerTitle="🎉" headerText="Your transaction is pending!">
                <Confetti
                    width="370px"
                    height="170px"
                />
                <Text>
                    You will soon be the owner of <code>{this.props.name}</code>! This means{' '}
                    you can use your ENS name on the following interfaces 
                    (<a href="https://medium.com/the-ethereum-name-service/50-wallets-signed-up-growing-dweb-trufflesuite-more-ens-ecosystem-update-23be948e23ca" target="_blank" rel="noopener noreferrer">and {' '}
                    more!</a>)
                </Text>

                <CompatibleExamples>
                    <img src={LogoMyCrypto} alt="MyCrypto Logo" title="MyCrypto.com" />
                    <img src={LogoAmbo} alt="Ambo Logo" title="Ambo.io" />
                    <img src={LogoEtherscan} alt="Etherscan Logo" title="Etherscan.io" />
                    <img src={LogoAragon} alt="Aragon Logo" title="Aragon.org" />
                    <img src={LogoMetaMask} alt="MetaMask Logo" title="Metamask.io" />
                    <img src={LogoTruffle} alt="Truffle Logo" title="trufflesuite.com" />
                </CompatibleExamples>

                <Heading as="h3" style={{padding: '0.5em'}}>
                    Manage your Name
                </Heading>

                <Text>
                    You can manage your name at <a href={"https://app.ens.domains/name/" + this.props.name} target="_blank" rel="noopener noreferrer">app.ens.domain</a>{' '}
                    and add your other blockchain addresses &mdash; one ENS name for all your addresses, easy to remember!
                </Text>

                <Heading as="h3" style={{padding: '0.5em'}}>
                    Join the crowd!
                </Heading>

                <Text>
                    Advertise your cool new name on Twitter and other social media platforms!
                </Text>
                <ul style={{padding: '0.5em'}}>
                    <li>
                        <a href={"https://twitter.com/intent/tweet/?text=" + `I just bought ${this.props.name} from ENSPortal.com! No need long hexidecimal addresses when you have %23ENS`} target="_blank" rel="noopener noreferrer">
                        Tweet about your name!
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/settings/profile" target="_blank" rel="noopener noreferrer">
                            Set your Twitter name to <strong>{this.props.name}</strong>
                        </a>
                    </li>
                </ul>
            </Container>
        )
    }
}


export default DomainBought;