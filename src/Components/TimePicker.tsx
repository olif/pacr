import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TimePartInput } from './TimePartInput'

export interface TimePickerProps {
    defaultMinutes: number
    onChange: (minutes: number) => void
}

const TimePickerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;
`

type Updater = React.Dispatch<React.SetStateAction<number>>

export const TimePicker = ({ defaultMinutes, onChange }: TimePickerProps) => {

    const getDefaultHours = () => Math.floor(defaultMinutes / 60)
    const getDefaultMinutes = () => Math.floor(defaultMinutes % 60)
    const getDefaultSeconds = () => (defaultMinutes - Math.floor(defaultMinutes)) * 60

    const [seconds, setSeconds] = useState(getDefaultSeconds())
    const [minutes, setMinutes] = useState(getDefaultMinutes())
    const [hours, setHours] = useState(getDefaultHours())

    const updateTimePart = (event: React.ChangeEvent<HTMLInputElement>, updater: Updater) => {
        const val = event.target.value !== '' ? parseInt(event.target.value) : 0
        updater(val)
    }

    useEffect(() => {
        const totalMinutes = hours * 60 + minutes + Math.round(seconds / 6) / 10
        onChange(totalMinutes)
    }, [onChange, hours, minutes, seconds])

    return (
        <TimePickerWrapper>
            <TimePartInput defaultValue={hours} onChange={(e) => updateTimePart(e, setHours)} />
            <TimePartInput defaultValue={minutes} onChange={(e) => updateTimePart(e, setMinutes)} />
            <TimePartInput defaultValue={seconds} onChange={(e) => updateTimePart(e, setSeconds)} />
        </TimePickerWrapper>
    )
}