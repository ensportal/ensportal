import React, { Component } from 'react';

import { Button, Icon, Tooltip } from '@mycrypto/ui';
import styled from 'styled-components';
import Moment from 'react-moment';

import Config from '../Config.json'
import EnsBaseRegistrarAbi from '../contracts/EthBaseRegistrar.json'

import { ethers } from 'ethers';

const Container = styled.div`
    width: 400px;
    display: inline-block;
    border: 2px solid ${props => props.available ? props => props.theme.actionPanelBorder : "#ef5353"};
    border-radius: 5px;
    padding: 0.5em;
    margin: 1em;
    background: ${props => props.theme.actionPanelBackground};

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
    color: ${props => props.theme.text};

    > label {
        font-weight: 600;
    }
`

const RootDomain = styled.span`
    color: ${props => props.theme.text};
    font-family: monospace;
`
const Availability = styled.span`
    background: ${props => props.available ? props.theme.actionPanelBorder : "#ef5353"};
    color: ${props => props.available ? props.theme.cardText : "#fff"};
    font-weight: 600;
    text-transform: capitalize;
    font-size: 8pt;
    margin-right: 1em;
    padding: 0.5em;
`
const SmallText = styled.div`
    font-size: 6pt;
    color: ${props => props.theme.text};
    text-align: left;
`
const BuyButton = styled(Button)`
    width: 100%;
    margin-bottom: 15px;
    font-size: 17px;
    text-align: center;
    white-space: nowrap;

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
        cursor: ${props => props.available ? "hand" : "not-allowed"};
        ${props => props.free 
            ? 
                `
                background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
                background-size: 1800% 1800%;
    
                -webkit-animation: rainbow 5s ease infinite;
                -z-animation: rainbow 5s ease infinite;
                -o-animation: rainbow 5s ease infinite;
                animation: rainbow 5s ease infinite;}
    
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
`
const AddInfoIcon = styled(Icon)`
    vertical-align: sub;
`
const AddInfoValue = styled.span`
    vertical-align: middle;
`
const AddInfoLabel = styled.label`
    margin-right: 0.5em;
    margin-left: 0.25em;
    vertical-align: middle;
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
        const BaseRegistrar = new ethers.Contract(Config.ens.baseRegistrarImplementationAddress, EnsBaseRegistrarAbi, ethers.getDefaultProvider())
        const nameExpires = await BaseRegistrar.nameExpires(this.props.nftid)        

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
                    <RootDomain>{[this.props.subdomain,this.props.name,Config.ens.tld].join(".")}</RootDomain>
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
                     
                    <Tooltip tooltip={`This is when the name ${[this.props.name,Config.ens.tld].join(".")} expires. Anyone can extend the life of it.`}>
                        <AddInfoIcon icon="shape" />
                        <AddInfoLabel>Renew in:</AddInfoLabel>
                        <AddInfoValue>
                            <Moment unix durationFromNow>{this.state.expire}</Moment>
                        </AddInfoValue>
                    </Tooltip>

                    <br />

                    <SmallText>erc721 id: {this.props.nftid}</SmallText>
                    <SmallText>referral fee: {(this.props.referral/1000000)*100}%</SmallText>
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