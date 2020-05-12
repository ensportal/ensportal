import React, { Component } from 'react';
import styled from 'styled-components';
import Domain from './Domain';
import Config from '../Config.json'

import subdomainregistrar_artifacts from '../contracts/ENSMigrationSubdomainRegistrar.json';
import ens_artifacts from '../contracts/Ens.json';
import axios from 'axios'

import { utils } from 'ethers';
import { default as contract } from 'truffle-contract';


const Container = styled.div`
    padding: 1em;
`

var SubdomainRegistrar = contract(subdomainregistrar_artifacts);
var ENS = contract(ens_artifacts);
const defaultSubdomainRegistrar = "0xe65d8AAF34CB91087D1598e0A15B582F57F217d9";

let registrarVersions = {
    "1.0": {
      query: async function(domain, subdomain) {
        return domain.contract.query(domain.label, subdomain)
      },
      register: async function(domain, subdomain, ownerAddress, referrerAddress, resolverAddress, value) {
        return domain.contract.register(
          domain.label,
          subdomain,
          ownerAddress,
          referrerAddress,
          resolverAddress,
          {
            from: ownerAddress,
            value: value,
          });
      }
    }
};

class DomainList extends Component {

    constructor(args)
    {
      super(args);
  
      this.state = {
          domains: {
            fetched: false,
            details: []
          },
          resolverAddr: null,
          price: {
            ethusd: 0,
            fetched: false
          }
        }

        this.buildInstances = this.buildInstances.bind(this);
        this.getPriceFeed = this.getPriceFeed.bind(this)
    }

    async componentDidMount()
    {
        var self = this;

        SubdomainRegistrar.setProvider(window.web3.currentProvider); //@todo - maybe use this.props.web3.provider?
        ENS.setProvider(window.web3.currentProvider); //@todo - maybe use this.props.web3.provider?
    
        try {
          self.ens = await ENS.deployed();

          // Construct instances of the registrars we know about
          await this.buildInstances();
    
          // Get the address of the current public resolver
          const resolverAddress = await this.props.web3.provider.resolveName(Config.ens.publicResolverName).then(function(address) {
            return address;
          })

          console.log(`@@RESOLVER: ${resolverAddress}`)
          this.setState({"resolverAddr": resolverAddress})
        } catch(e) {
          console.log(e);
          //   $("#wrongnetworkmodal").modal('show');
        }

        await this.getPriceFeed();
    }

    async getPriceFeed()
    {
      const PRICE_FEED_API = "https://defiscan-api.herokuapp.com/api/v1/price/{TICKER}/usd"
      const PRICE_FEED_SETTINGS = "https://defiscan-api.herokuapp.com/api/v1/price/settings"
      const priceUsd = await axios(PRICE_FEED_API.replace("{TICKER}", "eth"))
      .then((e) => { return e.data.prices.price ? e.data.prices.price : 0})
      .catch((e) => { console.log(e); return 0});
    
      this.setState({
        price: {
          ethusd: priceUsd,
          fetched: true
        }
      });
    }

    async buildInstances()
    {
        console.log("Building instances of domains");
        var registrars = {};
        var domainnames = Config.domains;

        for(var i = 0; i < domainnames.length; i++) {
          var domain = domainnames[i];
          if(registrars[domain.registrar] === undefined) {
            registrars[domain.registrar] = await ((domain.registrar === undefined) ? SubdomainRegistrar.at(defaultSubdomainRegistrar) : SubdomainRegistrar.at(domain.registrar));
          }

          domainnames[i].contract = registrars[domain.registrar];
          domainnames[i].id = utils.bigNumberify(utils.keccak256(utils.toUtf8Bytes(domain.name))).toString(); //erc721 nft token id
          domainnames[i].label = utils.keccak256(utils.toUtf8Bytes(domain.name));

          let name = [this.props.subdomain, domain.name, Config.ens.tld].join(".");
          if(domain.version in registrarVersions) {
              let info = await registrarVersions[domain.version].query(domain, this.props.subdomain);
              domainnames[i].available = info[0] === "" ? false : true
              domainnames[i].price = info[0] === "" ? 0 : window.web3.fromWei(info[1])
              domainnames[i].priceWei = info[0] === "" ? 0 : info[1]
              domainnames[i].referral = info[0] === "" ? 0 : info[3].toNumber()
          } else {
              console.log(`not supported version`)
          }
        }

        this.setState({
            domains: {
                fetched: true,
                details: domainnames
            }
        });
    }

    render() {
        return (
            <Container>
                {
                    this.state.domains.fetched && this.state.resolverAddr !== undefined
                        ?
                            this.state.domains.details.map((item,key) =>
                                <Domain 
                                    key={item.id} 
                                    name={item.name} 
                                    domain={item}
                                    subdomain={this.props.subdomain}
                                    available={item.available}
                                    label={item.label}
                                    nftid={item.id}
                                    price={item.price}
                                    priceWei={item.priceWei}
                                    priceUsd={item.price * this.state.price.ethusd}
                                    fiatPriceFetched={this.state.price.fetched}
                                    referral={item.referral}
                                    resolverAddr={this.state.resolverAddr}
                                    web3={this.props.web3}
                                    subdomainCount="0"
                                >{item.name}</Domain>
                            )
                        :
                            `Loading...`
                }
            </Container>
        );
    }
}

export default DomainList;