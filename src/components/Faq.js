import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

const Container = styled.div`
    width: 25%;
    display: inline-block;
    vertical-align: text-top;
`
const Question = styled.h3`
    padding: 0.5em;
`
const Answer = styled.div`
    margin-bottom: 1em;
    display: inline;

    > ul {
        padding: 0.5em 1em;
        list-style-type: none;

        > li {
            margin: 0 0 1em 0;
        }
    }
`

class Faq extends Component 
{    
    render()
    {
        return(
            <Container>
                <Question>
                    <span>{this.props.question}</span>
                </Question>
                <Answer>
                    <ul>
                    {this.props.answer.map((e, i) => (
                        <li key={i}>{ReactHtmlParser(e)}</li>
                    ))}
                    </ul>
                </Answer>
            </Container>
        );
    }
}


export default Faq;