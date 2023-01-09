import styled, { css } from 'styled-components'

const Text = styled.span`

  color: ${props => props.primary ? 'black' : "grey"};

  ${props => props.white && css`
    color : white
  `};

  ${props => props.green && css`
    color : green;
  `};

  ${props => props.orange && css`
    color : orange;
  `};

  ${props => props.red && css`
    color : red;
  `};

  ${props => props.bold && css`
    font-weight : bold
  `};

  ${props => props.underline && css`
    text-decoration: underline;
  `};

  ${props => props.heading && css`
    font-size : large
  `};

  ${props => props.pointer && css`
    cursor : pointer;
  `};

  ${props => props.space && css`
  padding : 10px
  `}

  ${props => props.strike && css`
    text-decoration: line-through; 
  `}

  ${props => props.small && css`
    font-size : small
  `}

`

export default Text