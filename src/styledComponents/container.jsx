import styled, { css } from 'styled-components'

const Container = styled.div`

  ${props => props.primary && css`
    background : green
  `};

  ${props => props.navbar && css`
    min-height : 30px;
    padding-top : 10px;
  `};

  ${props => props.leaveMargin && css`
    margin : 0 ${typeof props.leaveMargin === 'string' ? props.leaveMargin : '80px'};
  `}

  ${props => props.paddingTop && css`
    padding-top : 10px;
  `}

  ${props => props.titlebar && css`
    box-shadow: 0px 5px 10px 1px lightgrey;
  `};

  ${props => props.bgwhite && css`
    background-color : white;
  `}

  ${props => props.space && css`
    padding-top : 10px;
    padding-bottom: 10px;
  `};

  ${props => props.border && !props.borderTop && css`
    border : 1px solid lightgrey;
    border-radius : ${props.borderRadius ? props.borderRadius : '5px'};
  `};

  ${props => props.width && typeof props.width === 'string' && css`
    width : ${props.width}
  `};

  ${props => !props.border && props.borderTop && css`
    border-top : 1px solid lightgrey;
  `};

  ${props => props.center && css`
    text-align : center;
  `};

  ${props => props.right && css`
    text-align : right
  `}

`

export default Container