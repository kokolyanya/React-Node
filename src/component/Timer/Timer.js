import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import './Timer.css';

function MyTimer(props) {
  let expiryTimestamp=props.expiryTimestamp;
    useEffect(()=>{
        restart(expiryTimestamp)
    })
  let {
    seconds,
    minutes,
    hours,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {props.deconnection("/");}
  });
  return (
    <div className="timer" style={{ textAlign: "center" }}>
      <div>
      {hours>9 ?(<span>{hours}</span>) :(<span>0{hours}</span>)}:
      {minutes>9 ?(<span>{minutes}</span>) :(<span>0{minutes}</span>)}:
      {seconds>9 ?(<span>{seconds}</span>) :(<span>0{seconds}</span>)}
      </div>
    </div>
  );
}

export default function Timer (props){
    
        let time= new Date()
        time.setSeconds(time.getSeconds()+props.ttl);
      return (
        <div>
            <MyTimer expiryTimestamp={time} deconnection={props.deconnection}/>
        </div>
        );
   }