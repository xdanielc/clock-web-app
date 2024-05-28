import React, { useEffect, useState, useRef } from 'react';

export const Stopwatch = () => {

    const intervalRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [ms, setMs] = useState(0);
    const lastTimestampRef = useRef(0);

    const HourDisplay = String(parseInt(Math.floor(ms / 100) / 3600)).padStart(2, '0');
    const MinDisplay = String(parseInt(Math.floor(ms / 100) / 60)).padStart(2, '0');
    const SecDisplay = String(parseInt(Math.floor(ms / 100) % 60)).padStart(2, '0');
    const msDisplay = String(parseInt(Math.floor(ms % 100))).padStart(2, '0');

    useEffect(() => {
        const update = (timestamp) => {
            if (!lastTimestampRef.current) {
                lastTimestampRef.current = timestamp;
            }
            const elapsed = timestamp - lastTimestampRef.current;
            if (elapsed >= 10) {
                setMs(prev => prev + Math.floor(elapsed / 10));
                lastTimestampRef.current = timestamp - (elapsed % 10);
            }
            if (isActive) {
                intervalRef.current = requestAnimationFrame(update);
            }
        };

        if (isActive) {
            intervalRef.current = requestAnimationFrame(update);
        } else {
            if (intervalRef.current) {
                cancelAnimationFrame(intervalRef.current);
            }
            lastTimestampRef.current = 0;
        }

        return () => {
            if (intervalRef.current) {
                cancelAnimationFrame(intervalRef.current);
            }
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

export default Stopwatch