import { useState, useEffect, useContext } from 'react';
import './Tabs.css'
import { Hora, TabContext } from '../App';

const Tabs = (props) => {
    
    // TABS
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 200 });
    const [activeTab, setActiveTab] = useContext(TabContext);

    // WORLD CLOCK
    const [date, setDate] = useContext(Hora)
    const [horaLocal, setHoraLocal] = useState(date.getHours())
    const [minsLocal, setMinsLocal] = useState(date.getMinutes())
    const [secsLocal, setSecsLocal] = useState(date.getSeconds())

    const minsDisplay = minsLocal.toString().padStart(2, '0')
    const secsDisplay = secsLocal.toString().padStart(2, '0')

    const handleResize = () => {
        const active = document.querySelector('.tab.active');
        const left = active.offsetLeft;
        const width = active.offsetWidth;
        setIndicatorStyle({ left, width });
    }

    // Resize
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Update seconds
    useEffect(() => {
        const updateDate = () => setDate(new Date())
        const secondsInt = setInterval(updateDate, 1000)
        return () => { clearInterval(secondsInt) }
    }, [])

    // Update minutes
    useEffect(() => {
        setSecsLocal(date.getSeconds())
        if(date.getSeconds() === 0)
        setMinsLocal(date.getMinutes())
        if(date.getMinutes() === 0 && date.getSeconds() === 0)
        setHoraLocal(date.getHours())
    }, [date])

    /** @param {MouseEvent} e */
    const moveTab = (e) => {
        const button = e.target;
        setActiveTab(button.innerText);
        const left = button.offsetLeft;
        const width = button.offsetWidth;
        setIndicatorStyle({ left, width });
    };
    
    return (
        <>
            <div id="top">
                <h1>{activeTab}</h1>
                <div id="botones">
                    <button type="button">+</button>
                    <button type="button">R</button>
                    <button type="button">?</button>
                </div>
            </div>
            <p id="subtitle">Your current local time is {horaLocal}:{minsDisplay}:{secsDisplay} PM</p>
            {props.children}
            <div id="tabs">
                <button onClick={moveTab} type="button" className={`tab ${activeTab === 'Alarm' ? 'active' : ''}`}>Alarm</button>
                <button onClick={moveTab} type="button" className={`tab ${activeTab === 'World clock' ? 'active' : ''}`}>World clock</button>
                <button onClick={moveTab} type="button" className={`tab ${activeTab === 'Timer' ? 'active' : ''}`}>Timer</button>
                <button onClick={moveTab} type="button" className={`tab ${activeTab === 'Stopwatch' ? 'active' : ''}`}>Stopwatch</button>
                <div id="indicator" style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px` }}></div>
            </div>
        </>
    );
};

export default Tabs