import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { InputField } from './styles'

const DistanceField = styled(InputField)`
    -moz-appearance:textfield;
`

const DistancePickerWrapper = styled.div`
    width: 100%;
    text-align: center;
    background-color: rgba(1, 1, 1, 0.1);
    box-shadow: inset 3px 3px rgb(174, 86, 115);
`

export interface DistancePickerProps {
    defaultDistance: number
    onChange: (distance: number) => void
}

const knownDistances: { [key: string]: number } = {
    '3k': 3,
    '5k': 5,
    '10k': 10,
    'Half-Marathon': 21.0975,
    'Marathon': 42.192
}

export const DistancePicker = ({ defaultDistance, onChange }: DistancePickerProps) => {

    const [distance, setDistance] = useState<number>(defaultDistance)
    const [clearedVal, setClearedVal] = useState<string>('')

    const parseDistance = (kmOrDistance: string): number => {
        const sanitizedVal = kmOrDistance.trim()
        if (knownDistances[sanitizedVal]) {
            return knownDistances[sanitizedVal]
        }

        const withoutSuffix = sanitizedVal.replace('km', '').trim()
        return parseFloat(withoutSuffix)
    }

    const valueToDisplay = (rawValue: string) : string => {
        const val = rawValue.trim()

        if (knownDistances[val]) {
            return val
        }

        const knownDistance = Object.keys(knownDistances).find(key => knownDistances[key] === parseDistance(val))
        if (knownDistance) {
            return knownDistance
        }

        const distanceInKm = parseFloat(val)
        if (isNaN(distanceInKm)) {
            return rawValue
        }

        return `${val} km`
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value !== '' ? e.target.value : "0.0"
        const distance = parseDistance(val)
        setDistance(distance)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setClearedVal(e.target.value)
        e.target.value = ""
    }

    const handleFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
        if(e.target.value) {
            e.target.value = valueToDisplay(e.target.value)
        } else {
            e.target.value = clearedVal
        }
    }

    useEffect(() => {
        onChange(distance)
    }, [distance, onChange])

    return (
        <DistancePickerWrapper>
            <DistanceField
                type="text"
                onChange={handleChange}
                onBlur={handleFocusOut}
                onFocus={handleFocus}
                list="distances"
                defaultValue={valueToDisplay(defaultDistance.toString())} />
            <datalist id="distances">
                {
                    Object.keys(knownDistances).map(name => (<option key={name} value={name} />))
                }
            </datalist>
        </DistancePickerWrapper>
    )
}