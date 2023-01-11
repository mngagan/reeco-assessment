import styled, { css } from "styled-components";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "green" : "white")};
  color: ${(props) => (props.primary ? "white" : "green")};
  padding: 2px 15px;
  font-size: small;
  border: ${(props) => (props.border ? props.border : "2px")} solid green;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px 0px lightgreen;
  }
  ${(props) =>
    props.disabled &&
    css`
      background: lightgrey;
      border-color: lightgrey;
      color: white;
    `}
`;

export default Button;
