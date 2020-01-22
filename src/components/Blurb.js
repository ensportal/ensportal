import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Faq from './Faq'

const Container = styled.div`
`;
const Link = styled.a`
    color: ${props => props.theme.link};
    text-decoration: underline;
    text-decoration-style: dotted;
`
class Blurb extends Component 
{
    render()
    {
        return(
            <Container>       
                <Faq 
                    question="Why register a subdomain via ENSPortal?"
                    answer={[
                        `Getting a subdomain means you won't have to remember your long hexidecimal blockchain 
                        address. Instead, you can be identified with a human-readable and memorable name - like  ${' '}
                        <code>ensportal.eth</code>. If you change your mind about a domain, then you can choose another one 
                        to be identified by.`,
                        `It is cheaper - there is only a one time fee, then it's yours for life! If you were to register a ${' '}
                        top-level domain, you'd have to pay a variable price depending on length and commit to renewing it every year.`,
                        `You'll never have to remember to renew it! With ENSPortal, we tell you how long the domain will ${' '}
                        last for - usually for multiple years at one single cost (and anybody can fund a renewal of the domain when the time comes).`,
                        `With an ENS name, you can <a href="https://medium.com/the-ethereum-name-service/ens-launches-multi-coin-support-15-wallets-to-integrate-92518ab20599" target="_blank">attach different blockchain addresses</a> ${' '}
                        to it to make your human friendly wallet name work across blockchains (depending on your wallet software). This has great benefits ${' '}
                        as you can just keep one human-readable name to tell people to send money to!`
                    ]}
                />

                <Faq 
                    question="Can the owner of the top-level domain change my subdomains?"
                    answer={[
                        `No, all domains are locked in the ENSNow contract and can only be changed by the Controller (you).`,
                        `Only you (Controller) can change the addresses your subdomain points to, using the ENS app (app.ens.domains).`
                    ]}
                />                

                <Faq 
                    question="What is mulitcoin support?"
                    answer={[
                        `Using the ENS app (app.ens.domains), you can configure your domain to resolve to different addresses across multiple chains.`,
                        `Supported chains: ${["ETH", "BTC", "LTC", "DOGE", "MONA", "ETC", "RSK", "XRP", "BCH", "BNB"].join(", ")}.`,
                        `Read <a href="https://medium.com/the-ethereum-name-service/ens-launches-multi-coin-support-15-wallets-to-integrate-92518ab20599" target="_blank">the documentation</a> ${' '}
                        about how to add your other addresses to your name and what chains and wallets are supported.`
                    ]}
                />         

                <Faq 
                    question="What are the best practices if I am concerned about my privacy?"
                    answer={[
                        `Use a new address and seed some ETH from a mixer like Tornado.cash or from an exchange account like Binance.`,
                        `Never use an address that connects to any other address you’ve ever used.`
                    ]}
                />   
            </Container>
        );
    }
}


export default Blurb;