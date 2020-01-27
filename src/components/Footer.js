import React, { Component } from 'react';
import styled from 'styled-components';
import MyCryptoLogo from '../images/mycrypto.png'

const Container = styled.div`
    bottom: 0;
    padding: 1em;
    color: ${props => props.theme.text};
    background: ${props => props.theme.controlBackground}
    border-top: 1px solid ${props => props.theme.controlBorder};

    > a {
        color: ${props => props.theme.link};
        text-decoration: underline;
        text-decoration-style: dotted;
    }
`;

const MyCryptoSupport = styled.div`
    vertical-align: middle;
    font-size: 80%;

    img {
        vertical-align: middle;
        height: 20px;
        width: 20px;
    }
`

class Footer extends Component 
{
    render()
    {
        return(
            <Container>
                ENSPortal - Run by <a href="https://twitter.com/kevingaspar" target="_blank" rel="noopener noreferrer">@kevingaspar</a> {' '}
                &amp; <a href="https://twitter.com/sniko_" target="_blank" rel="noopener noreferrer">Harry Denley</a> {' '}
                <br />
                <MyCryptoSupport>With support from <a href="https://mycrypto.com" target="_blank" rel="noopener noreferrer"><img src={MyCryptoLogo} alt="MyCrypto" title="MyCrypto" /></a></MyCryptoSupport>
                <small>USD prices fetched from <a href="https://nomics.com/" target="_blank" rel="noopener noreferrer">Nomics.com</a></small>
            </Container>
        );
    }
}


export default Footer;