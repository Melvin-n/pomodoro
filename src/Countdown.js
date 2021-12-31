import React, {useState, useEffect} from 'react'


export default function Countdown() {
    
    const [sessionTime, setSessionTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)  
    const [currentTimer, setCurrentTimer] = useState('Session')
    const [timer, setTimer] = useState(25 * 60)
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerSet, setTimerSet] = useState(false)
 
    const beep = document.getElementById('beep')

    //useEffect to countdown times, switch between times when timer hits 0
    useEffect(() => {     
        if(timerRunning && timer > 0) {
            const interval = setInterval(() => setTimer(timer => timer - 1), 1000)
            return () => clearInterval(interval)
        } else if (timerRunning && timer <= 0) {
            beep.play()
            if (currentTimer === 'Break') {                
                setTimer(sessionTime * 60)
                setCurrentTimer('Session')
                setBreakTime(0)
                return
            } 
            if (currentTimer === 'Session') {       
                setTimer(breakTime * 60)
                setCurrentTimer('Break')
                setSessionTime(0)
                return                
        }}}, [timerRunning, timer])
    

    //set a min and max from times
    if (sessionTime < 1) {
        setSessionTime(1)
    }
    if (breakTime < 1) {
        setBreakTime(1)
    }
    if (sessionTime > 60) {
        setSessionTime(60)
    }
    if (breakTime > 60) {
        setBreakTime(60)
    }
    
    //set time format
    const timeFormat = (time) => {
        let minutes = Math.floor(time / 60)
        const seconds = time % 60
        minutes < 10 ? minutes = `0${minutes}` : minutes = minutes
        return seconds < 10 ?  `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    }
    
    //reset states
    const resetTimer = () => {     
        setTimerRunning(false)
        setTimerSet(false)
        setSessionTime(25)
        setTimer(25 * 60)
        setBreakTime(5)
        setCurrentTimer('Session')
        document.getElementById('beep').pause()
        document.getElementById('beep').currentTime = 0
    }

   
    return (
        <>
        <h1>Pomodoro Timer</h1>
        <div id='timer-container'>
            <h2 id='timer-label' >{currentTimer}</h2>
            <h2 id='time-left'>{timeFormat(timer)}</h2>
            <audio id='beep' src='./timer-sound.wav'></audio>
            <button className='timer-manip' id='start_stop' onClick={() => {
                setTimerRunning(!timerRunning)  
                setTimerSet(true)}}>
                Start</button>
            <button className='timer-manip' id='reset' onClick={resetTimer}>Reset</button>
        </div>
        <div id='setters'>
            <div id='session'>
                <h2 id='session-label'> Session Length</h2>
                <div id='session-row'>
                    <button className='setter-btn' id='session-increment' onClick={() => {
                        if (!timerRunning) {
                            setSessionTime(sessionTime => sessionTime + 1)
                            if(!timerSet && currentTimer === 'Session') {
                                setTimer(timer => (sessionTime + 1) * 60)
                        }}
                            }}>+</button>
                    <h3 id='session-length'>{sessionTime}</h3>
                    
                    <button className='setter-btn' id='session-decrement' onClick={() => {
                        if (!timerRunning) {
                            setSessionTime(sessionTime => sessionTime - 1)
                            if(!timerSet && currentTimer === 'Session') {
                                if (sessionTime === 1) {
                                    setTimer(1 * 60)
                                } else {
                                    setTimer((sessionTime - 1) * 60)}}
                                }
                                
                            }}
                        >−</button>
                    </div>
            </div>
            <div id='break'>
                <h2 id='break-label'>Break Length</h2>
                <div id='break-row'>
                    <button className='setter-btn' id='break-increment' onClick={() => {
                        if (!timerRunning) {
                        setBreakTime(breakTime => breakTime + 1)
                        if (!timerSet && currentTimer === 'Break') {
                            setTimer(timer => (breakTime + 1) * 60)}}
                        }}
                        >+</button>
                        <h3 id='break-length'>{breakTime}</h3>
                    <button className='setter-btn' id='break-decrement' onClick={() => {
                    if (!timerRunning) {  
                    setBreakTime(breakTime => breakTime - 1)
                    if (!timerSet && currentTimer === 'Break') {
                        if (breakTime === 1) {
                            setTimer(1 * 60)
                        } else {
                        setTimer((breakTime - 1) * 60)}}
                    }}}
                    >−</button>
                </div>
            </div>
            
        </div>

        </>
    );
}
