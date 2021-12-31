import React, {useState, useEffect} from 'react'


export default function Countdown() {
    
    const [sessionTime, setSessionTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)  
    const [currentTimer, setCurrentTimer] = useState('Session')
    const [timer, setTimer] = useState(25 * 60)
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerSet, setTimerSet] = useState(false)
    const [swap, setSwap] = useState(false)
 
    const beep = document.getElementById('beep')

    //useEffect to countdown times
    useEffect(() => {     
        console.log(currentTimer)   
        if(timerRunning && timer > 0) {
            const interval = setInterval(() => setTimer(timer => timer - 1), 1000)
            return () => clearInterval(interval)
        } else if (timerRunning && timer <= 0) {
            beep.play()
            if (currentTimer === 'Session') {
                setCurrentTimer('Break')
                //label.textContent = 'Break'
                setTimer(breakTime * 60)
            } 
            if (currentTimer === 'Break') {
                console.log('aite')
                //label.textContent = 'Session'
                setCurrentTimer('Session')
                setTimer(sessionTime * 60)
                return
            } 
            }
    }, [timerRunning, timer])
    

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
    
    //pass the break or session to the timer
    // useEffect(() => {
    //     if (currentTimer === 'Session') {
    //         setTimer(sessionTime * 60)
    //         console.log('feou')
    
    //     } else if (currentTimer === 'Break') {
    //         setTimer(breakTime * 60)
    //     }
    // }, [currentTimer]) 

    //stop at 0, change to other session type
    
        // if (timer < 0 && timerRunning) {
        //     if (currentTimer === 'Session') {
        //         setCurrentTimer('Break')
        //         //setTimer(breakTime * 60)
        //     } else if (currentTimer === 'Break') {
        //         setCurrentTimer('Session')
        //         //setTimer(sessionTime * 60)
        //     }
        // }
        
    
        
           
    
    // useEffect(() => {
    //     console.log('ibf')
    //     if (currentTimer === 'Session' && !timerSet && !resetPressed ) {
    //         setTimer(sessionTime * 60)
    //         console.log('feou')
    
    //     } else if (currentTimer === 'Break') {
    //         setTimer(breakTime * 60)
    //         console.log('ahh')
    //     } 
    // }, [])
    
    
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
        <p id='timer-label' >{currentTimer}</p>
        <h2 id='time-left'>{timeFormat(timer)}</h2>
        <audio id='beep' src='./timer-sound.wav'></audio>
        <button id='start_stop' onClick={() => {
            setTimerRunning(!timerRunning)  
            setTimerSet(true)}}>
            Start</button>
        <button id='reset' onClick={resetTimer}>Reset</button>
        <div id='break'>
            <h2 id='break-label'>Break Length</h2>
            <h3 id='break-length'>{breakTime}</h3>
            <button id='break-increment' onClick={() => {
                if (!timerRunning) {
                setBreakTime(breakTime => breakTime + 1)
                if (!timerSet && currentTimer === 'Break') {
                    setTimer(timer => (breakTime + 1) * 60)}}
                }}
                >Increase</button>
            <button id='break-decrement' onClick={() => {
            if (!timerRunning) {  
            setBreakTime(breakTime => breakTime - 1)
            if (!timerSet && currentTimer === 'Break') {
                setTimer(timer => (breakTime - 1) * 60)}}
            }}
            >Decrease</button>
        </div>
        <div id='session'>
            <h2 id='session-label'>Session Length</h2>
            <h3 id='session-length'>{sessionTime}</h3>
            <button id='session-increment' onClick={() => {
                if (!timerRunning) {
                    setSessionTime(sessionTime => sessionTime + 1)
                    if(!timerSet && currentTimer === 'Session') {
                        setTimer(timer => (sessionTime + 1) * 60)
                }}
                    }}>Increase</button>
            <button id='session-decrement' onClick={() => {
                if (!timerRunning) {
                    setSessionTime(sessionTime => sessionTime - 1)
                    if(!timerSet && currentTimer === 'Session') {
                        setTimer(timer => (sessionTime - 1) * 60)}}
                    }}
                >Decrease</button>
            
        </div>

        </>
    );
}
