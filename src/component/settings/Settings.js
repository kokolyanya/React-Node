import React from 'react';
import './Settings.css';

function Settings (props) {

  function handleChange(event) {
    const entrer=parseInt(event.target.value);
    props.setTTL(entrer);

  }
    return (
      // <div className="Settings"> 
        <div className="UserSettings">
          <p>TTL : </p>
          <input className="inputTtl" type="number" onChange={handleChange}/>
          <p>s</p>
        </div>
      /* </div> */
    );
}

export default Settings;