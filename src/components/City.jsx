import { useContext, useEffect, useRef, useState } from "react"
import { Context, Hora } from "../App"
import Timeline from './Timeline'
import './City.css'

const City = ({city, UTCOffset}) => {
    const [hour, setHour] = useState(0) //This might be a multiple if multiplyFactor != 1
    const [mins, setMins] = useState(0)
    const [secs, setSecs] = useState(0)
    const hours = 23
    const multiplyFactor = 1 // Increase for smoother UI
    const divisions = ((hours+1) * multiplyFactor)-1
    const daylight = (hour > 6 * multiplyFactor && hour < 20 * multiplyFactor) ? 'is-day' : 'is-night'
    const utcOffsetDisplay = UTCOffset > -1 ? '+'+parseInt(UTCOffset) : parseInt(UTCOffset) 
    
    const hour12 = (Math.floor(hour/multiplyFactor)%12) === 0 ?
    '12' : (Math.floor(hour/multiplyFactor)%12).toString().padStart(2, '0')
    const minsDisplay = mins.toString().padStart(2, '0')
    const secsDisplay = secs.toString().padStart(2, '0')
    const period = hour < 12 * multiplyFactor ? 'AM' : 'PM'

    const [initial, setInitial] = useState(0)
    const [viewOffset, setViewOffset] = useContext(Context)
    const firstRender = useRef(false)
    const [date, setDate] = useContext(Hora)

    const handleSliderChange = (e) => {
        const newHour = parseInt(e.target.value)
        setHour(newHour)
        setViewOffset(initial-newHour)
    }

    useEffect(() => {
        if(firstRender.current){
            setHour((initial-viewOffset+24)%24) //+24  para negativos
        }
    }, [viewOffset])

    // Actualizar Minutos
    useEffect(() => {
        if(firstRender.current){
            if (date.getMinutes() !== mins)
            setMins(date.getMinutes())
            if (date.getSeconds() !== secs)
            setSecs(date.getSeconds())
        }
    }, [date])

    useEffect(() => {
        const newDate = new Date()
        const UTCMs = newDate.getTime() + (newDate.getTimezoneOffset() * 60 * 1000)
        const targetMs = (UTCOffset * 60 * 60 * 1000) + UTCMs
        const adjusted = new Date(targetMs)
        setHour(adjusted.getHours())
        setInitial(adjusted.getHours())
        setMins(adjusted.getMinutes())
        firstRender.current = true
    }, [])

    return (
        <div className="city-hour">
            <div id="city">
                <h3>{city || "Ciudad"}  <span>{utcOffsetDisplay}</span></h3>
                <p>Tue, November 16</p>
            </div>
            <div id="hour">
            {hour12}:{minsDisplay}<span>{period}</span>
            </div>
            <Timeline/>
            <input
                className={`slider ${daylight}`}
                type="range"
                name="city"
                max={divisions}
                value={hour}
                onChange={handleSliderChange} />
        </div>
    )
}

export default City