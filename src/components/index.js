
import React from 'react';

const Circle = (props) => {return (<input type="radio"  {...props} />)}

const Circles = ({data,onClick,selectedCircle}) => {
    return data.map((value, index) => 
    <Circle 
        key={index} 
        onClick={() => onClick(index)} 
        checked={index === selectedCircle} 
        value={`${index}_radio`}/>)
}

const YourScore = ({ score }) => {return (<div><p>{score}</p></div>)}

const Timer = ({ time }) => {return (<div><p>{time}</p></div>)}

export {
    Circles,
    Circle,
    YourScore,
    Timer
}
