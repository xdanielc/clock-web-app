import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Stopwatch = () => {
    const [isActive, setIsActive] = useState(false)
    const [seconds, setSeconds] = useState(5) // Vales dependent on this change onMount
    const [percentage, setPercentage] = useState(0)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const minutesDisplay = Math.floor(seconds / 60);
    const secondsDisplay = String(seconds % 60).padStart(2, '0')

    useEffect(() => {
        setTotalSeconds(seconds)
        setPercentage(seconds)
    }, [])

    useEffect(() => {
        let intervalId;
        if (isActive && seconds > 0) {
            if(seconds === totalSeconds){
                setPercentage(totalSeconds-1)
            }
            intervalId = setInterval(() => {
                // Functional update gets the state
                setSeconds(prevSeconds => {
                    const newSeconds = prevSeconds - 1;
                    setPercentage(newSeconds-1);
                    return newSeconds;
                });
            }, 1000);
        } else if (seconds === 0) {
            clearInterval(intervalId);
            setIsActive(false)
        }
        return () => clearInterval(intervalId);
    }, [isActive, seconds]);

    const beginTimeout = () => {
        setIsActive(true);
    };

    return (
        <>
            <div className="circular-container">
                <CircularProgressbar
                value={percentage}
                maxValue={totalSeconds}
                text={`${minutesDisplay}:${secondsDisplay}`}
                strokeWidth={3}
                styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathTransition: 'linear',
                    textColor: isActive ? 'var(--main-color)' : '#bbbbbb',
                    pathColor: 'var(--main-color)'
                })}
                />
            </div>
            <div className="buttons-bottom">
                <button className='button' onClick={beginTimeout}>Iniciar</button>
            </div>
        </>
    )
}

export default Stopwatch