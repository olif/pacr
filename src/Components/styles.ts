import styled from "styled-components"

export const FieldText = `
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    font-family: 'Big Shoulders Text', cursive;
`

export const InputField = styled.input`
    padding: 10px 0;
    background: none;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 0;
    ${FieldText}
`

export const FieldSuffix = styled.span`
    display: inline-block;
    ${FieldText}
`