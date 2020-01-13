import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    bottom: 0;
    padding: 1em;
    max-height: 20px;
    color: ${props => props.theme.text};
    background: ${props => props.theme.controlBackground}
    border-top: 1px solid ${props => props.theme.controlBorder};

    > a {
        color: ${props => props.theme.link};
        text-decoration: underline;
        text-decoration-style: dotted;
    }
`;

class Footer extends Component 
{
    render()
    {
        return(
            <Container>
                ENSPortal - Run by <a href="https://twitter.com/kevingaspar" target="_blank" rel="noopener noreferrer">@kevingaspar</a> &amp; <a href="https://twitter.com/sniko_" target="_blank" rel="noopener noreferrer">Harry Denley</a>
            </Container>
        );
    }
}


export default Footer;