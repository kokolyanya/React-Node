import React, {Component} from 'react';
import './Connected.css';

import AddUser from '../../component/adduser/AddUser';
import Settings from '../../component/settings/Settings';
import TableList from '../../component/table/TableList';
import Timer from '../../component/Timer/Timer';
class Connected extends Component {
  state={
    addUser:false,
    setting:false,
    timeTL:300,
    changement:0
  }
  addUserNouveau=()=>{
    this.setState({
      changement:this.state.changement+1})
  }
  addUserSee=()=>{
    this.setState({
      addUser:true
    })
  }
  addUserHidden=()=>{
    this.setState({
      addUser:false
    })
    console.log("hello");
  }
  montrerTTL=()=>{
    this.setState({
      setting:!this.state.setting
    })
  }
  setTTL=(temps)=>{
    this.setState({
      timeTL:temps
    })
  }
  deconnection=(e)=>{
    this.props.deconnection(e)
  }
  render() {
    return (
      <div className='Connected'>
        <h1 className='Titre'>Good morning {this.props.user}!!! How are you today ?</h1>
        <div className="main">
          <div className='options'>
            <p className='manage'>User Management</p>
            <p className='settings' onClick={this.montrerTTL}>Settings</p>
            <p className='add' onClick={this.addUserSee}>Add User</p>
            <button className='logOut' onClick={()=>{this.props.deconnection("/")}}>Log Out</button>
            <Timer ttl={this.state.timeTL} deconnection={this.deconnection}/>
          </div>
          <div className='list'>
            <TableList changement={this.state.changement}/>

            {this.state.addUser? <AddUser cacher={this.addUserHidden} nouveau={this.addUserNouveau}/> : null}
            {this.state.setting? <Settings cacher={this.addUserHidden}  setTTL={this.setTTL}/> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Connected;