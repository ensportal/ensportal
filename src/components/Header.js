import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: block;
    box-sizing: border-box;
`;
const Heading = styled.h1`
    display: inline-block;
    padding-right: 0.5em;
`;
const PoweredBy = styled.span`
    display: inline-block;
`
const ProductStage = styled.span`
    color: #dd2e2e;
    font-size: 50%;
    text-transform: uppercase;
    margin-left: 1em;
`
const Slogan = styled.span`
    display: block;
    margin-bottom: 2em;
    width: 40%;
`;

class Header extends Component {
  render() {
    return (
        <HeaderContainer>
            <Heading>
                ENSPortal
            </Heading>

            <PoweredBy>Built on Ethereum</PoweredBy>
            <ProductStage>unaudited, still being built - use at own risk!</ProductStage>

            <Slogan>
                Get a vanity name for your blockchain addresses at a very low cost!
            </Slogan>

        </HeaderContainer>
    );
  }
}

export default Header;