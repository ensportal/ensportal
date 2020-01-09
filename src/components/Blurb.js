import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

class Blurb extends Component 
{
    render()
    {
        return(
            <Container>
                <h3>Why?</h3>
                <p>
                Getting a subdomain means you won't have to remember your long hexidecimal blockchain 
                address. Instead, you can be identified with a human-readable and memorable name - like  {' '}
                <code>ensportal.eth</code>. If you change your mind about a domain, then you can choose another one 
                to be identified by.   
                </p>                
                <h3>Cost?</h3>
                <p>
                    The cost varies between domains - but we keep the cost low! When you select 
                    a (sub)domain to be identified by you will see some statistics about the domain 
                    to help you make your mind.   
                </p>
            </Container>
        );
    }
}


export default Blurb;