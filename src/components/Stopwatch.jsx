import React from 'react'

const Stopwatch = () => {
    return (
        <>
            {/* <div className='placeholder'>Stopwatch</div> */}
            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className='responsiveCircle'>
                {/* <circle cx="100" cy="100" r="70" strokeWidth={'2px'}/> */}
                <path className="meter-arc" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
            </svg>
            <button className='button-primary bottom'>INICIAR</button>
        </>
    )
}

export default Stopwatch