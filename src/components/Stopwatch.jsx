import React, { useEffect, useState, useRef } from 'react';

export const Stopwatch = () => {

    const intervalRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [ms, setMS] = useState(0);

    const HourDisplay = String(parseInt(Math.floor(ms / 10) / 3600)).padStart(2, '0');
    const MinDisplay = String(parseInt(Math.floor(ms / 10) / 60)).padStart(2, '0');
    const SecDisplay = String(parseInt(Math.floor(ms / 10) % 60)).padStart(2, '0');
    const msDisplay = ms % 10;

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => { setMS(prev => prev + 1); }, 100);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const toggle = () => {
        setIsActive(prev => !prev);
    };

    return (
        <>
            <h2 className='crono-display'>{HourDisplay}:{MinDisplay}:{SecDisplay}.<span className='crono-ms'>{msDisplay}</span></h2>
            <div className="buttons-bottom">
                <button className={`button ${isActive ? '' : 'is-blue'}`} onMouseDown={toggle}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
            </div>
        </>
    );
};
