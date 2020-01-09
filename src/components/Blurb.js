import React, { Component } from 'react';
import styled from 'styled-components';

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
                <h3>Why?</h3>
                <p>
                    Getting a subdomain means you won't have to remember your long hexidecimal blockchain 
                    address. Instead, you can be identified with a human-readable and memorable name - like  {' '}
                    <code>ensportal.eth</code>. If you change your mind about a domain, then you can choose another one 
                    to be identified by.   
                </p>       
                <p>
                    With an ENS name, you can <Link href="https://medium.com/the-ethereum-name-service/ens-launches-multi-coin-support-15-wallets-to-integrate-92518ab20599" target="_blank">attach different blockchain addresses</Link> to it to make your human {' '}
                    friendly wallet name work across blockchains (depending on your wallet software). This has great benefits {' '}
                    as you can just keep one human-readable name to tell people to send money to!
                </p>         
                <h3>Cost?</h3>
                <p>
                    The cost varies between domains - but we keep the cost low! When you select 
                    a (sub)domain to be identified by you will see some statistics about the domain 
                    to help you make your mind.   
                </p>
            </Container>
        );
    }
}


export default Blurb;