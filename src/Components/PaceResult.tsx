import React from 'react'
import styled from 'styled-components'
import { addLeadingZeros } from './utils'

const ResultText = styled.h2`
    color: #fff;
    text-align: center;
    font-family: 'Big Shoulders Text', cursive;
    font-weight: 400;
    font-size: 48px;
`

export interface PaceResultProps {
    paceInMinutes: number
}

export const PaceResult = (props: PaceResultProps) => {

    const getFormattedPace = () => {
        const minPart = Math.floor(props.paceInMinutes)
        const secPart = Math.round((props.paceInMinutes - minPart)*60)

        return `${minPart}:${addLeadingZeros(secPart.toString())}`
    }

    return (
        <ResultText>{getFormattedPace()} min/km</ResultText>
    )
}