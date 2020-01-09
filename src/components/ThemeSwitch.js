import React, { Component } from 'react';
import styled from 'styled-components';

import { ReactComponent as SunSvg } from '../images/sun.svg'
import { ReactComponent as MoonSvg } from '../images/moon.svg'

const Container = styled.div`
    padding: 1em;
    display: inline-block;

    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */

    /* Rules below not implemented in browsers yet */
    -o-user-select: none;
    user-select: none;

    > svg {
        height: 25px;
        width: 25px;
    }
`;

class ThemeSwitch extends Component 
{
    render()
    {
        return(
            <Container onClick={this.props.changeTheme}>
                {
                    this.props.theme_light
                    ? <SunSvg />
                    : <MoonSvg />    
                }
            </Container>
        );
    }
}


export default ThemeSwitch;