import React, { Component } from 'react';

import { Button, Icon, Tooltip } from '@mycrypto/ui';
import styled from 'styled-components';
import Moment from 'react-moment';

import Config from '../Config.json'
import EnsBaseRegistrarAbi from '../contracts/EthBaseRegistrar.json'

import { ethers, utils } from 'ethers';

import DomainBought from './DomainBought';

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
    margin-left: ${props => props.userOwnsIt ? '1em' : 0}
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
            expire: {
                fetched: false,
                timestamp: null
            },
            userOwnsIt: false,
            userBoughtIt: false,
            txPending: false
        };

        this.buySubDomain = this.buySubDomain.bind(this);
    }

    async componentDidMount()
    {

        // Find out how long left for the domaon name to expire
        const BaseRegistrar = new ethers.Contract(Config.ens.baseRegistrarImplementationAddress, EnsBaseRegistrarAbi, ethers.getDefaultProvider())
        const nameExpires = await BaseRegistrar.nameExpires(this.props.nftid)        

        this.setState({
            expire: {
                fetched: true,
                timestamp: nameExpires
            }
        });

        if(this.props.available === false) {
            // See if the user owns the name already
            const ensNameOwner = await this.props.web3.provider.resolveName([this.props.subdomain,this.props.name,Config.ens.tld].join(".")).then(function(address) {
                return address;
            })

            if(ensNameOwner !== null && this.props.web3.userAddress !== undefined) {
                if(ensNameOwner.toLowerCase() === this.props.web3.userAddress.toLowerCase()) {
                    this.setState({
                        userOwnsIt: true
                    })
                }
            }
        }
    }

    async buySubDomain()
    {

        if(this.state.userOwnsIt || this.state.txPending) {
            return;
        }

        this.setState({
            txPending: true
        });

        let tx = this.props.domain.contract.register(
          utils.keccak256(utils.toUtf8Bytes(this.props.name)),
          this.props.subdomain,
          this.props.web3.userAddress,
          Config.settings.referrerAddress,
          this.props.resolverAddr,
          {
            from: this.props.web3.userAddress,
            value: this.props.priceWei,
          }
        ).then(function(res) {
            console.log(`@@@res`)
            console.log(res)

            this.setState({
                userBoughtIt: true,
                userOwnsIt: true,
                txPending: false
            })
        }.bind(this)).catch(function(err) {
            console.log(`@@@err`)
            console.log(err)

            this.setState({
                txPending: false
            });
        }.bind(this))

        // @todo - monitor for returned transaction hash
        console.log(`@@@tx`)
        console.log(tx)
    }

    renderView()
    {
        const available = this.props.available && this.state.userOwnsIt === false ? true : false;
        return(
            <Container available={available}>
                <DomainView>
                    <h3>
                        <Availability available={available}>{available ? "AVAILABLE" : "UNAVAILABLE"}</Availability>
                        <RootDomain>{[this.props.subdomain,this.props.name,Config.ens.tld].join(".")}</RootDomain>
                        {
                            this.state.userOwnsIt
                                ?
                                    <Availability available={true} userOwnsIt={true}>THIS IS YOU</Availability>
                                :
                                    ``
                        }
                    </h3>

                    {
                    available
                        ? <BuyButton primary available={available} free={this.props.price == 0 ? true : false} onClick={this.buySubDomain}>
                            {
                                this.state.txPending
                                ?
                                    `Confirming...`
                                :
                                    this.props.price == 0 
                                    ? 
                                        `Get it for FREE` 
                                    : 
                                        `🛒 Buy for ${this.props.price}ETH ${
                                            this.props.fiatPriceFetched && Number.parseFloat(this.props.priceUsd).toFixed(2).toString() !== "0.00"
                                                ?   `(\$${Number.parseFloat(this.props.priceUsd).toFixed(2)})`
                                                : ``
                                        }`
                            }
                        </BuyButton>
                        : <BuyButton available={available}>Unavailable</BuyButton>
                    }
                    <AdditionalInfo>
                        {/* <label>Number of Subdomains:</label> {this.props.subdomainCount} <br /> */}
                        
                        <Tooltip tooltip={`This is when the name ${[this.props.name,Config.ens.tld].join(".")} expires. Anyone can extend the life of it.`}>
                            <SmallText>
                                <AddInfoIcon icon="shape" />
                                <AddInfoLabel>Renew in:</AddInfoLabel>
                                <AddInfoValue>
                                {
                                    this.state.expire.fetched
                                    ?
                                        <Moment unix durationFromNow>{this.state.expire.timestamp}</Moment>
                                    :
                                        <span>...</span>
                                }
                                </AddInfoValue>
                            </SmallText>
                        </Tooltip>

                        <SmallText>erc721 id: {this.props.nftid}</SmallText>
                        <SmallText>referral fee: {(this.props.referral/1000000)*100}%</SmallText>
                    </AdditionalInfo>
                    {
                        this.state.userBoughtIt || this.state.txPending
                        ?
                            <DomainBought name={[this.props.subdomain,this.props.name,Config.ens.tld].join(".")} />
                        :
                            ``
                    }
                </DomainView>
            </Container>
        )
    }

    render()
    {
        return(
            this.renderView()
        );
    }

}


export default Domain;