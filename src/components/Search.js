import React, { Component } from 'react';
import { debounce } from "lodash";

import { Input  } from '@mycrypto/ui';
import styled from 'styled-components';
import { default as namehash } from 'eth-ens-namehash';

import DomainList from './DomainList';
import Blurb from './Blurb';

const Container = styled.div`
`;
const Error = styled.div`
    color: #ef5353;
    font-weight: 600;
`

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
            this.handleSearch(window.location.hash.substr(1));
        }
    }
 
    handleSearch = debounce((strInput) =>
    {
        this.setState({search: {subdomain: null}, "error": null})

        if(strInput.match(/^[A-z0-9]+$/)) {
            let strNormalised = namehash.normalize(strInput);
            this.setState({search: {subdomain: strNormalised}});
            window.location.hash = strNormalised;
        } else {
            this.setState({search: {subdomain: null}, "error": "Please use only alphanumeric characters!"})
        }
    }, 500);

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
            <div>
                <Input id="SearchInput" onPaste={e => this.handleSearch(e.target.value)} onKeyUp={e => this.handleSearch(e.target.value)} type="search" placeholder="myname"></Input> 
                <Error>{this.state.error !== null ? this.state.error : ``}</Error>
            </div>
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