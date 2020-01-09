import React, { Component } from 'react';
import styled from 'styled-components';
import Domain from './Domain';
import Config from '../Config.json'

import subdomainregistrar_artifacts from '../contracts/EthRegistrarSubdomainRegistrar.json';
import ens_artifacts from '../contracts/Ens.json';

import { utils } from 'ethers';
import { default as contract } from 'truffle-contract';
import { default as namehash } from 'eth-ens-namehash';
import { default as _ } from 'underscore';


const Container = styled.div`
    padding: 1em;
`

var SubdomainRegistrar = contract(subdomainregistrar_artifacts);
var ENS = contract(ens_artifacts);

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
          "domains": {
            "fetched": false,
            "details": []
          }
        }

        this.buildInstances = this.buildInstances.bind(this);
    }

    async componentDidMount()
    {
        var self = this;

        SubdomainRegistrar.setProvider(window.web3.currentProvider);
        ENS.setProvider(window.web3.currentProvider);
    
        try {
          self.ens = await ENS.deployed();
            console.log(`ENS`);
            console.log(self.ens);
          // Construct instances of the registrars we know about
          await this.buildInstances();
    
          // Get the address of the current public resolver
          self.resolverAddress = await self.ens.resolver(namehash.hash(Config.ens.publicResolverName));
          console.log(`Resolver Address: ${self.resolverAddress}`);
        } catch(e) {
          console.log(e);
          //   $("#wrongnetworkmodal").modal('show');
        }
    }

    async buildInstances()
    {
        console.log("Building instances of domains");
        var registrars = {};
        var domainnames = Config.domains;
        for(var i = 0; i < domainnames.length; i++) {
          var domain = domainnames[i];
          if(registrars[domain.registrar] === undefined) {
            registrars[domain.registrar] = await ((domain.registrar === undefined) ? SubdomainRegistrar.deployed() : SubdomainRegistrar.at(domain.registrar));
          }

          domainnames[i].contract = registrars[domain.registrar];
          domainnames[i].id = utils.bigNumberify(utils.keccak256(utils.toUtf8Bytes(domain.name))).toString(); //erc721 nft token id
          domainnames[i].label = utils.keccak256(utils.toUtf8Bytes(domain.name));

          let name = [this.props.subdomain, domain.name, Config.ens.tld].join(".");

            console.log(`Searching for name: ${name}. Registrar Version: ${domain.version}`);
            
            if(domain.version in registrarVersions) {
                let info = await registrarVersions[domain.version].query(domain, this.props.subdomain);
                console.log(info)
                domainnames[i].available = info[0] == "" ? false : true
                domainnames[i].price = info[0] == "" ? 0 : window.web3.fromWei(info[1])
                domainnames[i].referral = info[0] == "" ? 0 : info[3].toNumber()
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
                    this.state.domains.fetched
                        ?
                            this.state.domains.details.map((item,key) =>
                                <Domain 
                                    key={item.id} 
                                    name={item.name} 
                                    subdomain={this.props.subdomain}
                                    available={item.available}
                                    label={item.label}
                                    nftid={item.id}
                                    price={item.price}
                                    referral={item.referral}
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