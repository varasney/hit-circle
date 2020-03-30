import React, { useState,useEffect } from 'react';
import './style.css';
import { YourScore, Timer,Circles } from '../components';
import { _makeCircleList, _timeCounter, _handleCircleClick } from '../controller/helper';
import { INIT_SELECTED_CIRCLE, TIME_COUNT } from '../controller/config';

function App() {
    const [selectedCircle, changeSlectedCircle] = useState(INIT_SELECTED_CIRCLE);
    const [score, setScore] = useState(0);
    const [circleList] = useState(_makeCircleList());
    const [time, setTimeCounter] = useState(TIME_COUNT)
    const [showPopup, handleShowPopup] = useState(false);
    const [isGameStarted, handleGameStar] = useState(false);
    const [intervalTimeID,setIntervalTimeID]=useState(null)

    useEffect(() => {

            if(!isGameStarted && intervalTimeID){
                stopIntervalID()
            }else if(isGameStarted){
                let newtime=time ===0 ? TIME_COUNT : time
                _timeCounter(newtime,callBacksetTimeCounter);
            }
            
    
      }, [isGameStarted]);

      const callBacksetTimeCounter=(timeCount,intervalID)=>{
        setTimeCounter(timeCount)
        setIntervalTimeID(intervalID)
      }

      const stopIntervalID=()=>{
        clearInterval(intervalTimeID)
      }

    const setCircle = (index) => {
        let correctORwrongClick=index === selectedCircle
        time!==0 && isGameStarted ? _handleCircleClick({
            index,
            selectedCircle,
            score,
            setScore,
            changeSlectedCircle,
            correctORwrongClick
        }) : alert('Please click on Play Button')
    }


    const displayScore = () => {
        handleShowPopup(true)
    }

    const playGame=()=>{
        handleGameStar(!isGameStarted);
    }

    const handleAlertClose=()=>{
        setScore(0)
        handleGameStar(!isGameStarted);
        setTimeCounter(TIME_COUNT)  
        handleShowPopup(false);
    }

    time === 0 && !showPopup && displayScore();
    return (
        <>
            <div className="mainContainer">
                <div className="boxContainer">
                    <h3>Hit the Circle</h3>
                    <p>Test your skill. How many circle can you hit in 30 seconds?</p>
                    
                    <div className="timescore">
                        <div className="time-score-child">
                            <p>Time</p>
                            <div className="smallbox"><Timer time={time} /></div>
                        </div>
                        <div className="time-score-child">
                            <p>Score</p>
                            <div className="smallbox"> <YourScore score={score} /></div>
                        </div>
                    </div>

                    <span className="hr"></span>

                    <div className="circleContainer">
                        <Circles
                            selectedCircle={selectedCircle}
                            data={circleList}     
                            onClick={(index) => setCircle(index)}/>
                        
                    </div>
                    <span className="hr"></span>
                    <p className="text-left">Push Play to Play</p>
                    <span className="hr"></span>
                    
                    <button className="playstop" onClick={()=>playGame()}>{!isGameStarted ? 'Play' : 'Stop'}</button>
                    <h4><u>Introduction</u></h4>
                    
                    <p>#1 Click on the circle as they are selected randomly by the computer.</p>
                    <p>#1 Click on the circle as they are selected randomly by the computer.</p>
                    </div>

                    {showPopup && <Popup message={`Your final score is : ${score}`} onClick={()=>handleAlertClose()}/>}
            </div>

        </>
    );
}
export default App;



const Popup=({message,onClick})=>{
    return (
        <div className="modal">
            <div className="modal-main display-block center"> 
                <span className="text-right crosshair" onClick={()=>onClick()}>X</span>
                <h3 className="textscore">{message}</h3>
            </div>
        </div>
    )
}



