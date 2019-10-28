import React, { useState } from 'react'
import styled from "styled-components"
import { InputField } from './styles'
import { addLeadingZeros } from './utils'

const TimeField = styled(InputField)`
    width: 60px;
    -webkit-appearance: none;
    background-color: rgba(1, 1, 1, 0.1);
    box-shadow: inset 3px 3px rgb(174, 86, 115);
`

export interface TimePartInputProps {
    defaultValue: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TimePartInput = ({ defaultValue, onChange }: TimePartInputProps) => {

    const [clearedVal, setClearedVal] = useState<string>('')

    const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event)
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setClearedVal(event.target.value)
        event.target.value = ""
    }

    const handleFocusOut = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value) {
            event.target.value = addLeadingZeros(event.target.value)
            onChange(event)
        } else {
            event.target.value = clearedVal
        }
    }

    return (
        <TimeField
            type="text"
            pattern="[0-9]*"
            onFocus={handleFocus}
            onBlur={handleFocusOut}
            onChange={onInputChanged}
            defaultValue={addLeadingZeros(defaultValue.toString())} />
    )
}