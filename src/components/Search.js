import React, { Component } from 'react';

import { Input  } from '@mycrypto/ui';
import styled from 'styled-components';
import { default as namehash } from 'eth-ens-namehash';

import DomainList from './DomainList';
import Blurb from './Blurb';

const Container = styled.div`
`;

class Search extends Component {

    constructor()
    {
        super();
        this.handleSearch = this.handleSearch.bind(this);
        this.isOnCorrectNetwork = this.isOnCorrectNetwork.bind(this)
    
        this.state = {
            network: {
                mainnet: true
            },
            search: {
                subdomain: null
            },
            "error": null
        }
    }

    componentDidMount()
    {
        this.isOnCorrectNetwork()
        if(window.location.hash.substr(1).length > 0) {
            document.getElementById("SearchInput").value = window.location.hash.substr(1);
            this.handleSearch(null, window.location.hash.substr(1));
        }
    }

    async handleSearch(objEvent, strValue = "")
    {
        let strInput = "";
        if(objEvent) {
          strInput = objEvent.target.value;
        } else {
            strInput = strValue;
        }
  
      this.setState({search: {subdomain: null}, "error": null})
      let strNormalised = namehash.normalize(strInput);
      this.setState({search: {subdomain: strNormalised}});
  
      window.location.hash = strNormalised;
    }

    clearInput(objEvent)
    {
        objEvent.target.value = "";
    }

    isOnCorrectNetwork()
    {
         //
    }

    renderView()
    {
        return(
            <Input id="SearchInput" onPaste={this.handleSearch} onKeyUp={this.handleSearch} type="search" placeholder="myname"></Input> 
        )
    }

    render()
    {
        return(
            <Container>
                {this.renderView()}

                {
                    this.state.search.subdomain !== null
                        ? <DomainList subdomain={this.state.search.subdomain} />
                        : <Blurb />
                }
            </Container>
        );
    }

}


export default Search;