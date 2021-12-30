import React, {useState, useEffect} from 'react'


export default function Countdown() {

    const [sessionTime, setSessionTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5) 
    const [sessionRunning, setSessionRunning] = useState(false)
    const [breakRunning, setBreakRunning] = useState(false)  

    //useEffect to countdown times
    useEffect(() => {
        if(sessionRunning && sessionTime > 0) {
           const interval =  setInterval(() => setSessionTime(sessionTime => sessionTime - 1), 1000)
           return () => clearInterval(interval)
        } else {
            setSessionRunning(false)
        }
        if(breakRunning && breakTime > 0) {
            const interval =  setInterval(() => setBreakTime(breakTime => breakTime - 1), 1000)
            return () => clearInterval(interval)
         } else {
            setBreakRunning(false)
        }

    }, [sessionRunning, breakRunning])

    //stop at 0
    if (sessionTime < 0) {
        setSessionTime(0)
        setBreakRunning(true)
    }
    if (sessionTime > 61) {
        setSessionTime(60)
    }

    if (breakTime < 0) {
        setBreakTime(0)
        setSessionRunning(true)
    }
    

    //set time format
    const timeFormat = (time) => {
        time *= 60
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return seconds === 0 ?  `${minutes}:${seconds}0` : `${minutes}:${seconds}`
    }
    
    return (
        <>
        <h1>Pomodoro Timer</h1>
        <div id='break'>
            <h2 id='break-label'>Break Length</h2>
            <h3 id='break-length'>{breakTime}</h3>
            <button id='break-increment' onClick={() => setBreakTime(breakTime => breakTime + 1)}>Increase</button>
            <button id='break-decrement' onClick={() => setBreakTime(breakTime => breakTime - 1)}>Decrease</button>
        </div>
        <div id='session'>
            <h2 id='session-label'>Session Length</h2>
            <h3 id='session-length'>{sessionTime}</h3>
            <button id='session-increment' onClick={() => setSessionTime(sessionTime => sessionTime + 1)}>Increase</button>
            <button id='session-decrement' onClick={() => setSessionTime(sessionTime => sessionTime - 1)}>Decrease</button>
            <button onClick={() => setSessionRunning(true)}>Start</button>
            <button onClick={() => setSessionRunning(false)}>Pause</button>
            
        </div>

        </>
    );
}
