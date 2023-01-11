import styled, { css } from "styled-components";
import { Col as AntCol } from 'antd'


const Col = styled(AntCol)`
    ${props => props.borderLeft && css`
        border-left : 1px solid lightgrey
    `}
`

export default Col