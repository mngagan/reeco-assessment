import styled, { css } from "styled-components";


const TR = styled.tr`
${props => props.background && css`
  background-color : ${props.background}
`}
`

export default TR