import {TOTAL_CIRCLES,CORRECT_KEY} from './config';
const _makeCircleList = () => {
    let arr = [];
    let circleCount = TOTAL_CIRCLES;
    for (let i = 0; i <= circleCount; i++) {
        arr.push(i)
    }
    return arr
}


const _getRandomNumber = () => {
    let randNumber = Math.floor(Math.random() * 20)
    return randNumber
}

const _timeCounter = (timeCount,callBack) => {
    
  var intervalTime =  setInterval(() => {
        timeCount -= 1
        timeCount === 0 && clearInterval(intervalTime);
        callBack(timeCount,intervalTime)
    }, 1000);

}

const _handleCircleClick = ({index,selectedCircle,score,setScore,changeSlectedCircle,correctORwrongClick}) => {
    score=correctORwrongClick === CORRECT_KEY ? score + 1 : score - 1;
    setScore(score);
    selectedCircle === index && changeSlectedCircle(_getRandomNumber())
}

export {
    _makeCircleList,
    _getRandomNumber,
    _timeCounter,
    _handleCircleClick
}