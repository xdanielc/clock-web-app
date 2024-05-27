import React from 'react'

const Stopwatch = () => {
    const timer = new Date()

    const hoursDisplay = String(timer.getHours()).padStart(2, '0')
    const minsDisplay = String(timer.getMinutes()).padStart(2, '0')
    const secsDisplay = String(timer.getSeconds()).padStart(2, '0')

    return (
        <>
            <h2 className='crono-display'>{hoursDisplay}:{minsDisplay}:{secsDisplay}</h2>
        </>
    )
}

export default Stopwatch