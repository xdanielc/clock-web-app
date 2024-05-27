import React, { useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './Timer.css'

const Timer = () => {
    const [isActive, setIsActive] = useState(false)
    const [seconds, setSeconds] = useState(30) // Vales dependent on this change onMount
    const [secsMeter, setSecsMeter] = useState(0)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const hoursDisplay = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const minutesDisplay = String(Math.floor((seconds / 60) % 60)).padStart(2, '0')
    const secondsDisplay = String(seconds % 60).padStart(2, '0')

    const countdownID = useRef(null)

    useEffect(() => {
        setTotalSeconds(seconds)
        setSecsMeter(seconds)
    }, [])

    useEffect(() => {
        if (!isPaused && isActive && seconds > 0) {
            setSecsMeter(seconds-1)
            countdownID.current = setInterval(() => {
                // Functional update gets the state
                setSeconds(prevSeconds => {
                    const newSeconds = prevSeconds - 1;
                    setSecsMeter(newSeconds-1);
                    return newSeconds;
                });
            }, 1000);
        } else if (seconds === 0) {
            clearInterval(countdownID.current);
            setIsActive(false)
            setSeconds(totalSeconds)
        }
        return () => clearInterval(countdownID.current);
    }, [isActive, seconds, isPaused]);

    const beginTimeout = () => {
        setIsActive(true);
        setIsPaused(false)
    };
    
    const stopTimeout = () => {
        setIsActive(false)
        clearInterval(countdownID.current)
        setSeconds(totalSeconds)
        setSecsMeter(totalSeconds)
    };

    const pauseTimeout = () => {
        setIsPaused(!isPaused)
    };

    const addSeconds = (num) => {
        setTotalSeconds(prev => prev + num)
        setSecsMeter(prev => prev + num)
        setSeconds(prev => prev + num)
    }

    return (
        <>
            <div className="circular-container">
                <CircularProgressbar
                value={secsMeter}
                maxValue={totalSeconds}
                text={`${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`}
                strokeWidth={1}
                styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathTransition: 'linear',
                    textColor: isActive ? 'var(--main-color)' : '#bbbbbb',
                    pathColor: 'var(--main-color)'
                })}
                />
            </div>
            <div className="flex">
                <div className="pill-legend">
                    <button className='pill' onClick={() => addSeconds(600)}>+10</button>
                    <p>min.</p>
                </div>
                <div className='pill-legend'>
                    <button className='pill' onClick={() => addSeconds(60)}>+1</button>
                    <p>min.</p>
                </div>
                <div className='pill-legend'>
                    <button className='pill' onClick={() => addSeconds(15)}>+15</button>
                    <p>segs.</p>
                </div>
            </div>
            <div className="buttons-bottom">
                {!isActive && <button className='button is-blue' onClick={beginTimeout}>Iniciar</button>}
                {isActive && <button className={`button ${isPaused ? 'is-blue' : ''}`} onClick={pauseTimeout}>{isPaused ? 'Reanudar' : 'Pausar'}</button>}
                {isActive && <button className='button' onClick={stopTimeout}>Stop</button>}
            </div>
        </>
    )
}

export default Timer