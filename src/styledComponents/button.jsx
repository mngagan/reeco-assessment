import styled from "styled-components";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "green" : "white"};
  color: ${props => props.primary ? "white" : "green"};
  padding: 2px 15px;
  font-size: small;
  border: ${props => props.border ? props.border : '2px'} solid green;
  border-radius: 20px;
  cursor : pointer;
  &:hover{
    // background: ${props => !props.primary ? "green" : "white"};
    // color: ${props => !props.primary ? "white" : "green"};
    box-shadow: 0px 0px 10px 0px lightgreen;
    // tranition: 1s all
  }
`;

export default Button