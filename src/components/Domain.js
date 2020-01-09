import React, { Component } from 'react';

import { Button  } from '@mycrypto/ui';
import styled from 'styled-components';
import Moment from 'react-moment';

import Config from '../Config.json'
//import EnsBaseRegistrarAbi from '../contracts/EnsBaseRegistrar.json' @todo - get the artifact

import { default as contract } from 'truffle-contract';

const Container = styled.div`
    width: 400px;
    display: inline-block;
    border: 2px solid ${props => props.available ? "#000" : "#ef5353"};
    border-radius: 5px;
    padding: 0.5em;
    margin: 1em;

    opacity: ${props => props.available ? 1 : 0.5};
    
    @media (max-width: 799px) {
        width: 100%;
        display: block;    
        margin-left: auto;
        margin-right: auto;
    }
`;
const DomainView = styled.div`
    font-family: monospaced;
    min-height: 150px;
`;
const AdditionalInfo = styled.div`
    margin-top: 1em;
    color: #292929;

    > label {
        font-weight: 600;
    }
`

const RootDomain = styled.span`
    color: #424242;
`
const Availability = styled.span`
    background: ${props => props.available ? "#000" : "#ef5353"};
    color: #FFF;
    font-weight: 600;
    text-transform: capitalize;
    font-size: 8pt;
    margin-right: 1em;
    padding: 0.5em;
`
const NftId = styled.span`
    font-size: 6pt;
    color: #aaa;
    text-align: center;
`
const BuyButton = styled(Button)`
    width: 315px;
    margin-bottom: 15px;
    font-size: 17px;
    text-align: center;
    white-space: nowrap;

    @media (min-width: 700px) {
        width: 230px;
    }

    ${props => props.free 
        ? 
            `
            background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
            background-size: 1800% 1800%;

            -webkit-animation: rainbow 18s ease infinite;
            -z-animation: rainbow 18s ease infinite;
            -o-animation: rainbow 18s ease infinite;
            animation: rainbow 18s ease infinite;}

            @-webkit-keyframes rainbow {
                0%{background-position:0% 82%}
                50%{background-position:100% 19%}
                100%{background-position:0% 82%}
            }
            @-moz-keyframes rainbow {
                0%{background-position:0% 82%}
                50%{background-position:100% 19%}
                100%{background-position:0% 82%}
            }
            @-o-keyframes rainbow {
                0%{background-position:0% 82%}
                50%{background-position:100% 19%}
                100%{background-position:0% 82%}
            }
            @keyframes rainbow { 
                0%{background-position:0% 82%}
                50%{background-position:100% 19%}
                100%{background-position:0% 82%}
            }
            `
        :
            ``
    }

    &:hover {
        cursor: ${props => props.available ? "default" : "not-allowed"};
    }
`

class Domain extends Component {

    constructor()
    {
        super();
        this.state = {
            expire: null
        };
    }

    async componentDidMount()
    {
        //const BaseRegistrar = new contract(Config.ens.baseRegistrarImplementationAddress, EnsBaseRegistrarAbi)
        const nameExpires = 1588550400 //await BaseRegistrar.nameExpires(this.props.id)        

        this.setState({
            expire: nameExpires
        });
    }

    async buySubDomain(domain, subdomain, item, info)
    {
        
    }

    renderView()
    {
        return(
            <DomainView>
                <h3>
                <Availability available={this.props.available}>{this.props.available ? "AVAILABLE" : "UNAVAILABLE"}</Availability>
                    <RootDomain>{[this.props.subdomain,this.props.name,Config.settings.tld].join(".")}</RootDomain>
                </h3>
                {
                this.props.available
                    ? <BuyButton primary available={this.props.available} free={this.props.price == 0 ? true : false}>
                        {this.props.price == 0 ? `Get it for FREE` : `🛒 Buy for ${this.props.price}ETH`}
                      </BuyButton>
                    : <BuyButton available={this.props.available}>Unavailable</BuyButton>
                }
                <AdditionalInfo>
                    {/* <label>Number of Subdomains:</label> {this.props.subdomainCount} <br /> */}
                    <label>Valid for:</label> <Moment unix durationFromNow>{this.state.expire}</Moment> <br />
                    <NftId>erc721 id: {this.props.nftid}</NftId>
                </AdditionalInfo>
            </DomainView>
        )
    }

    render()
    {
        return(
            <Container available={this.props.available}>
                {this.renderView()}
            </Container>
        );
    }

}


export default Domain;